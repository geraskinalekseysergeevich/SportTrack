import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import RouterMenu from './components/RouterMenu';
import StartPage from './pages/StartPage';
import LoginPage from './pages/LoginPage';
import Loader from './components/Loader';
import HomePage from './pages/HomePage';
import TrainingsPage from './pages/TrainingsPage'
import MealsPage from './pages/MealsPage';
import ProfilePage from './pages/ProfilePage';
import StatisticsPage from './pages/StatisticsPage';


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
                        <Route path="/" element={<StartPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/trainings" element={<TrainingsPage />} />
                        <Route path="/meals" element={<MealsPage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </Router>
            )}
        </div>
    );
}

export default App;
