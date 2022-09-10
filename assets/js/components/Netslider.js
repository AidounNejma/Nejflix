import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../css/components/_netslider.scss';
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
                spaceBetween={20}
                slidesPerView={4}
                navigation
                className='section'
                breakpoints={{
                    // when window width is >= 640px
                    414: {
                        width: 414,
                        slidesPerView: 1,
                        spaceBetween:0
                    },
                    // when window width is >= 768px
                    600: {
                        width: 600,
                        slidesPerView: 2,
                        spaceBetween:10
                    },
                    895: {
                        width: 895,
                        slidesPerView: 3,
                        spaceBetween:20
                    },
                }}
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