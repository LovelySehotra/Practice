import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_DOMAIN + "api/v1/";
const axiosInstance = axios.create({
    baseURL: BASE_URL,
withCredentials:true
});



export default axiosInstance;