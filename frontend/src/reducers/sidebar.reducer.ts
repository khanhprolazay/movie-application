import sidebarConstants from "@/constants/sidebar.constant"
import { ReduxAction } from "@/models"

type SidebarRootState = {
  open: boolean,
  absolute: boolean,
}

const initialState: SidebarRootState = {
  open: true,
  absolute: false,
}

export function sidebar(state: SidebarRootState = initialState, action: ReduxAction): SidebarRootState {
  switch (action.type) {
    case sidebarConstants.TRIGGER_SIDEBAR:
      return {
        ...state,
        open: !state.open
      }

    case sidebarConstants.SET_SIDEBAR_OPEN:
      return {
        ...state, 
        open: true
      }

    case sidebarConstants.SET_SIDEBAR_CLOSE:
      return {
        ...state, 
        open: false,
      }

    case sidebarConstants.SET_SIDEBAR_ABSOLUTE:
      const value = action.payload?.value;
      return {
        ...state,
        open: !value,
        absolute: value,
      }

    default: 
      return {
        ...state
      }

  }
}