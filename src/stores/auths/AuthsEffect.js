import HttpUtility from '../../utils/HttpUtility';

export default class AuthsEffect {
    static async register(data) {
        return await HttpUtility.post('/register', data);
    }

    static async login(data) {
        return await HttpUtility.post('/login', data);
    }

    static async logout() {
        return await HttpUtility.post('/logout');
    }
}