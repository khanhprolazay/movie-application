import alertConstant from "@/constants/alert.constant";
import { Alert, ReduxAction } from "@/type";

interface AlertRootState {
  data: Alert[],
}

const initialState: AlertRootState = {
  data: []
}

export function alert(state: AlertRootState = initialState, action: ReduxAction): AlertRootState {
  switch (action.type) {

    case alertConstant.ALERT_PUSH:
      return {
        ...state,
        data: [action.payload?.alert, ...state.data]
      }

    case alertConstant.ALERT_POP:
      return {
        ...state,
        data: state.data.slice(0, -1),
      }

    default: 
      return state;
  }
}