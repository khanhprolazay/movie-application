import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { LoggerModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/env/${process.env.NODE_ENV}.env`,
    }),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
