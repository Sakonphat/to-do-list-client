import ActionUtility from '../../../utils/ActionUtility';

export default class LoadingAction {
    static SET_LOADING = 'LoadingAction.SET_LOADING';
    static UNSET_LOADING = 'LoadingAction.UNSET_LOADING';

    static setLoading() {
        return async (dispatch) => {
            dispatch(ActionUtility.createAction(LoadingAction.SET_LOADING, null));
        }
    }

    static unsetLoading() {
        return async (dispatch) => {
            dispatch(ActionUtility.createAction(LoadingAction.UNSET_LOADING, null));
        }
    }
}
