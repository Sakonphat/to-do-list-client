import ActionUtility from "../../utils/ActionUtility";
import AuthsEffect from "./AuthsEffect";

class AuthsAction {
    static REGISTER = "AuthsAction.REGISTER";
    static LOGIN = "AuthsAction.LOGIN";
    static LOGOUT = "AuthsAction.LOGOUT";

    static register(data) {
        return async (dispatch) => {
            // call some httpUtility request with effect
            const response = await AuthsEffect.register(data);

            // dispatch reducers
            dispatch(ActionUtility.createAction(AuthsAction.REGISTER, response));

            return response;
        }
    }

    static login(data) {
        return async (dispatch) => {
            const response = await AuthsEffect.login(data);

            if (response.data.success) {
                const payload = {
                    user: response.data.data.user,
                    isLoggedIn: response.data.success
                };

                dispatch(ActionUtility.createAction(AuthsAction.LOGIN, payload));
            }

            return response
        }
    }

    static logout() {
        return async (dispatch) => {
            const response = await AuthsEffect.logout();

            dispatch(ActionUtility.createAction(AuthsAction.LOGOUT));

            return response
        }
    }
}
export default AuthsAction;