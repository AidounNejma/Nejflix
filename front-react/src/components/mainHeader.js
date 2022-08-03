import React from 'react';
import '../styles/components/_mainHeader.scss';

const mainHeader = () => {
    return (
        <div>
            <div className='lolomo is-fullbleed'>
                <div className='billboard-row'>
                    <div className='billboard'>
                        <div className='billboard-motion dismiss-mask'>
                            <div className='motion-background-component bottom-layer full-screen'>
                                <div className='hero-image-wrapper'>
                                    <div className="hero static-image image-layer"></div>
                                </div>
                            </div>
                        </div>

                        <div className='info meta-layer'>
                            <div className='logo-and-text meta-layer'>

                                <div className='titleWrapper'>
                                    <div className='billboard-title'>
                                        <h1 className='title-logo'>Nejma <br/> Aidoun</h1>
                                    </div>
                                </div>

                                <div className="info-wrapper">
                                    <div className="info-wrapper-fade">
                                        <div className="supplemental-message">
                                            La série qui va vous faire vibrer.
                                        </div>
                                        <div className="synopsis-fade-container">
                                            <div className="synopsis"> 
                                                <div className="ptrack-content">
                                                    Afin de poursuivre ses études, la jeune Nejma est à la recherche d'une alternance. Un beau matin, elle part à l'aventure se tenant prête à braver tous les dangers.
                                                </div> 
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="billboard-links button-layer forward-leaning">
                                    <a aria-label="Lecture" className="playLink isToolkit" href="/">
                                        <button className="color-primary hasLabel hasIcon" tabIndex="-1" type="button">
                                            <div className="ltr-1ksxkn9">
                                                <div className="medium ltr-18dhnor" role="presentation">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                                                        <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 
                                                        22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor">
                                                        </path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ltr-1i33xgl"></div>
                                            <span className="ltr-zd4xih">Lecture</span>
                                        </button>
                                    </a>
                                    <button className="color-secondary hasLabel hasIcon" data-uia="billboard-more-info" type="button">
                                        <div className="ltr-1ksxkn9">
                                            <div className="medium ltr-18dhnor" role="presentation">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 
                                                    7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 
                                                    10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="ltr-1i33xgl"></div>
                                        <span className="ltr-zd4xih">Plus d'infos</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default mainHeader;