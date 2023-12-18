import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@Controller('report')
@ApiTags('Report')
@ApiBearerAuth()
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get()
  @UseGuards(JwtGuard)
  getReports() {
    return this.service.getReports();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  getReport(@Param('id', ParseIntPipe) id: number) {
    return this.service.getReport(id);
  }
}
