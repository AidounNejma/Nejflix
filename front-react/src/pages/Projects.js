import React, { useEffect, useState } from 'react';
import CardsAdmin from '../components/CardsAdmin';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

import axios from '../interceptors/axios';

const Projects = () => {

    const [projects, setProjects] = useState([]);
    
    useEffect(()=>{
        (async () => {
            await axios.get('projects').then((response)=>{
                setProjects(response.data['hydra:member']);
            });
            
        })();
    }, []);

    return (
        <div>
            <Navigation/>
                <CardsAdmin projects={projects}/>
            <Footer/>
        </div>
    );
};

export default Projects;