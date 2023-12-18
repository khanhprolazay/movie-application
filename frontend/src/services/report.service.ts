import { Report } from "@/type";
import { axiosClient } from "./axios-client";

class ReportService {
  getReports(): Promise<Report[]> {
    return axiosClient.get("/report");
  }

  getReport(id: number): Promise<Report> {
    return axiosClient.get(`/report/${id}`);
  }
}

const reportService = new ReportService();
export default reportService;
