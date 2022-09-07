import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import Unavailable from '../assets/img/content-unavailable.jpeg';

const Slide = ({element}) => {
    const [thumb, setThumb] = useState([]);

    //Requête pour récupérer l'image de couverture
    useEffect(() => {
        axios.get(BASE_URL + element.thumbnail).then( resp => {

            setThumb({'path': resp.data.contentUrl});
            return resp.data.contentUrl

        });
    }, []);

    return (
        <button>
            {
                element.thumbnail == null ?
                <div style={{background: 'url('+ Unavailable +')'}} className='thumbnailSwiper'>
                    <h1 className="heading">{element.name}</h1>
                </div>
                :
                <div style={{background: 'url('+ BASE_URL + thumb.path +')'}} className='thumbnailSwiper'>
                    <h1 className="heading">{element.name}</h1>
                </div>
            }
            
        </button>
    );
};

export default Slide;