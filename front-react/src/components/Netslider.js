import React, {useEffect,useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/components/_netslider.scss';

import axios from 'axios';

const client = axios.create({
    baseURL: "https://127.0.0.1:8000/api/projects" 
});


const Netslider = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        client.get('?page=1').then((response) => {
            setProjects(response.data['hydra:member']);
        });
    }, []);

    return (
        <div className="netslider-wrapper">
            <h2>Mes projets</h2>
            <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                navigation
                className='section'
            >
                {projects.map(project=> (
                    <SwiperSlide className='item' key={project.id}>
                        <a href="/">
                            <img
                            src="https://occ-0-1567-1123.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRvngexxF8H1-OzRWFSj6ddD-aB93tTBP9kMNz3cIVfuIfLEP1E_0saiNAwOtrM6xSOXvoiSCMsihWSkW0dq808-R7_lBnr6WHbjkKBX6I3sD0uCcS8kSPbRjEDdG8CeeVXEAEV6spQ.webp"
                            alt="Describe" />

                            <h1 className="heading">{project.name}</h1>
                        </a>
                    </SwiperSlide>
                ))};
                
                {/* <SwiperSlide className='item'>
                    <a href="/">
                        <img
                        src="https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABZEK-7pZ1H5FD4cTyUb9qB_KeyJGz5p-kfPhCFv4GU_3mbdm8Xfsy4IBchlG9PFNdGff8cBNPaeMra72VFnot41nt0y3e8RLgaVwwh3UvyM2H2_MkmadWbQUeGuf811K7-cxJJh7gA.jpg"
                        alt="Describe" />

                        <h1 className="heading">Heading One</h1>
                    </a>
                    
                </SwiperSlide>
                <SwiperSlide className='item'>
                    <a href="/">
                        <img
                        src="https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABQCoK53qihwVPLRxPEDX98nyYpGbxgi5cc0ZOM4iHQu7KQvtgNyaNM5PsgI0vy5g3rLPZdjGCFr1EggrCPXpL77p2H08jV0tNEmIfs_e8KUfvBJ6Ay5nM4UM1dl-58xA6t1swmautOM.webp"
                        alt="Describe" />

                        <h1 className="heading">Heading One</h1>
                    </a>
                </SwiperSlide>
                <SwiperSlide className='item'>
                    <a href="/">
                        <img
                        src="https://occ-0-243-299.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABdYtAqj8CyaJTWq5taD8Ro_UgwH3nne9QpFGVps-2J3IG-leqrfqXFii4jzZn48nPYTkrlwKQEV0R7_cEKlYBPRzdKqNODc-Oz26IL3LlLgFboXibIWXwxzeYxzuqn0I9TpARjeByw.jpg"
                        alt="Describe" />

                        <h1 className="heading">Heading One</h1>
                    </a>
                </SwiperSlide> */}

            </Swiper>
        </div>
    );
};

export default Netslider;