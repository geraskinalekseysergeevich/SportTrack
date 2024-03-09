import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../UI/Start.module.css'

const StartPage = () => {
    return (
        <div className={classes.start__section}>
            <div className={classes.start__container}>
                <div className={classes.heart_image}>
                    <img data-cy="image" src={require('../sources/startpage/ion_fitness.svg')['default']} alt="" />
                </div>
                <div data-cy="text" className={classes.hello_textblock}>
                    <h1>SportTrack</h1>
                    <p>Добро пожаловать в SportTrack - незаменимый помощник для отслеживания питания и тренировок </p>
                </div>
                <Link className={classes.start_button} to={'/login'}>
                    <div data-cy="start" className={classes.register_button}>
                        <p>Начать</p>
                    </div>
                </Link>
            </div>
        </div>
    )
};

export default StartPage;