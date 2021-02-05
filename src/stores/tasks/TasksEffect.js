import HttpUtility from '../../utils/HttpUtility';
import Cookies from "js-cookie"

export default class TasksEffect{

    static async getAllTask() {
        let token = Cookies.get("token")
        // console.log(token)
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token

        return await HttpUtility.post('/api/v1/tasks');
    }

    static async createTask(data) {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.post('/api/v1/task', data);
    }

    static async editTask(data) {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.put('/api/v1/edit', data);
    }
}