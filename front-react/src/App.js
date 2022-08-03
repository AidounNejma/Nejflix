import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/connexion" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;