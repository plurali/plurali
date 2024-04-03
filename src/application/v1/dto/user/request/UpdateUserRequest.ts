import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserRequest {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public pluralKey: string | null = null;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  public email: string | null = null;

  @IsString()
  @IsOptional()
  @ApiProperty()
  public overridePluralId: string | null = null;
}
