import { ILoginState } from ".";
//import { switchStatement } from "@babel/types";
import { loginTypes } from "../actions/login.actions";

const initialState: ILoginState = {
    currentUser: undefined,
    errorMessage: undefined
}

export const loginReducer = (state = initialState, action) =>{
    switch (action.type) {
        case loginTypes.INVALID_CREDENTIALS:
            return{
                ...state,
                errorMessage:'Invalid Credentials'
            }
            //break;
        case loginTypes.FAILED_TO_LOGIN:
            return{
                ...state,
                errorMessage:'failed to login'
            }
        case loginTypes.SUCCESSFUL_LOGIN:
            return{
                ...state,
                currentUser:action.payload.user,
                errorMessage:undefined
            }
        default:
            break;
    }

    return state
}