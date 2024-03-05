import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer, addSelectedRestaurant, addUsers, addResturants, addMenuList, addCategories } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
        selectedRestaurant:addSelectedRestaurant,
        users:addUsers,
        restaurants:addResturants,
        menuList:addMenuList,
        categories:addCategories,
    }
);

export const store = createStore(reducers, composeWithDevTools())