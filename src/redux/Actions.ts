import { ADD_USER_INFORMATION, SELECTED_RESTAURANT } from "./ActionTypes";

export const add_user_information = ( userinformation: any ) => {
    return{
        type: ADD_USER_INFORMATION,
        payload: userinformation
    }
}

export const add_selected_restaurant = ( selectedRestaurant:any ) => {
    return{
        type: SELECTED_RESTAURANT,
        payload: selectedRestaurant
    }
}