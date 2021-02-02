import axios from "axios";
import notify from "./Notify";
// import store from "../stores/rootStore";
import Cookies from "js-cookie"
import jwt from "jwt-decode";
import ActionUtility from "./ActionUtility";
import AuthsAction from "../stores/auths/AuthsAction";


let httpUtility = axios.create({
    baseURL: process.env.REACT_APP_SERVER,
    responseType: "json",
    headers: {
        'Content-Type': 'application/json'
    },
    transformRequest: [function (data, headers) {
        return JSON.stringify(data);
    }],
});

httpUtility.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    console.log(error);

    if (error.response.status === 422) {
        const { message } = error.response.data;
        notify(message, 'error');
    }

    if (error.response.status === 401) {
        const { message } = error.response.data;

        const token = Cookies.get("token")

        if(token){

            const decode = jwt(token)
            const now = new Date()
            const expires = new Date(decode.exp * 1000)

            if(now.getTime() >= expires.getTime()){
                Cookies.remove("token")
                notify("session is expired.", 'warn');
                return async (dispatch) => {
                    await dispatch(ActionUtility.createAction(AuthsAction.LOGOUT));
                    return window.location.href = '/session-expired';
                }

            }
        } else {
            notify("session is expired.", 'warn');
            return async (dispatch) => {
                await dispatch(ActionUtility.createAction(AuthsAction.LOGOUT));
                return window.location.href = '/session-expired';
            }

        }

        notify(message, 'error');

    }

    // alert(message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
});

export default httpUtility;
