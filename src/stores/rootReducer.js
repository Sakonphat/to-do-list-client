import {combineReducers} from "redux";
import AuthsReducer from "./auths/AuthsReducer";

export default combineReducers({
    auths: AuthsReducer
});