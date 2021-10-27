import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Editors } from "./editors";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
           // Add Reducer Functions Here
           editors: Editors
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
