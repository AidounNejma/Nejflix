import React from 'react';
import axios from "../interceptors/axios";
import {useEffect, useState} from "react";

import Footer from '../components/Footer';
import Navigation from '../components/Navigation';
import CardsDashboard from '../components/CardsDashboard';

import '../assets/styles/pages/_dashboard.scss';

const Dashboard = () => {
    const [name, setName] = useState('');

    useEffect(()=>{
        (async () => {
            const {data} = await axios.get('users');

            setName(data['hydra:member'][0].name);
        })();
    }, []);

    return (
        <div>
            <Navigation/>
                <h1 className='dashboardTitle'>Bonjour {name}.</h1>
                <p className='dashboardSubtitle'>Que devons-nous faire aujourd'hui ?</p>
                <CardsDashboard/>
            <Footer/>
        </div>
    );
};

export default Dashboard;