import Navigation from '../components/Navigation';
import MainHeader from '../components/MainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import {useEffect,useState} from 'react';

import axios from 'axios';
import NejflixModal from '../components/NejflixModal';

const client = axios.create({
    baseURL: "https://127.0.0.1:8000/api/projects" 
});

const About = () => {

    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        client.get('?page=1').then((response) => {
            setProjects(response.data['hydra:member']);
        });
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