import { combineReducers, createStore } from "redux";
import {composeWithDevTools} from '@redux-devtools/extension';

import { addUserInformationReducer, addSelectedRestaurant } from "./Reducer";

const reducers = combineReducers(
    {
        userInformation:addUserInformationReducer,
        selectedRestaurant:addSelectedRestaurant,
    }
);

export const store = createStore(reducers, composeWithDevTools())