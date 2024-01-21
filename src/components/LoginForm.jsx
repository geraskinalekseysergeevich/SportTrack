import React, { startTransition, useState } from 'react';
import classes from '../UI/LoginForm.module.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = () => {
        setUserData({
            email: '',
            password: ''
        })
        
        startTransition(() => {
            navigate('/trainings')
        })
    }

    const handleChange = (e) => {

        // e - событие содержит имя поля и его изменения 
        const { name, value } = e.target;

        setUserData({
            ...userData, // копирование предыдущего объекта
            [name]: value, // изменение нужных полей
        });
    }

    return (
        <div className={classes.form__container}>
            <div className={classes.image_container}>
                <img src={require('../sources/startpage/ion_fitness.svg')['default']} alt="" />
            </div>
            <form onSubmit={handleLogin} className={classes.login_form}>
                <div className={classes.formField}>
                    <label htmlFor="email"></label>
                    <input
                        placeholder='Введите адрес электронной почты'
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={classes.formField}>
                    <label htmlFor="password"></label>
                    <input
                        placeholder='Введите пароль'
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    <p className={classes.button_text}>Войти</p>
                </button>
                <div className={classes.footer_text}>
                    <div className={classes.flex__container}>
                        <p className={classes.noaccount_link}>Нет аккаунта?</p>
                        <Link className={classes.register_link} to={'/register'}>Регистрация</Link>
                    </div>
                </div>
                { error !== '' && <p className={classes.error_message}>{error}</p> }
            </form>
        </div>
    );
};

export default LoginForm;
