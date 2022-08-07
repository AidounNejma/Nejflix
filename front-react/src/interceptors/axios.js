import axios from "axios";

//Url de base pour les appels à l'API
axios.defaults.baseURL = "https://127.0.0.1:8000/api/";

//Intercepteurs des erreur d'Axios
axios.interceptors.response.use(resp=>resp, async error=>{
    if(error.response.status === 401){
        const response = await axios.post('refresh', {}, {withCredentials: true})
    }
})