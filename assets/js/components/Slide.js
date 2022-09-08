import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import Unavailable from '../../img/content-unavailable.jpeg';

const Slide = ({element}) => {
    
    return (
        <button>
            {
                element.thumbnail == null ?
                <div style={{background: 'url('+ Unavailable +')'}} className='thumbnailSwiper'>
                    <h1 className="heading">{element.name}</h1>
                </div>
                :
                <div style={{background: 'url('+ BASE_URL + element.thumbnail.contentUrl +')'}} className='thumbnailSwiper'>
                    <h1 className="heading">{element.name}</h1>
                </div>
            }
            
        </button>
    );
};

export default Slide;