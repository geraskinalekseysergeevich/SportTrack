import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../UI/RouterMenu.module.css';
import { useLocation } from 'react-router-dom';

const RouterMenu = () => {
    const navigate = useNavigate
    const location = useLocation();
    const userId = location.state?.userId;
    function nav(pathname){
        navigate(pathname, { state: { userId } });
    }
    const home = {
        pathname: '/home',
        state: {
            userId: userId // Передается значение userId
        }
    };
    const trainings = {
        pathname: '/trainings',
        state: {
            userId: userId // Передается значение userId
        }
    };
    const meals = {
        pathname: '/meals',
        state: {
            userId: userId // Передается значение userId
        }
    };
    const statistics = {
        pathname: '/statistics',
        state: {
            userId: userId // Передается значение userId
        }
    };
    const profile = {
        pathname: '/profile',
        state: {
            userId: userId // Передается значение userId
        }
    };

    console.log(userId);
    return (
        <nav>
            <ul className={classes.router_menu_container}>
                <li>
                    <Link to={'/'}>Start</Link>
                </li>
                <li>
                    <Link to={'/register'}>Register</Link>
                </li>
                <li>
                    <Link to={'/login'}>Login</Link>
                </li>
                <li>
                    <Link to={home}>Home</Link>
                </li>
                <li>
                    <Link to={trainings}>Trainings</Link>
                </li>
                <li>
                    <Link to={meals}>Meals</Link>
                </li>
                <li>
                    <Link to={statistics}>Stats</Link>
                </li>
                <li>
                    <Link to={profile}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default RouterMenu;
