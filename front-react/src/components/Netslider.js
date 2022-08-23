import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/styles/components/_netslider.scss';
import Slide from './Slide';


const Netslider = ({elements, setElements, openModal, title}) => {
    
    const handleOpen = (id) => {
        setElements(elements.find(x => x.id === id));
        openModal(true);
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
                {elements.map(element=> (
                    <SwiperSlide 
                        className='item' 
                        key={element.id} 
                        onClick={()=> handleOpen(element.id)}
                    >
                        <Slide element={element} />
                    </SwiperSlide>
                ))};
                
            </Swiper>
        </div>
    );
};

export default Netslider;