import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardsAdmin from '../components/CardsAdmin';
import Footer from '../components/Footer';
import Navigation from '../components/Nav';

import axios from '../interceptors/axios';

const Experiences = () => {
    const [experiences, setExperiences] = useState([]);
    
    useEffect(()=>{
        (async () => {
            await axios.get('experiences').then((response)=>{
                
                setExperiences(response.data['hydra:member']);
            });
            
        })();
    }, []);

    return (
        <div>
            <Navigation/>
                <div className='containerLinkCreate'>
                    <Link to={"/creation-experience"} className="linkCreateProject">Créer une expérience</Link>
                </div>
                <CardsAdmin props={experiences}/>
            <Footer/>
        </div>
    );
};

export default Experiences;