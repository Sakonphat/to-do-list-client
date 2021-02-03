import HttpUtility from '../../utils/HttpUtility';
import Cookies from "js-cookie"


export default class AuthsEffect {
    static async register(data) {
        return await HttpUtility.post('/api/v1/register', data);
    }

    static async login(data) {
        return await HttpUtility.post('/api/v1/login', data);
    }

    static async logout() {

        let token = Cookies.get("token")

        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token

        return await HttpUtility.post('/api/v1/logout');
    }
}