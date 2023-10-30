import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "@app/shared";

@Module({
  imports: [
    AuthModule, 
    LoggerModule, 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    })
  ],
})
export class AppModule {}