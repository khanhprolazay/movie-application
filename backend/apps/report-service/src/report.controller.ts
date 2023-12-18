import { Controller } from '@nestjs/common';
import { ReportService } from './report.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PatternOption } from '@app/shared';

@Controller()
export class ReportController {
  constructor( private readonly reportService: ReportService) {}

  @MessagePattern(PatternOption['REPORT.GET.ALL'])
  getReports() {
    return this.reportService.getReports();
  }

  @MessagePattern(PatternOption['REPORT.GET.BY_ID'])
  getReport(@Payload() id: number) {
    return this.reportService.getReport(id);
  }
}
