import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true,

    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    if (!document.cookie.includes('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie', {
            withCredentials: true
        });
    }
    return config;
});

export default axiosInstance;