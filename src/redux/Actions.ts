import { ADD_USER_INFORMATION, SELECTED_RESTAURANT, USERS, RESTAURANTS, MENU_LIST, CATEGORIES } from "./ActionTypes";

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

export const add_users = ( users:any ) => {
    return{
        type:USERS,
        payload: users
    }
}

export const add_restaurants = ( restaurants:any ) => {
    return{
        type:RESTAURANTS,
        payload:restaurants
    }
}

export const add_menu_list = ( menu_list:any ) => {
    return{
        type:MENU_LIST,
        payload:menu_list
    }
}

export const add_categories = ( categories:any ) => {
    return{
        type:CATEGORIES,
        payload:categories
    }
}