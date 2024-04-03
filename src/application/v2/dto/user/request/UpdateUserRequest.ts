import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UpdateUserRequestInterface } from './UpdateUserRequestInterface';

export class UpdateUserRequest implements UpdateUserRequestInterface {
  @IsString()
  @IsOptional()
  @ApiProperty()
  public accessToken: string | null = null;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  public email: string | null = null;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Admin-only (for debugging/testing)' })
  public systemIdOverride: string | null = null;
}
