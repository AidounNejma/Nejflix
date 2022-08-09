import React from 'react';
import '../assets/styles/components/_accounts.scss';
import { NavLink } from "react-router-dom";

const Accounts = () => {
    return (
        <div className='profiles-gate-container'>
            <div className='centered-div'>
                <section className='list-profiles'>
                    <h1 className="profile-gate-label">Qui est-ce&nbsp;?</h1>
                    <ul className='choose-profile'>
                        <li className='profile'>
                            <div>
                                <NavLink className="profile-link" tabIndex="0" to="/a-propos">
                                    <div className="avatar-wrapper">
                                        <div className="profile-icon"> 
                                        </div>
                                    </div>
                                    <span className="profile-name">Invité</span>
                                </NavLink>
                            </div>
                        </li>
                        <li className='profile'>
                            <div>
                                <NavLink className="profile-link" tabIndex="0" to="/connexion">
                                    <div className="avatar-wrapper">
                                        <div className="profile-icon"> 
                                        </div>
                                    </div>
                                    <span className="profile-name">Nejma</span>
                                </NavLink>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Accounts;