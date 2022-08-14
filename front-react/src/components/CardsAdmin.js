import React from 'react';
import '../assets/styles/components/_cardsAdmin.scss';
import CardAdmin from './CardAdmin';



const CardsAdmin = ({projects}) => {
    

    return (

        <div className="row">
            {projects.map(project=> (
                
                <CardAdmin project={project} key={project.id}/>
            ))}
        </div>
    );
};

export default CardsAdmin;