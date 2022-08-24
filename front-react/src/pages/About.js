import Navigation from '../components/Navigation';
import MainHeader from '../components/MainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import {useEffect,useState} from 'react';

import axios from 'axios';
import NejflixModal from '../components/NejflixModal';
import { API_URL } from '../config';

const About = () => {

    const [show, setShow] = useState(false);
    const [element, setElements] = useState([]);
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);

    let apiUrls = [
        API_URL + 'projects',
        API_URL + 'experiences',
        API_URL + 'education'
    ];

    useEffect( () => {

        axios.all(apiUrls.map((apiUrl) => axios.get(apiUrl))).then(
            axios.spread(({data: projects}, {data:experiences}, {data: education}) => {
                setProjects(projects['hydra:member']);
                setExperiences(experiences['hydra:member']);
                setEducations(education['hydra:member'])
            })
        );
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