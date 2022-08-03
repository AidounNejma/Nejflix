import React, {useEffect,useState} from 'react';
import Navigation from '../components/Navigation';
import MainHeader from '../components/mainHeader';
import NetSlider from '../components/Netslider';
import Footer from '../components/Footer';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000/projects" 
});

const About = () => {
    
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        client.get('').then((response) => {
            setProjects(response.data);
            console.log(response);
        });
    }, []);

    return (
        <div>
            <Navigation />
            <MainHeader />
            <NetSlider />
            <NetSlider />
            <Footer />
        </div>
    );
};

export default About;