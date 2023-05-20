import { HasBackground } from '@domain/common/types';
import { System, Visibility, BackgroundType } from '@prisma/client';

/**
 * @deprecated v2 - UserData->System
 */
export class UserDataDto implements HasBackground {
  constructor(
    public slug: string | null,
    public customDescription: string | null,
    public backgroundType: BackgroundType,
    public backgroundColor: string | null,
    public backgroundImage: string | null,
    public lastTimeAssetChanged: Date,
    public visible: boolean
  ) {}

  public static from(system: System): UserDataDto {
    return new this(
      system.slug,
      system.description,
      BackgroundType[system.backgroundType],
      system.backgroundColor,
      system.backgroundImage,
      system.assetsUpdatedAt,
      system.visibility === Visibility.Public
    );
  }
}