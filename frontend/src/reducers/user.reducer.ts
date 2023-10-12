import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";

export interface UserRootState {
  loading: boolean,
  data: User | null,
  error: string | null,
}

const initialState: UserRootState = {
  loading: false,
  error: null,
  data: {
    id: 1,
    firstName: "Le",
    lastName: "Minh",
    email: "leminh@gmail.com",
    role: "USER",
    sex: "MALE",
    phone: "09999999",
    avatar: "https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/263498346_3200541133554779_8238027386307341084_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=GWh24_mEnk0AX_Qi0Pa&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfBxllXkJhE7MuWph2EaWZQrcvaV6iTd_whENuENmTrqTg&oe=651FDD25",
  },
}

export function user(state: UserRootState = initialState, action: ReduxAction): UserRootState {
  switch (action.type) {
    case userConstants.GET_USER:
      return {
        ...state,
        loading: true
      }

    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        data: action.payload?.user,
        loading: false,
      }

    case userConstants.GET_USER_ERROR:
      return {
        ...state,
        loading: false,
      }

    default:
      return state;
  }
}