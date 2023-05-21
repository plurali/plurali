import { Ok, Status, StatusMap } from '@app/v1/dto/Status';
import { AuthRequest } from '@app/v1/dto/auth/request/AuthRequest';
import { AuthResponse } from '@app/v1/dto/auth/response/AuthResponse';
import { UserDto } from '@app/v1/dto/user/UserDto';
import { UserAuthenticator } from '@domain/security/authenticator/UserAuthenticator';
import { Body, Controller, Inject, Post, Put } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CacheService } from '@domain/cache/CacheService';
import { UserRepository } from '@domain/user/UserRepository';
import { Hasher } from '@domain/security/hasher/Hasher';
import { OkResponse } from '@app/v1/dto/OkResponse';
import { JwtData } from '@domain/security/JwtData';
import { Authenticator } from '@domain/security/authenticator/Authenticator';
import { StatusException } from '@app/v1/exception/StatusException';
import { jwtConfig } from '@app/misc/jwt';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { error, ok } from '@app/misc/swagger';

@Controller({
  path: '/auth',
  version: '1',
})
@ApiTags('Auth')
@ApiExtraModels(AuthResponse, OkResponse)
export class AuthController {
  constructor(
    @Inject(Authenticator) private readonly authenticator: UserAuthenticator,
    private readonly signer: JwtService,
    private readonly users: UserRepository,
    private readonly hasher: Hasher,
    private readonly cache: CacheService
  ) {}

  @Post('/login')
  @ApiResponse(ok(200, AuthResponse))
  @ApiResponse(error(400, StatusMap.InvalidCredentials))
  public async login(@Body() credentials: AuthRequest): Promise<Ok<AuthResponse>> {
    const user = await this.authenticator.attempt(credentials);

    if (!user) {
      throw new StatusException(StatusMap.InvalidCredentials);
    }

    await this.cache.rebuildFor(user);

    return Status.ok(
      new AuthResponse(
        UserDto.from(user),
        await this.signer.signAsync({ ...new JwtData(user.id) }, { secret: jwtConfig.secret })
      )
    );
  }

  @Put('/register')
  @ApiResponse(ok(200, AuthResponse))
  @ApiResponse(error(400, StatusMap.UsernameAlreadyUsed))
  public async register(@Body() credentials: AuthRequest): Promise<Ok<AuthResponse>> {
    if (!!(await this.users.findUnique({ where: { username: credentials.username } }))) {
      throw new StatusException(StatusMap.UsernameAlreadyUsed);
    }

    await this.users.create({
      data: {
        username: credentials.username,
        passwordHash: this.hasher.hash(credentials.password),
      },
    });

    return await this.login(credentials);
  }

  // just a fallback endpoint that actually doesn't do anything,
  // used to be a part of original backend
  @Post('/logout')
  @ApiResponse(ok(200, OkResponse))
  public async logout(): Promise<Ok<OkResponse>> {
    return Status.ok(new OkResponse());
  }
}
