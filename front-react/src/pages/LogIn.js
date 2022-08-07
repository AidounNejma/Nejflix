import React, {useState} from 'react';
import Footer from '../components/Footer';
import '../styles/pages/_login.scss';
import Logo from '../img/logo-long.png'
import axios from 'axios';
import {Navigate} from 'react-router-dom';

const LogIn = () => {

    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [navigate, setNavigate] = useState(false);

    const submit = async e => {
        e.preventDefault();
        const response = await axios.post('login_check', {
            'username': email, password
        }, {withCredentials: true, headers: { "Content-Type": "application/json" }});

        axios.defaults.headers.common['Authorization'] = `nejflix ${response['token']}`;
        console.log(response);
        setNavigate(true);
    }

    if (navigate){
        return <Navigate to="/a-propos"/>
    }
    return (
        <div className='body'>
            <div className="login-wrapper">
                <div className="login-header">
                    <a href="/">
                        <img src={Logo} alt="" />
                    </a>
                </div>

                <div className="login">
            <form className="signin-form" onSubmit={submit}>
                <h1 className="title">Connexion</h1>

                <div className="field">
                    <input type="text" className="text-input" name='email' required  onChange={e=>setEmail(e.target.value)}/>
                    <span className="floating-label">Adresse email</span>
                </div>

                <div className="field">
                    <input type="password" className="text-input" name='password' required onChange={e=>setPassword(e.target.value)} />
                    <span className="floating-label test">Mot de passe</span>
                </div>

                <button className="signin-btn">S'inscrire</button>

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
        </div>

        
    );
};

export default LogIn;