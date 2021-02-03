
const initialState = {
    isOpen: false,
    title: "",
    description: ""
};

export default function ModalReducer(state = initialState, action) {
    switch (action.type) {
        case "ModalAction.OPEN_MODAL":
            return {
                ...state,
                isOpen: true,
                title: action.payload.title,
                description: action.payload.description
            };
        case "ModalAction.CLOSE_MODAL":
            return {
                ...state,
                isOpen: false,
                title: "",
                description: ""
            };
        default:
            return state;
    }
}
