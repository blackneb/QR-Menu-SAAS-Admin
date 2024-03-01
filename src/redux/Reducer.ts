import { ADD_USER_INFORMATION, SELECTED_RESTAURANT } from "./ActionTypes"

const initialStateUserInformation:any = {}
const initialStateSelectedestaurant:any = {}

export const addUserInformationReducer = ( state = initialStateUserInformation, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case ADD_USER_INFORMATION:
            return payload
        default:
            return state
    }
}

export const addSelectedRestaurant = ( state = initialStateSelectedestaurant, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case SELECTED_RESTAURANT:
            return payload
        default:
            return state
    }
}