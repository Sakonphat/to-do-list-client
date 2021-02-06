import ActionUtility from "../../utils/ActionUtility";
import TasksEffect from "./TasksEffect"

class TasksAction {

    static SET_LOADING = "TasksAction.SET_LOADING";
    static UNSET_LOADING = "TasksAction.UNSET_LOADING";

    static GET_ALL_TASK = "TasksAction.GET_ALL_TASK";
    static CREATE_TASK = "TasksAction.CREATE_TASK";
    static EDIT_TASK = "TasksAction.EDIT_TASK";
    static SET_COMPLETED = "TasksAction.SET_COMPLETED";
    static SET_UNDO = "TasksAction.SET_UNDO";
    static DELETE_TASK = "TasksAction.DELETE_TASK";
    static DELETE_ALL_TASK = "TasksAction.DELETE_ALL_TASK";

    static getAllTask(){
        return async (dispatch) => {

            dispatch(ActionUtility.createAction(TasksAction.SET_LOADING, null))

            const response  = await TasksEffect.getAllTask()

            if(response.status === 200) {
                dispatch(ActionUtility.createAction(TasksAction.GET_ALL_TASK, response.data.data))
            }

            dispatch(ActionUtility.createAction(TasksAction.UNSET_LOADING, null))
        }
    }

    static createTask(data){
        return async (dispatch) => {

            const response  = await TasksEffect.createTask(data)

            dispatch(ActionUtility.createAction(TasksAction.CREATE_TASK, response))

            return response;
        }
    }

    static editTask(data){
        return async (dispatch) => {

            const response  = await TasksEffect.editTask(data)

            dispatch(ActionUtility.createAction(TasksAction.EDIT_TASK, response))

            return response;
        }
    }

    static completeTask(uuid){
        return async (dispatch) => {

            const response  = await TasksEffect.completeTask(uuid)

            dispatch(ActionUtility.createAction(TasksAction.SET_COMPLETED, response))

            return response;
        }
    }

    static undoTask(uuid){
        return async (dispatch) => {

            const response  = await TasksEffect.undoTask(uuid)

            dispatch(ActionUtility.createAction(TasksAction.SET_UNDO, response))

            return response;
        }
    }

    static deleteTask(uuid){
        return async (dispatch) => {

            const response  = await TasksEffect.deleteTask(uuid)

            dispatch(ActionUtility.createAction(TasksAction.DELETE_TASK, response))

            return response;
        }
    }

    static deleteAllTask(){
        return async (dispatch) => {

            const response  = await TasksEffect.deleteAllTask()

            dispatch(ActionUtility.createAction(TasksAction.DELETE_ALL_TASK, response))

            return response;
        }
    }
}

export default TasksAction