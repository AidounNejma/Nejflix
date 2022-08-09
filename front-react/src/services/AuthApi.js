import axios from "../interceptors/axios";
import jwtDecode from "jwt-decode";

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function login(token) {
    // on stocke le token dans le local storage
    localStorage.setItem("authToken", token);
    // on prévient axios qu'on a maintenant un header par défaut sur les futures requêtes http
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function setup() {
    const token = localStorage.getItem("authToken");

    if(token) {
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()) {

            login(token);
            return true;
        }
    }
    logout();
    return false;
}

export default {
    logout,
    setup,
    login
};