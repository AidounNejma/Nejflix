import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/_cardsAdmin.scss';
import CardAdmin from './CardAdmin';



const CardsAdmin = ({projects}) => {
    

    return (
        <div>
            <div className='containerLinkCreate'>
                <Link to={"/creation-du-projet/"} className="linkCreateProject">Créer un projet</Link>
            </div>
            <div className="row">
                
                {projects.map(project=> (
                    
                    <CardAdmin project={project} key={project.id}/>
                ))}
            </div>
        </div>
    );
};

export default CardsAdmin;