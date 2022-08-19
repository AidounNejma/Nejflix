import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';

const Slide = ({project}) => {
    const [thumb, setThumb] = useState([]);

    //Requête pour récupérer l'image de couverture
    useEffect(() => {
        axios.get(BASE_URL + project.thumbnail).then( resp => {

            setThumb({'path': resp.data.contentUrl});
            return resp.data.contentUrl

        });
    });

    return (
        <button>
            <div style={{background: `url(${BASE_URL + thumb.path})`}} className='thumbnailSwiper'>
                <h1 className="heading">{project.name}</h1>
            </div>
        </button>
    );
};

export default Slide;