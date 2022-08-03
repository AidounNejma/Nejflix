import React from 'react';
import Footer from '../components/Footer';
import '../styles/pages/_login.scss';
import Logo from '../img/logo-long.png'

const LogIn = () => {
    return (
        <div className='body'>
            <div className="login-wrapper">
                <div className="login-header">
                    <a href="/">
                        <img src={Logo} alt="" />
                    </a>
                </div>

                <div className="login">
                    <form className="signin-form">
                        <h1 className="title">Connexion</h1>

                        <div className="field">
                            <input type="text" className="text-input" required />
                            <span className="floating-label">Adresse email ou téléphone</span>
                        </div>

                        <div className="field">
                            <input type="password" className="text-input" required />
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