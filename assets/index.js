import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthApi from './js/services/AuthApi';

import About from "./js/pages/About";
import Home from "./js/pages/Home";
import LogIn from "./js/pages/LogIn";
import AuthContext from './js/contexts/AuthContext';
import PrivateRoute from './js/components/PrivateRoute';
import Dashboard from './js/pages/Dashboard';
import Projects from './js/pages/Projects';
import AnimatedRoute from './js/components/AnimatedRoute';
import Project from './js/pages/edition/Project';
import Experiences from './js/pages/Experiences';
import Experience from './js/pages/edition/Experience';
import Educations from './js/pages/Educations';
import Education from './js/pages/edition/Education';
import Information from './js/pages/edition/Information';
import ContactMe from './js/pages/ContactMe';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.setup());

    return (

        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
                <main className="container mt-5">
                    <ToastContainer position={toast.POSITION.TOP_CENTER} />
                    <Routes>
                        <Route element={<AnimatedRoute />}>
                            <Route path="/" element={ <Home/> }/> 
                            <Route path="a-propos" element={<About />} />
                            <Route path="connexion" element={<LogIn />} />
                            <Route path="contact" element={<ContactMe />} />
                            <Route 
                                path="tableau-de-bord/*" 
                                element={
                                    <PrivateRoute>
                                        <Dashboard/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="tous-les-projets/*" 
                                element={
                                    <PrivateRoute>
                                        <Projects/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="edition-du-projet/:projectId" 
                                element={
                                    <PrivateRoute>
                                        <Project/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="creation-du-projet" 
                                element={
                                    <PrivateRoute>
                                        <Project/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="toutes-les-experiences/*" 
                                element={
                                    <PrivateRoute>
                                        <Experiences/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="edition-experience/:experienceId" 
                                element={
                                    <PrivateRoute>
                                        <Experience/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="creation-experience" 
                                element={
                                    <PrivateRoute>
                                        <Experience/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="toutes-les-formations/*" 
                                element={
                                    <PrivateRoute>
                                        <Educations/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="edition-formation/:educationId" 
                                element={
                                    <PrivateRoute>
                                        <Education/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="creation-formation" 
                                element={
                                    <PrivateRoute>
                                        <Education/>
                                    </PrivateRoute>
                                }
                            />
                            <Route 
                                path="edition-informations/:informationsId" 
                                element={
                                    <PrivateRoute>
                                        <Information/>
                                    </PrivateRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </main>
        </AuthContext.Provider>
    );
};

export default App;