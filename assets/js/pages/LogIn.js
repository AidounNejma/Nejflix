import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import AuthApi from "../services/AuthApi";
import AuthContext from '../contexts/AuthContext';
import { toast } from "react-toastify";

import Footer from '../components/Footer';
import '../../css/pages/_login.scss';
import Logo from '../../img/logo-long.png';

const LogIn = () => {

    const {setIsAuthenticated} = useContext(AuthContext);

    /* Redirection de l'utilisateur */
    const navigate = useNavigate();
    const to =  "/tableau-de-bord";

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;

        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthApi.authenticate(credentials);
            setError("");
            toast.success('🥳 Connexion réussie !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsAuthenticated(true);
            navigate(to, { replace: true });

        } catch (error) {
            setError("Les informations de connexions ne sont pas valides");
            toast.error('😩 Les informations de connexions ne sont pas valides.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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

                        <div className="field">
                            <input 
                                type="text" 
                                className="text-input" 
                                name='username' 
                                error={error}
                                autoComplete="off"
                                onChange={handleChange}
                                value={credentials.username}
                                required 
                            />
                            <span className="floating-label" htmlFor="username">Adresse email</span>
                        </div>

                        <div className="field">
                            <input 
                                type="password" 
                                className="text-input" 
                                name='password' 
                                onChange={handleChange}
                                value={credentials.password} 
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