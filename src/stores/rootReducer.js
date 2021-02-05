import {combineReducers} from "redux";
import AuthsReducer from "./auths/AuthsReducer";
import ModalReducer from "./global/modal/ModalReducer";
import TasksReducer from "./tasks/TasksReducer";
import LoadingReducer from "./global/loading/LoadingReducer";

export default combineReducers({
    auths: AuthsReducer,
    modal: ModalReducer,
    tasks : TasksReducer,
    loading : LoadingReducer
});