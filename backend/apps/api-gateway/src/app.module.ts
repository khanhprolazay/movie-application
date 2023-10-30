import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { JwtGuard } from './auth/guard';

@Module({
  imports: [
    UserModule,
    AuthModule, 
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`
    }), 
  ],
  providers: [JwtGuard]
})
export class AppModule{};
