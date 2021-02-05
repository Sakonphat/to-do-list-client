
const initialState = {
    tasks: [],
    loading: true,
};

export default function TasksReducer(state = initialState, action){
    switch (action.type) {
        case "TasksAction.GET_ALL_TASK" :
            return {
                ...state,
                tasks: action.payload
            };
        case "TasksAction.CREATE_TASK" :
            return {
                ...state
            };
        case "TasksAction.EDIT_TASK" :
            return {
                ...state
            };
        case "TasksAction.SET_LOADING" :
            return {
                ...state,
                loading: true
            };
        case "TasksAction.UNSET_LOADING" :
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}