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
            </ul>
        </nav>
    );
};

export default RouterMenu;
