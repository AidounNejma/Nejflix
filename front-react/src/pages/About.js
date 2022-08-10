import Navigation from '../components/Navigation';
import MainHeader from '../components/MainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import {useEffect,useState} from 'react';

import axios from '../interceptors/axios';
import NejflixModal from '../components/NejflixModal';

const About = () => {

    const [show, setShow] = useState(false);
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
            <Navigation />
            <MainHeader />
            <NetSlider projects={projects} openModal={setShow} />
            <NejflixModal opened={show} setIsOpened={setShow}/>
            <Footer />
        </div>
    );
};

export default About;