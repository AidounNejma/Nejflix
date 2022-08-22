import React from 'react';
import '../assets/styles/components/_cards.scss';

const CardsDashboard = () => {

    //Effet de glissement lors du hover d'une carte
    const panels = document.querySelectorAll(".panelCards");

    panels.forEach((panel) => {
        panel.addEventListener("mouseover", () => {
            removeActiveClasses();
            panel.classList.add("active");
        });
    });

    const removeActiveClasses = () => {
        panels.forEach((panel) => {
            panel.classList.remove("active");
        });
    };

    return (
        <div className="containerCards">
            
            <a href="/tous-les-projets" className="panelCards active" >
                <h3>Mes projets</h3>
            </a>

            <a href="/toutes-les-experiences"className="panelCards" >
                <h3>Mes expériences</h3>
            </a>

            <a href="/toutes-les-formations" className="panelCards">
                <h3>Mes formations</h3>
            </a>

            <a href="/" className="panelCards" >
                <h3>Mes informations personnelles</h3>
            </a>

            <a href="/" className="panelCards">
                <h3>Mes demandes de contact</h3>
            </a>

        </div>
    );
};

export default CardsDashboard;