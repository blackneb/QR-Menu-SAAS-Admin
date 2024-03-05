import { ADD_USER_INFORMATION, SELECTED_RESTAURANT, USERS, RESTAURANTS, MENU_LIST, CATEGORIES } from "./ActionTypes"

const initialStateUserInformation:any = {}
const initialStateSelectedestaurant:any = {}
const initialStateUsers:any = []
const initialStateRestaurants:any = []
const initialStateMenuList:any = []
const initialStateCategories:any = []

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

export const addUsers = ( state = initialStateUsers, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case USERS:
            return payload
        default:
            return state
    }
}

export const addResturants = (state = initialStateRestaurants, action:any) => {
    const { type, payload } = action;
    switch (type) {
      case RESTAURANTS:
        return payload;
      default:
        return state;
    }
  };

export const addMenuList = ( state = initialStateMenuList, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case MENU_LIST:
            return payload
        default:
            return state
    }
}

export const addCategories = ( state = initialStateCategories, action:any ) => {
    const { type, payload } = action;
    switch(type){
        case CATEGORIES:
            return payload
        default:
            return state
    }
}