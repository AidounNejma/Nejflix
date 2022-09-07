import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardsAdmin from '../components/CardsAdmin';
import Footer from '../components/Footer';
import Navigation from '../components/Nav';

import axios from '../interceptors/axios';

const Educations = () => {
    const [educations, setEducations] = useState([]);
    
    useEffect(()=>{
        (async () => {
            await axios.get('education').then((response)=>{
                
                setEducations(response.data['hydra:member']);
            });
            
        })();
    }, []);

    return (
        <div>
            <Navigation/>
                <div className='containerLinkCreate'>
                    <Link to={"/creation-formation"} className="linkCreateProject">Créer une formation</Link>
                </div>
                <CardsAdmin props={educations}/>
            <Footer/>
        </div>
    );
};

export default Educations;