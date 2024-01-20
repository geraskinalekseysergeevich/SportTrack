import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../UI/Start.module.css'

const Start = () => {
    return (
        <div className={classes.start__container}>
            <div className={classes.body__container}>
                <div className={classes.heart_image}>
                    <img src={require('../sources/startpage/ion_fitness.svg')['default']} alt="" />
                </div>
                <div className={classes.hello_textblock}>
                    <h1>SportTrack</h1>
                    <p>Добро пожаловать в SportTrack - незаменимый помощник для отслеживания питания и тренировок </p>
                </div>
                <Link className={classes.button} to={'/login'}>
                    <div className={classes.register_button}>
                        <p>Начать</p>
                    </div>
                </Link>
                <div className={classes.footer_text}>
                    <div className={classes.flex__container}>
                        <p className={classes.noaccount_link}>Нет аккаунта?</p>
                        <Link className={classes.register_link} to={'/register'}>Регистрация</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Start;