import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);
const apiData=axios.create({
    baseURL:apiUrl,
    withCredentials:true
});

export default apiData;