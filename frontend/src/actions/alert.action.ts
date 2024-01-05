import alertConstant from "@/constants/alert.constant";
import { TypedDispatch } from "@/redux/store";
import { Alert, AlertType } from "@/models";
import { v4 } from "uuid";

function add(type: AlertType, message: string) {
  return (dispatch: TypedDispatch) => {
    const alert: Alert = { id: v4(), type, message };
    dispatch({
      type: alertConstant.ALERT_PUSH,
      payload: { alert },
    })
  }
}

function remove() {
  return (dispatch: TypedDispatch) => {
    dispatch({ type: alertConstant.ALERT_POP });
  }
}

const alertActions = { add, remove };
export default alertActions;