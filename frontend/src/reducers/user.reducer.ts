import userConstants from "@/constants/user.constant";
import { ReduxAction, User } from "@/type";

export interface UserRootState {
  loading: boolean,
  data: User,
  error: string | null,
}

const initialState: UserRootState = {
  loading: false,
  error: null,
  data: {
    id: 1,
    firstName: "Le",
    lastName: "Minh",
    sex: "MALE",
    email: "khanhprolazay@gmail.com",
    phone: "09999999",
    avatar: "https://scontent-xsp1-3.xx.fbcdn.net/v/t39.30808-1/263498346_3200541133554779_8238027386307341084_n.jpg?stp=dst-jpg_p320x320&_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ktAMqdYPp7sAX9GwSsk&_nc_ht=scontent-xsp1-3.xx&oh=00_AfCCkpD70tOo2kysEXqD2tDb7-o3uB-XDFISuj6StnKSvw&oe=652C8B27",
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
      console.log(action.payload);
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