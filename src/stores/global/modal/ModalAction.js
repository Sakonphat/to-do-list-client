import ActionUtility from "../../../utils/ActionUtility";

export default class ModalAction {
    static OPEN_MODAL = 'ModalAction.OPEN_MODAL';
    static CLOSE_MODAL = 'ModalAction.CLOSE_MODAL';

    static setModal(title, description) {
        return (dispatch) => {
            dispatch(ActionUtility.createAction(ModalAction.OPEN_MODAL, {
                title : title,
                description : description
            }));
        }
    }

    static unsetModal() {
        return (dispatch) => {
            dispatch(ActionUtility.createAction(ModalAction.CLOSE_MODAL));
        }
    }
}
