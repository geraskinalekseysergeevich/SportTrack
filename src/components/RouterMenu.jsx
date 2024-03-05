import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from '../UI/RouterMenu.module.css';
import { useLocation } from 'react-router-dom';

const RouterMenu = () => {
    const navigate = useNavigate
    const location = useLocation();
    const userId = location.state?.userId;
    function nav(pathname) {
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

    // console.log(userId);
    return (
        <nav className={classes.nav}>
            <div className={classes.nav__container}>
                <div className={classes.brand}>
                    Sport Track
                    {/* <img src="../sources/startpage/ion_fitness.svg" alt="" /> */}
                </div>
                <ul className={classes.nav__list}>
                    <li className={classes.nav__item}>
                        <Link to={'/'}>Start</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={'/register'}>Register</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={'/login'}>Login</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={home}>Home</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={trainings}>Trainings</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={meals}>Meals</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={statistics}>Stats</Link>
                    </li>
                    <li className={classes.nav__item}>
                        <Link to={profile}>Profile</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default RouterMenu;
