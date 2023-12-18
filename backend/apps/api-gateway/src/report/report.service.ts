import { PatternOption, Service } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ReportService {
  constructor(@Inject(Service.REPORT) private readonly client: ClientProxy) {}

  getReports() {
    return this.client.send(PatternOption['REPORT.GET.ALL'], {});
  }

  getReport(id: number) {
    return this.client.send(PatternOption['REPORT.GET.BY_ID'], id);
  }
}
