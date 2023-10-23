import sidebarConstants from "@/constants/sidebar.constant";
import { TypedDispatch } from "@/redux/store";

function open() {
  return (dispatch: TypedDispatch) => dispatch({ type: sidebarConstants.SET_SIDEBAR_OPEN })
}

function close() {
  return (dispatch: TypedDispatch) => dispatch({ type: sidebarConstants.SET_SIDEBAR_CLOSE })
}

function trigger() {
  return (dispatch: TypedDispatch) => dispatch({type: sidebarConstants.TRIGGER_SIDEBAR})
}

function absolute(value: boolean, current: boolean) {
  return (dispatch: TypedDispatch) => current !== value && dispatch({ type: sidebarConstants.SET_SIDEBAR_ABSOLUTE, payload: { value }}); 
}

const sidebarActions = { open, close, trigger, absolute };
export default sidebarActions;