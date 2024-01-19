import React from 'react';
import { Link } from 'react-router-dom';

const RouterMenu = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Register</Link>
                </li>
                <li>
                    <Link to={'/home'}>Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default RouterMenu;