import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../UI/RouterMenu.module.css';

const RouterMenu = () => {
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
                    <Link to={'/home'}>Home</Link>
                </li>
                <li>
                    <Link to={'/trainings'}>Trainings</Link>
                </li>
                <li>
                    <Link to={'/meals'}>Meals</Link>
                </li>
                <li>
                    <Link to={'/statistics'}>Stats</Link>
                </li>
                <li>
                    <Link to={'/profile'}>Profile</Link>
                </li>
            </ul>
        </nav>
    );
};

export default RouterMenu;
