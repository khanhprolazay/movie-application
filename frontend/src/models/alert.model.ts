export type AlertType = "success" | "warning" | "error";
export interface Alert {
  id: string,
  type: AlertType,
  message: string
}
