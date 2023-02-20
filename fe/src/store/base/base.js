import axios from "axios";

const API = axios.create({
 baseURL: "https://imarketbe.capstone-group.online/api",
});

export default API;
