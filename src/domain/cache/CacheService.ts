import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { System, Member, Visibility, User } from '@prisma/client';
import { CacheRepository } from '@infra/cache/CacheRepository';
import { CacheNamespace } from '@infra/cache/utils';
import { createSlug } from '@domain/common';
import { PluralRestService } from '@domain/plural/PluralRestService';
import { SystemWithUser } from '@domain/common/types';
import { PluralUserEntry } from '@domain/plural/types/rest/user';
import { PluralVisibility, parseFieldType, parseVisibility } from '@domain/plural/utils';
import { PluralMemberEntry } from '@domain/plural/types/rest/members';
import { PrismaService } from 'nestjs-prisma';
import { PrismaTx } from '@infra/prisma/types';
import { captureException } from '@sentry/node';

const txConfig = {
  maxWait: 50000000,
  timeout: 50000000,
};

@Injectable()
export class CacheService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repository: CacheRepository,
    private readonly logger: ConsoleLogger,
    @Inject('PluralRestServiceBase') private readonly plural: PluralRestService,
  ) {
    this.logger.setContext(this.constructor.name);
  }

  async rebuildMembers(system: SystemWithUser, tx: PrismaTx = this.prisma) {
    const pluralMembers = await this.plural.findMembers(system);

    // Delete all members that are not listed by SP anymore
    await tx.member.deleteMany({
      where: {
        pluralId: {
          notIn: pluralMembers.map(member => member.id),
        },
        systemId: system.id,
      },
    });

    const members = [];

    for (const plural of pluralMembers) {
      members.push(await this.rebuildMember(system, plural, tx));
    }

    return members;
  }

  async rebuildMember(system: System, plural: PluralMemberEntry, tx: PrismaTx = this.prisma) {
    const visible = parseVisibility(plural.content) === PluralVisibility.Public;

    this.logger.log(`Rebuilding (s:${system.id}) ${system.pluralId}/m/${plural.id}`);

    let member = await tx.member.findFirst({
      where: {
        pluralId: plural.id,
        systemId: system.id,
      },
    });

    if (!member) {
      member = await tx.member.create({
        data: {
          pluralId: plural.id,
          pluralParentId: system.pluralId,
          systemId: system.id,
          slug: createSlug(plural.content.name),
          visibility: visible ? Visibility.Public : Visibility.Private,
        },
      });
    } else {
      member = await tx.member.update({
        where: {
          id: member.id,
        },
        data: {
          pluralParentId: system.pluralId,
        },
      });
    }

    return member;
  }

  async rebuildFields(system: System, plural: PluralUserEntry, tx: PrismaTx = this.prisma) {
    // Delete all fields that are not listed by SP anymore
    await tx.field.deleteMany({
      where: {
        pluralId: {
          notIn: Object.keys(plural.content.fields ?? {}),
        },
        systemId: system.id,
      },
    });

    if (!plural.content.fields) {
      return [];
    }

    const fields = [];

    for (const pluralId in plural.content.fields) {
      const field = plural.content.fields[pluralId];

      this.logger.log(`Rebuilding (s:${system.id}) ${system.pluralId}/f/${plural.id}`);

      const data = {
        name: field.name,
        type: parseFieldType(field),
      };

      let dbField = await tx.field.findFirst({
        where: {
          systemId: system.id,
          pluralId,
        },
      });

      if (!dbField) {
        dbField = await tx.field.create({
          data: {
            ...data,
            pluralId,
            pluralParentId: plural.id,
            systemId: system.id,
            visibility: parseVisibility(field) === PluralVisibility.Public ? Visibility.Public : Visibility.Private,
          },
        });
      } else {
        dbField = await tx.field.update({
          where: {
            id: dbField.id,
          },
          data,
        });
      }

      fields.push(dbField);
    }

    return fields;
  }

  async rebuildFor(user: User & { system?: System }, useTransacction = false): Promise<void> {
    this.logger.log(`Rebuilding cache for ${user.id}`);
    let pluralUser: PluralUserEntry | null = null;
    if (user.pluralAccessToken) {
      try {
        pluralUser = await this.plural.findUserForId('me', user.pluralAccessToken);
      } catch (error) {
        captureException(error);
        this.logger.error(`Failed to get data for ${user.id}`, error);
      }
    }

    if (!pluralUser?.content?.isAsystem) {
      pluralUser = null;
    }

    if (!pluralUser) {
      await this.prisma.system.deleteMany({
        where: {
          userId: user.id,
        },
      });

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          pluralOverride: null,
          pluralAccessToken: null,
        },
      });

      return;
    }

    if (!user.system) {
      // Attempt to fetch system if not passed
      user.system = await this.prisma.system.findUnique({
        where: {
          userId: user.id,
        },
      });
    }

    if (user.system) {
      await this.clearSystem(user.system);

      if (user.system.pluralId !== pluralUser.id) {
        await this.prisma.system.delete({
          where: {
            id: user.system.id,
          },
        });

        await this.prisma.member.deleteMany({
          where: {
            systemId: user.system.id,
          },
        });

        await this.prisma.field.deleteMany({
          where: {
            systemId: user.system.id,
          },
        });
      }
    }

    user = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        system: {
          upsert: {
            update: {},
            create: {
              slug: createSlug(pluralUser.content.username),
              pluralId: pluralUser.id,
              visibility: Visibility.Private,
            },
          },
        },
      },
      include: {
        system: true,
      },
    });

    if (useTransacction) {
      await this.prisma.$transaction(
        async tx => await this.rebuildMembers(Object.assign(user.system, { user }), tx),
        txConfig,
      );
      await this.prisma.$transaction(async tx => await this.rebuildFields(user.system, pluralUser, tx), txConfig);
    } else {
      await this.rebuildMembers(Object.assign(user.system, { user }));
      await this.rebuildFields(user.system, pluralUser);
    }
  }

  async rebuild(): Promise<void> {
    this.logger.log('Starting a cache rebuild job');
    const users = await this.prisma.user.findMany({
      include: {
        system: {
          include: {
            members: true,
            fields: true,
            user: true,
          },
        },
      },
    });

    for (const user of users) {
      await this.rebuildFor(user, true);
    }
    this.logger.log('Cache rebuild job complete');
  }

  static createSystemKey(system: System) {
    return CacheRepository.createKey(CacheNamespace.System, `SystemSID${system.pluralId}`);
  }

  static createMemberListKey(system: System) {
    return CacheRepository.createKey(CacheNamespace.MemberList, `SystemSID${system.pluralId}`);
  }

  static createMemberKey(member: Member) {
    return CacheRepository.createKey(
      CacheNamespace.Member,
      `SystemSID${member.pluralParentId}_MemberSID${member.pluralId}`,
    );
  }

  async clearSystem(system: System): Promise<void> {
    const keys = await this.repository.cache.store.keys(`*SystemSID${system.pluralId}*`);
    const t = this.repository.cache.store.client.multi();

    keys.forEach(key => t.del(key));

    await t.exec();
  }

  async clearMemberList(system: System): Promise<void> {
    await this.repository.delete(CacheNamespace.MemberList, `SystemSID${system.pluralId}`);
  }

  async clearMember(member: Member): Promise<void> {
    await this.repository.delete(
      CacheNamespace.Member,
      `SystemSID${member.pluralParentId}_MemberSID${member.pluralId}`,
    );
  }

  async clearUser(user: User & { system?: System }): Promise<void> {
    const system =
      user.system ??
      (await this.prisma.system.findFirst({
        where: {
          userId: user.id,
        },
      }));

    if (system) {
      await this.clearSystem(system);
    }
  }
}
