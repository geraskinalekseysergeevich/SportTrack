import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './pages/Register';
import RouterMenu from './components/RouterMenu';
import Start from './pages/Start';
import Login from './pages/Login';
import Loader from './components/Loader';

function App() {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <Router>
                    <RouterMenu />
                    <Routes>
                        <Route path="/" element={<Start />} />
                        {/* <Route path="/home" element={<HomePage />} /> */}
                        <Route path="/register" element={<Register />} />
                        {/* <Route path="/test" element={<Test />} /> */}
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Router>
            )}
        </div>
    );
}

export default App;
