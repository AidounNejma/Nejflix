import React from 'react';
import axios from "../interceptors/axios";
import {useEffect, useState} from "react";

import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const Profile = () => {
    const [name, setName] = useState('');

    useEffect(()=>{
        (async () => {
            const {data} = await axios.get('users');

            setName(data.name);
        })();
    }, []);

    return (
        <div>
            <Navigation/>
                <h1>Bonjour {name}</h1>
            <Footer/>
        </div>
    );
};

export default Profile;