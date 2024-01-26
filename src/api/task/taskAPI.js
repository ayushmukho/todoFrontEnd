import axios from "axios";
export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:5678/v2", //`https://jellyfish-app-vzwiq.ondigitalocean.app/v2`,
        headers: {
          jwtToken: localStorage.getItem('token')
        }
    });
  }

  todoTask(data) {
    return this.instance.post("/todo-task", data);
  }
  deleteTodoTask(data) {
    return this.instance.delete("/todo-task", { data: data });
  }
	completeTask(data) {
    return this.instance.post("/complete-task", data);
  }
	pendingTask(data) {
    return this.instance.post("/pending-task", data);
  }
  getTodoTask() {
    return this.instance.get("/todo-task");
  }
	getCompleteTask() {
    return this.instance.get("/complete-task");
  }
	getPendingTask() {
    return this.instance.get("/pending-task");
  }
}
