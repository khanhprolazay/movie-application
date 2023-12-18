import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OHBI from 'ohbi';
import { LoggerService } from '@app/shared';
import { CClient } from 'ohbi/dist/types/core';

@Injectable()
export class ReportService implements OnModuleInit {
  private cclient: CClient;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.cclient = await OHBI.newCClient({
      email: this.configService.get('REPORT_EMAIL'),
      clientId: this.configService.get('REPORT_CLIENT_ID'),
      clientSecret: this.configService.get('REPORT_CLIENT_SECRET'),
    })

    if (!this.cclient) {
      this.loggerService.error('Failed to initialize OHBI client');
      throw new Error('Failed to initialize OHBI client');
    }
  }

  getReports() {
    return this.cclient.getReports(); 
  }

  getReport(id: number) {
    return this.cclient.getOne(id);
  }
}
