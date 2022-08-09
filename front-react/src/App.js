import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Layout from './components/Layout';

import RequireAuth from "./components/RequireAuth.js";
import {Routes, Route} from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={ <Layout/> }> 
                
                {/* Routes publiques  */}
                <Route path="/" element={ <Home/> }/> 
                <Route path="a-propos" element={<About />} />
                <Route path="connexion" element={<LogIn />} />
                
                {/* Routes privées */}
                <Route element={ <RequireAuth/> }>
                    <Route path="tableau-de-bord" element={<Profile/>}/>
                </Route>

            </Route>
        </Routes>
    );
};

export default App;