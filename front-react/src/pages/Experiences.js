import React, { useEffect, useState } from 'react';
import CardsAdmin from '../components/CardsAdmin';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

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
                {/* <CardsAdmin experience={experiences}/> */}
            <Footer/>
        </div>
    );
};

export default Experiences;