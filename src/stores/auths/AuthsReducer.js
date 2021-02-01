import AuthsAction from "./AuthsAction";

const initialState = {
    user: null,
    isLoggedIn: null
};

const registerActions = {AuthsAction};

export default function AuthsReducer(state = initialState, action) {
    switch (action.type) {
        case registerActions.REGISTER :
            return {
                ...state
            };
        case registerActions.LOGIN :
            return {
                ...state,
                user: action.payload.user
            };
        case registerActions.LOGOUT :
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
