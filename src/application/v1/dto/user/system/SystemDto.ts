import { PluralUserEntry } from '@domain/plural/types/rest/user';
import { UserDataDto } from '../UserDataDto';
import { UserFieldDto } from '../field/UserFieldDto';
import { parseAvatar } from '@domain/plural/utils';
import { SystemWithFields } from '@domain/common/types';

/**
 * @deprecated
 */
export class SystemDto {
  constructor(
    public id: string,
    public lastModified: Date,
    public username: string,
    public fields: UserFieldDto[],
    public color: string | null,
    public description: string | null,
    public avatar: string | null = null,
    public data: UserDataDto
  ) {}

  public static from(system: SystemWithFields, plural: PluralUserEntry): SystemDto {
    return new SystemDto(
      system.pluralId,
      new Date(plural.content.lastOperationTime),
      plural.content.username,
      system.fields.map(UserFieldDto.from),
      plural.content.color,
      plural.content.desc,
      parseAvatar(plural.content),
      UserDataDto.from(system)
    );
  }
}