import ActionUtility from "../../utils/ActionUtility";
import AuthsEffect from "./AuthsEffect";
import jwt from "jwt-decode";
import Cookies from "js-cookie"

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

                const { token } = response.data.data
                const decode = jwt(token)

                // console.log(decode)
                const expires = new Date(decode.exp * 1000)

                Cookies.set("token", token, { expires:  expires })
                // console.log(token)
                const user = {
                    uuid : decode.uuid,
                    username : decode.username
                }
                // console.log(user)
                const payload = {
                    user: user,
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