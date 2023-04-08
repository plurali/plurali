import { UserField } from '@prisma/client'

export class UserFieldDataDto {
  constructor(public description: string | null, public visible: boolean) {}

  public static from(userField: UserField): UserFieldDataDto {
    return new this(userField.description, userField.visible)
  }
}