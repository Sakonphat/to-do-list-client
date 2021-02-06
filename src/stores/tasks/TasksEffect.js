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

    static async completeTask(uuid) {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.put('/api/v1/complete/' + uuid);
    }

    static async undoTask(uuid) {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.put('/api/v1/undo/' + uuid);
    }

    static async deleteTask(uuid) {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.delete('/api/v1/delete/' + uuid);
    }

    static async deleteAllTask() {
        let token = Cookies.get("token")
        HttpUtility.defaults.headers['Authorization'] = "Bearer " + token
        return await HttpUtility.delete('/api/v1/delete-all');
    }
}