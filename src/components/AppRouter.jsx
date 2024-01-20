import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import RouterMenu from './RouterMenu';
import { privateRoutes, publicRoutes } from '../router';
import Register from '../pages/RegisterPage';
import StartPage from '../pages/StartPage';
import Login from '../pages/LoginPage';
import Loader from './Loader';

const AppRouter = () => {

    const isAuth = true

    return (
        isAuth
            ?
            <Router>
                <RouterMenu />
                <Routes>
                    {privateRoutes.map(route =>
                        <Route path={route.path} element={route.element} />
                    )}
                </Routes>
            </Router>
            :
            <Router>
                <RouterMenu />
                <Routes>
                    {publicRoutes.map(route =>
                        <Route path={route.path} element={route.element} />
                    )}
                </Routes>
            </Router>
    );
};

export default AppRouter;