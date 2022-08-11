import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/components/_netslider.scss';



const Netslider = ({projects, openModal, setProject}) => {
    
    const handleOpen = (id) => {
        setProject(projects.find(x => x.id === id));
        openModal(true)
    };

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
                    <SwiperSlide 
                        className='item' 
                        key={project.id} 
                        onClick={()=> handleOpen(project.id)}
                    >
                        <button>
                            <img
                            src="https://occ-0-1567-1123.1.nflxso.net/dnm/api/v5/rendition/412e4119fb212e3ca9f1add558e2e7fed42f8fb4/AAAABRvngexxF8H1-OzRWFSj6ddD-aB93tTBP9kMNz3cIVfuIfLEP1E_0saiNAwOtrM6xSOXvoiSCMsihWSkW0dq808-R7_lBnr6WHbjkKBX6I3sD0uCcS8kSPbRjEDdG8CeeVXEAEV6spQ.webp"
                            alt="Describe" />

                            <h1 className="heading">{project.name}</h1>
                        </button>
                    </SwiperSlide>
                ))};
                
            </Swiper>
        </div>
    );
};

export default Netslider;