export interface ReduxAction {
  type: string,
  payload?: Record<string, any>,
}