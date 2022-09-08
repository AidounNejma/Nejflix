import axios from "axios";
import { API_URL } from "../config";
//Url de base pour les appels à l'API

export default axios.create({

    baseURL : API_URL,
    
    withCredentials: true
});

export const axiosPrivate = axios.create({
    
    baseURL : API_URL,
    headers: {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "*"
    },
    
    withCredentials: true
});