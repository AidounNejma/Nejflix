import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Slide = ({project}) => {
    const [thumb, setThumb] = useState([]);

    //Requête pour récupérer l'image de couverture
    useEffect(() => {
        axios.get('https://127.0.0.1:8000' + project.thumbnail).then( resp => {

            setThumb({'path': resp.data.contentUrl});
            return resp.data.contentUrl

        });
    });

    return (
        <button>
            <div style={{background: `url(http://127.0.0.1:8000${thumb.path})`}} className='thumbnailSwiper'>
                <h1 className="heading">{project.name}</h1>
            </div>
        </button>
    );
};

export default Slide;