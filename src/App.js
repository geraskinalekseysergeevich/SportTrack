import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import RouterMenu from './components/RouterMenu';
import Start from './pages/Start';

function App() {
    return (
        <Router>
            <RouterMenu />
            <Routes>
                <Route path='/' element={<Start/>} />
                <Route path='/home' element={<HomePage/>} />
                <Route path='/register' element={<Register/>} />
            </Routes>
        </Router>
    );
}

export default App;