import axios from "axios";
import notify from "./Notify";
import store from "../stores/rootStore";

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
        const { error: { errors }} = error.response.data;
        notify(errors[Object.keys(errors)[0]], 'error');
    }

    if (error.response.status === 401) {
        const { error: { message } } = error.response.data;
        notify(message, 'error');

        const isLoggedIn = store.getState().auths.isLoggedIn;

        if (isLoggedIn) {
            return window.location.href = '/login';
        }
    }

    // alert(message);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
});

export default httpUtility;
