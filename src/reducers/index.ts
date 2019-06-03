import { combineReducers } from "redux";
import { User } from "../models/user";
import { loginReducer } from "./login.reducer";



//interface that represents all the state we are keeping track of
//for the entire app

export interface ILoginState{
    currentUser:User
    errorMessage:string
}

export interface IState{
    login:ILoginState
}


//this is going to build all of the reducers that modify state into one single
//combined super reducer that will act as a global state object
export const state = combineReducers<IState>({
    login:loginReducer
    // clicker: clickerReducer,
    // chuckNorris: chuckNorrisReducer
})