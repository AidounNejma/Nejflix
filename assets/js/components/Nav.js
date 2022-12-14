import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthApi from '../services/AuthApi';
import AuthContext from '../contexts/AuthContext';
import '../../css/components/_navigation.scss';

import NejmaLogo from '../../img/iconNejmaAccount.png';
import InviteLogo from '../../img/iconInviteAccount.png';

const Nav = () => {

    /* Gestion de la navbar au scroll */
    const [navColor, setnavColor] = useState("transparent");
    
    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#141414") : setnavColor("transparent");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
            return () => {
                window.removeEventListener("scroll", listenScrollEvent);
            };
    }, []);

    /* Gestion des liens selon l'authentification */
    const { isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    
    /* Redirection de l'utilisateur */
    const navigate = useNavigate();
    const to =  "/";

    const handleLogout = () => {
        AuthApi.logout();
        setIsAuthenticated(false);
        navigate(to, { replace: true });
    }
    
    return (
        <div className="pinning-header">
            <div className="pinning-header-container">
                <div className="main-header has-billboard menu-navigation" 
                style={{
                    backgroundColor: navColor,
                    transition: "all 1s"
                }}>
                    <NavLink to="/" className="logo icon-logoUpdate active">
                    </NavLink>
                    <ul className="tabbed-primary-navigation">
                        <li className="navigation-tab">
                            <NavLink to="/">
                                Accueil
                            </NavLink>
                        </li>
                        <li className="navigation-tab">
                            <NavLink to="/a-propos">
                                ?? propos
                            </NavLink>
                        </li>
                        
                    {
                        isAuthenticated &&
                        <>
                        <li className="navigation-tab">
                            <NavLink to="/tableau-de-bord">
                                Tableau de bord
                            </NavLink>
                        </li>
                        </>
                    }
                        <li className="navigation-tab">
                            <a className="menu-trigger" role="button" tabIndex="0">Parcourir</a>
                                <div role="menu" className="sub-menu theme-lakira">
                                    <div className="callout-arrow"></div>
                                    <div className="topbar"></div>
                                    <ul className="sub-menu-list"> 
                                        <li className="sub-menu-item" role="none">
                                            <NavLink to="/" className="current active">
                                                Accueil
                                            </NavLink>
                                        </li>
                                        <li className="sub-menu-item" role="none">
                                            <NavLink to="/a-propos">
                                                A propos
                                            </NavLink>
                                        </li>
                                        {
                                            isAuthenticated &&
                                            <>
                                            <li className="sub-menu-item">
                                                <NavLink to="/tableau-de-bord">
                                                    Tableau de bord
                                                </NavLink>
                                            </li>
                                            </>
                                        }
                                    </ul>
                                </div>
                        </li>
                    </ul>
                    
                    <div className="secondary-navigation">
                        <div className="nav-element">
                            <div className="searchBox">
                                <button className="searchTab" tabIndex="0" aria-label="Rechercher" data-uia="search-box-launcher">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="search-icon">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13 11C13 13.7614 10.7614 16 8 16C5.23858 16 3 13.7614 3 11C3 
                                        8.23858 5.23858 6 8 6C10.7614 6 13 8.23858 13 11ZM14.0425 16.2431C12.5758 17.932 10.4126 19 8 19C3.58172 19 0 
                                        15.4183 0 11C0 6.58172 3.58172 3 8 3C12.4183 3 16 6.58172 16 11C16 11.9287 15.8417 12.8205 15.5507 13.6497L24.2533 
                                        18.7028L22.7468 21.2972L14.0425 16.2431Z" fill="currentColor"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="nav-element">
                            <span className="notifications">
                                <button className="notifications-menu" aria-haspopup="true" aria-expanded="false" aria-label="Notifications">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M13 4.57092C16.3922 5.05624 18.9998 7.9736 18.9998 11.5V15.2538C20.0486 15.3307 21.0848 
                                        15.4245 22.107 15.5347L21.8926 17.5232C18.7219 17.1813 15.409 17 11.9998 17C8.59056 17 5.27764 17.1813 2.10699 17.5232L1.89258 15.5347C2.91473 
                                        15.4245 3.95095 15.3307 4.99978 15.2538V11.5C4.99978 7.97345 7.6076 5.05599 11 4.57086V2H13V4.57092ZM8.62568 19.3712C8.6621 20.5173 10.1509 22 
                                        11.9993 22C13.8477 22 15.3365 20.5173 15.373 19.3712C15.38 19.1489 15.1756 19 14.9531 19H9.04555C8.82308 19 8.61862 19.1489 8.62568 19.3712Z" fill="currentColor">
                                        </path>
                                    </svg>
                                    <span className="notification-pill">0</span>
                                </button>
                            </span>
                        </div>
                        <div className="nav-element">
                            <div className="account-menu-item">
                                <div className="account-dropdown-button">
                                {
                                    isAuthenticated &&
                                    <>
                                    <a href="/tableau-de-bord" role="button" tabIndex="0" aria-haspopup="true" aria-expanded="false" aria-label="Invit?? - Compte et param??tres">
                                        <span className="profile-link" role="presentation">
                                            <img className="profile-icon" src={NejmaLogo} alt=""/>
                                        </span>
                                    </a>
                                    <span className="caret" role="presentation" >
                                    </span>
                                    <div role="menu" tabIndex="0" className="account-drop-down sub-menu theme-lakira">
                                        <div className="topbar"></div>
                                        <ul className="sub-menu-list sign-out-links">
                                            <li className="sub-menu-item">
                                                <a className="sub-menu-link " href="#" onClick={handleLogout}>Se d??connecter</a>
                                            </li>
                                        </ul>
                                    </div>

                                    
                                    
                                    
                                    </>
                                }
                                { 
                                    !isAuthenticated &&
                                    <>
                                    <a href="/connexion" role="button" tabIndex="0" aria-haspopup="true" aria-expanded="false" aria-label="Invit?? - Compte et param??tres">
                                        <span className="profile-link" role="presentation">
                                            <img className="profile-icon" src={InviteLogo} alt=""/>
                                        </span>
                                    </a>
                                    </>

                                    
                                }
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            
        </div>
    );
};

export default Nav;

