import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                <div className='containerLinkCreate'>
                    <Link to={"/creation-du-projet/"} className="linkCreateProject">Créer un projet</Link>
                </div>
                <CardsAdmin props={projects}/>
            <Footer/>
        </div>
    );
};

export default Projects;