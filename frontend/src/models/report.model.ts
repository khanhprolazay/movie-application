export interface PaginationModel {
  pagination: {
    currentPage: number
    totalEntries: number
    totalPage: number
  }
}

export interface Report extends PaginationModel {
  message: string
  data: ReportModel[]
}

export interface ReportResponse {
  message: string
  data: ReportModel
}

export interface App extends PaginationModel {
  message: string
  data: AppModel[]
}

export interface AppResponse extends PaginationModel {
  message: string
  data: AppModel
}

export interface ReportModel {
  active: number
  company: string
  count: number
  createdAt: string
  email: string
  expiredDate: string
  id: string
  isActived: boolean
  isOwner: boolean
  pbi: string
  pdf: string
  plan: number
  reportMethod: number
  shared: number
  sharedReportCount: number
  startedDate: string
  title: string
  updatedAt: string
  userId: string
  userName: string
  workspaceId: number
  workspaceName: string
  sharingUsers: any[]
  advanceOptions?: {
    navbar?: boolean
    filterPane?: boolean
    bookmark?: boolean
    print?: boolean
  }
  filters: any
  embedUrl?: string
}

export interface AppModel {
  id: number
  name: string
  description: string
  emails: string[]
  reportIds: number[]
  reports: ReportModel[]
  groups: GroupModel[]
  updatedAt: string
  createdAt: string
  logo?: string
  reportConfigs: EmbedReportConfig[]
}

interface GroupModel {
  id: number
  name: string
  emails: string[]
  reportIds: number[]
  updatedAt: string
  createdAt: string
}

export interface EmbedReportConfig {
  tokenId?: string
  accessToken?: string
  tokenExpiry?: string
  reportConfig?: ReportConfig[]
  errorMsg?: string
}

interface ReportConfig {
  reportId: string
  reportName: string
  embedUrl: string
  datasetId: any
}
