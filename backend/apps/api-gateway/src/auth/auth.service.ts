import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { LoginRequestDto, RegisterRequestDto, Service, UserEntity } from "@app/shared";

@Injectable()
export class AuthService {
  constructor(
    @Inject(Service.AUTH) 
    private readonly authClient: ClientKafka
  ) {}

  async validate(token: string): Promise<UserEntity> {
    return await firstValueFrom(
      this.authClient.send("AUTH.VALIDATE", token)
    );
  }

  async login(dto: LoginRequestDto): Promise<LoginRequestDto> {
    return await firstValueFrom(
      this.authClient.send("AUTH.LOGIN", dto)
    );
  }

  async register(dto: RegisterRequestDto): Promise<UserEntity> {
    return await firstValueFrom(
      this.authClient.send("AUTH.REGISTER", dto)
    );
  }
}