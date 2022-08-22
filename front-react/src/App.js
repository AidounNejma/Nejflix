import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthApi from './services/AuthApi';
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import AnimatedRoute from './components/AnimatedRoute';
import Project from './pages/edition/Project';
import Experiences from './pages/Experiences';
import Experience from './pages/edition/Experience';
import Educations from './pages/Educations';
import Education from './pages/edition/Education';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.setup());

    return (

        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
                <main className="container mt-5">
                    <Routes>
                        <Route element={<AnimatedRoute />}>
                            <Route path="/" element={ <Home/> }/> 
                            <Route path="a-propos" element={<About />} />
                            <Route path="connexion" element={<LogIn />} />
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
                        </Route>
                    </Routes>
                </main>
        </AuthContext.Provider>
    );
};

export default App;