import {
  first,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { ExpiresInType } from '../type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interface';
import { jwtDecode } from 'jwt-decode';
import { ConfigService } from '@nestjs/config';
import goolgeUtils from '../utils/googleUtils';
import { ClientProxy } from '@nestjs/microservices';
import {
  Inject,
  Injectable,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  GoogleProfile,
  LoginGoogleRequestDto,
  LoginRequestDto,
  LoginResonseDto,
  PatternOption,
  RefreshTokenDto,
  RegisterRequestDto,
  Service,
  User,
  UserLoginType,
} from '@app/shared';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Service.USER)
    private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  validate(token: string) {
    try {
      const secret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
      const verify = this.jwtService.verify<JwtPayload>(token, { secret });
      return this.userClient
        .send<User>(PatternOption['USER.GET.BY_ID'], verify.sub)
        .pipe(first());
    } catch (err) {
      throw new ForbiddenException('Token expried !!!');
    }
  }

  login(dto: LoginRequestDto) {
    return this.userClient
      .send<User>(PatternOption['USER.GET.BY_EMAIL_AND_PASSWORD'], dto)
      .pipe(
        first(),
        map((user) => {
          const payload: JwtPayload = { sub: user.id, email: user.email };
          return {
            accessToken: this.generateToken('accessToken', payload, '30m'),
            refreshToken: this.generateToken('refreshToken', payload, '7d'),
          };
        }),
      );
  }

  sso(dto: LoginGoogleRequestDto) {
    try {
      return from(this.getProfile(dto)).pipe(
        mergeMap((profile) =>
          forkJoin([
            of(profile),
            this.userClient.send<string>(
              PatternOption['USER.CHECK.BY_EMAIL'],
              profile.email,
            ),
          ]),
        ),
        mergeMap(([profile, check]) => {
          if (!check || check === 'false') {
            return this.userClient.send<User>(
              PatternOption['USER.CREATE.BY_GOOGLE'],
              {
                email: profile.email,
                avatar: profile.picture,
                lastName: profile.given_name,
                loginType: UserLoginType.GOOGLE,
                firstName: profile.family_name,
              },
            );
          }
          return this.userClient.send<User>(
            PatternOption['USER.GET.BY_EMAIL'],
            profile.email,
          );
        }),
        map((user) => {
          const payload: JwtPayload = { sub: user.id, email: user.email };
          return {
            accessToken: this.generateToken('accessToken', payload, '30m'),
            refreshToken: this.generateToken('refreshToken', payload, '7d'),
          };
        }),
        first(),
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  register(dto: RegisterRequestDto) {
    if (dto.password !== dto.rePassword) {
      throw new ConflictException('Two provided password is not the same !!!');
    }

    return this.userClient
      .send<string>(PatternOption['USER.CHECK.BY_EMAIL'], dto.email)
      .pipe(
        mergeMap((check) => {
          if (check === 'true') {
            throw new ConflictException('Gmail is already in use !!!');
          }
          return this.userClient.send<User>(PatternOption['USER.CREATE'], dto);
        }),
      );
  }

  refreshToken(dto: RefreshTokenDto) {
    try {
      const secret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
      const verify = this.jwtService.verify<JwtPayload>(dto.refreshToken, {
        secret,
      });
      const payload: JwtPayload = { sub: verify.sub, email: verify.email };
      const accessToken = this.generateToken('accessToken', payload, '30m');
      return { accessToken };
    } catch (err) {
      throw new ForbiddenException('Token expried !!!');
    }
  }

  private generateToken(
    type: keyof LoginResonseDto,
    payload: JwtPayload,
    expiresIn: ExpiresInType | number,
  ) {
    const secretKey =
      type === 'accessToken' ? 'ACCESS_TOKEN_SECRET' : 'REFRESH_TOKEN_SECRET';

    return this.jwtService.sign(payload, {
      expiresIn: expiresIn,
      secret: this.configService.get(secretKey),
    });
  }

  private async getProfile({ accessToken, credential }: LoginGoogleRequestDto) {
    return accessToken
      ? await goolgeUtils.getUserProfile(accessToken)
      : jwtDecode<GoogleProfile>(credential);
  }
}
