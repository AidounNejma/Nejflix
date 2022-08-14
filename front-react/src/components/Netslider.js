import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/components/_netslider.scss';
import Slide from './Slide';



const Netslider = ({projects, openModal, setProject, title}) => {
    
    const handleOpen = (id) => {
        setProject(projects.find(x => x.id === id));
        openModal(true)
    };

    return (
        <div className="netslider-wrapper">
            <h2>{title}</h2>
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
                        <Slide project={project} />
                    </SwiperSlide>
                ))};
                
            </Swiper>
        </div>
    );
};

export default Netslider;