//verificar o ipv4 com ipconfig no prompt de comando, n esqueça da porta!!
import axios from "axios";
//const baseURL = "http://192.168.1.10:3000";
//const baseURL = "http://192.168.1.5:3000";
//const baseURL = "http://127.0.0.1:3000";
const baseURL = "http://192.168.1.11:3000";
const api = axios.create({
  baseURL,
  validateStatus: (status) => status >= 200 && status <= 500,
});

export default api;