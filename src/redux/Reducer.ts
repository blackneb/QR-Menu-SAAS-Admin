import { ADD_USER_INFORMATION } from "./ActionTypes"

const initialStateUserInformation:any = {}

export const addUserInformationReducer = ( state = initialStateUserInformation, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case ADD_USER_INFORMATION:
            return payload
        default:
            return state
    }
}