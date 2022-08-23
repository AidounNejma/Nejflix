import Navigation from '../components/Navigation';
import MainHeader from '../components/MainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import {useEffect,useState} from 'react';

import axios from '../interceptors/axios';
import NejflixModal from '../components/NejflixModal';

const About = () => {

    const [show, setShow] = useState(false);
    const [element, setElements] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);

    useEffect( () => {
        (async () => {
            await axios.get('projects').then((response)=>{
                setProjects(response.data['hydra:member']);
            });
            await axios.get('experiences').then((response)=>{
                setExperiences(response.data['hydra:member']);
            });
            await axios.get('education').then((response)=>{
                setEducations(response.data['hydra:member']);
            });
            
        })();
    }, []);

    


    return (
        <div>
            <Navigation />
            <MainHeader />
            <NetSlider elements={projects} element={element} openModal={setShow} setElements={setElements} title="Mes projets"/>
            <NetSlider elements={experiences} element={element} openModal={setShow} setElements={setElements} title="Mes expériences"/>
            <NetSlider elements={educations} element={element} openModal={setShow} setElements={setElements} title="Mes formations"/>
            <NejflixModal opened={show} setIsOpened={setShow} element={element} />
            <Footer />
        </div>
    );
};

export default About;