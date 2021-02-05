
const initialState = {
    loading: false
}

export default function LoadingReducer(state = initialState, action) {
    switch (action.type) {
        case "LoadingAction.SET_LOADING":
            return {
                ...state,
                loading: true
            }

        case "LoadingAction.UNSET_LOADING":
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}
