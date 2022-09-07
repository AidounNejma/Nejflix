import React from 'react';
import Navigation from '../components/Nav';
import MainHeader from '../components/MainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import {useEffect,useState} from 'react';

import axios from 'axios';
import NejflixModal from '../components/NejflixModal';
import { API_URL } from '../config';
import ModalMainHeader from '../components/ModalMainHeader';
import LoadingScreen from '../components/LoadingScreen';
import VideoPlayer from '../components/VideoPlayer';

const About = () => {

    const [show, setShow] = useState(false);
    const [showModalHeader, setShowModalHeader] = useState(false);
    const [element, setElements] = useState([]);

    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [informations, setInformations] = useState([]);

    const [getVideo, setGetVideo] = useState([]);
    const [showVideo, setShowVideo] = useState(false);

    const [loading, setLoading] = useState(false);

    let apiUrls = [
        API_URL + 'projects',
        API_URL + 'experiences',
        API_URL + 'education',
        API_URL + 'informations'
    ];

    useEffect( () => {

        axios.all(apiUrls.map((apiUrl) => axios.get(apiUrl))).then(
            axios.spread(({data: projects}, {data: experiences}, {data: education}, {data: informations}) => {
                setProjects(projects['hydra:member']);
                setExperiences(experiences['hydra:member']);
                setEducations(education['hydra:member']);
                setInformations(informations['hydra:member']);
                setLoading(true);
            })
        );
    }, []);

    
    return (
        <div>
            <Navigation />

            {loading ? 
                (
                    <div>
                        <MainHeader elements={informations} element={element} openModalHeader={setShowModalHeader} setElements={setElements} setGetVideo={setGetVideo} setShowVideo={setShowVideo} />
                        <ModalMainHeader openedModalHeader={showModalHeader} setIsOpendModalHeader={setShowModalHeader} element={element} setGetVideo={setGetVideo} setShowVideo={setShowVideo}/>
            
                        <NetSlider elements={projects} element={element} openModal={setShow} setElements={setElements} title="Mes projets"/>
                        <NetSlider elements={experiences} element={element} openModal={setShow} setElements={setElements} title="Mes expériences"/>
                        <NetSlider elements={educations} element={element} openModal={setShow} setElements={setElements} title="Mes formations"/>
                        
                        <NejflixModal opened={show} setIsOpened={setShow} element={element} setGetVideo={setGetVideo} setShowVideo={setShowVideo} />
                        <VideoPlayer video={getVideo} showVideo={showVideo} setShowVideo={setShowVideo} />
                    </div>
                ) : 
                (
                    <LoadingScreen/>
                )
            }
            

            <Footer />
        </div>
    );
};

export default About;