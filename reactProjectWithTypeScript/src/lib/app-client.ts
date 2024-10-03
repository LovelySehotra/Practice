import axios from "axios";
let PUBLIC_BASE_URI="http://localhost:5173/api";
const appClient=axios.create({
    baseURL:PUBLIC_BASE_URI,
    withCredentials:true
})
appClient.interceptors.request.use((config)=>{
    const accessToken = JSON.parse(localStorage.get("data"))?.accessToken;
    if(accessToken){
        config.headers.Authorization=`Bearer ${accessToken}`;
    }
    return config;
},
(error)=>{
return Promise.reject(error);
}
)
export default appClient;