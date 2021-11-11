import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import loadingReducer from "./reducers/loadingReducer";

const reducers = combineReducers({
    userReducer,
    loadingReducer
})

const store = configureStore({
    reducer: reducers
});

export type IptvReducerState
    = ReturnType<typeof store.getState>;

export default store;