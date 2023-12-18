import { reportConstants } from "@/constants/report.constant";
import { ReduxAction, Report } from "@/type";

export interface ReportRootState {
  reports: Report[];
  loading: boolean;
  error: string | null;
  current: Report | null;
}

const initialState: ReportRootState = {
  reports: [],
  loading: false,
  error: null,
  current: null,
};

export function report(
  state: ReportRootState = initialState,
  action: ReduxAction,
): ReportRootState {
  switch (action.type) {

    case reportConstants.GET_REPORTS:
      return {
        ...state,
        loading: true,
      };

    case reportConstants.GET_REPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: action.payload?.reports,
      };

    case reportConstants.GET_REPORTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.err,
      };

    case reportConstants.GET_REPORT:
      return {
        ...state,
        loading: true,
      };

    case reportConstants.GET_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        current: action.payload?.report,
      };

    case reportConstants.GET_REPORT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload?.err,
      };

    default:
      return state;
  }
}
