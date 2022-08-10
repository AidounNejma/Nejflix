import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthApi from './services/AuthApi';
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import AuthContext from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';


const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.setup());

    return (

        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
                <main className="container mt-5">
                    <Routes>
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
                    </Routes>
                </main>
        </AuthContext.Provider>
    );
};

export default App;