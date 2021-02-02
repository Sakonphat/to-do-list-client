
const initialState = {
    user: null,
    isLoggedIn: null
};


export default function AuthsReducer(state = initialState, action) {
    switch (action.type) {
        case "AuthsAction.REGISTER" :
            return {
                ...state
            };
        case "AuthsAction.LOGIN" :
            return {
                ...state,
                user: action.payload.user,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case "AuthsAction.LOGOUT" :
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
}
