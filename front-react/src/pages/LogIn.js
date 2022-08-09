import React, {useState, useRef, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import axios from '../interceptors/axios';
import jwtDecode from 'jwt-decode';

import Footer from '../components/Footer';
import '../assets/styles/pages/_login.scss';
import Logo from '../assets/img/logo-long.png';
import AuthApi from '../services/AuthApi';

const LogIn = () => {

    const { setAuth } = useAuth();
    const LOGIN_URL = "login_check";

    /* Redirection de l'utilisateur */
    const navigate = useNavigate();

    const from =  "/tableau-de-bord";
    
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();  
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify(
                    { username: email, password }
                ),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            
            const authToken = response?.data?.token;
            const parsedData = jwtDecode(response?.data?.token);
            const roles = parsedData.roles;
            const identifier = parsedData.username;

            setAuth({identifier, password, roles, authToken});
            
            axios.defaults.headers['Authorization'] = `Bearer ${authToken}`;
            window.localStorage.setItem("authToken", authToken);

            setEmail('');
            setPassword('');
            
            /* Si la connexion est réussie, j'envoie l'utilisateur sur le tableau de bord */
            navigate(from, { replace: true });

        } catch(err){

            if(!err?.response){
                setErrMsg('Pas de réponse du serveur')
            }else if(err.response?.status === 400){
                setErrMsg('Il manque le mail ou le mot de passe');
            }else if(err.response?.status === 401){
                setErrMsg('Accès non autorisé');
            } else{
                setErrMsg('Echec de la connexion');
            }
            errRef.current.focus();
        }
        
    }
    return (
        <section className='body'>
            <div className="login-wrapper">
                <div className="login-header">
                    <a href="/">
                        <img src={Logo} alt="" />
                    </a>
                </div>

                <div className="login">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h1 className="title">Connexion</h1>

                <small ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</small>

                <div className="field">
                    <input 
                        type="text" 
                        className="text-input" 
                        name='email' 
                        ref={userRef}
                        autoComplete="off"
                        onChange={e=>setEmail(e.target.value)}
                        value={email}
                        required 
                    />
                    <span className="floating-label" htmlFor="email">Adresse email</span>
                </div>

                <div className="field">
                    <input 
                        type="password" 
                        className="text-input" 
                        name='password' 
                        onChange={e=>setPassword(e.target.value)}
                        value={password} 
                        required
                    />
                    <span className="floating-label test" htmlFor="password">Mot de passe</span>
                </div>

                <button className="signin-btn">Se connecter</button>

                <div className="action-group">
                    <label htmlFor="remember-me">
                        <input type="checkbox" className="checkbox" id="remember-me" />
                        Se souvenir de moi
                    </label>
                    <a href="/">Besoin d'aide?</a>
                </div>

                
            </form>
        </div>

            </div>

            <Footer/>
        </section>

    );
};

export default LogIn;