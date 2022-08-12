import axios from "axios";

//Url de base pour les appels à l'API
const BASE_URL = "https://127.0.0.1:8000/api/";

export default axios.create({

    baseURL : BASE_URL
});

export const axiosPrivate = axios.create({
    
    baseURL : BASE_URL,
    headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
    },
    
    withCredentials: true
});