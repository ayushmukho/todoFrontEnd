import axios from "axios";
export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: "https://jellyfish-app-vzwiq.ondigitalocean.app/v2",
      //   headers: {
      //     Authorization: JSON.parse(localStorage.getItem('userAuth'))
      //       ?.authorization
      //   }
    });
  }

  register(data) {
    return this.instance.post("/register", data);
  }
  login(data) {
    return this.instance.post("/login", data);
  }
}
