import React from 'react';
import '../assets/styles/components/_cardsAdmin.scss';
import CardAdmin from './CardAdmin';



const CardsAdmin = ({props}) => {
    

    return (
        <div>
            <div className="row">
                
                {props.map(prop=> (
                    
                    <CardAdmin element={prop} key={prop.id}/>
                ))}
            </div>
        </div>
    );
};

export default CardsAdmin;