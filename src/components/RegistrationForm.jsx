import React, { useState } from 'react';
import styles from '../UI/RegistrationForm.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegistrationForm = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const handleChange = (e) => {
        // e - событие содержит имя поля и его изменения 
        const { name, value } = e.target;
        setUserData({
            ...userData, // копирование предыдущего объекта
            [name]: value, // изменение нужных полей
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // проверка на совпадение пароля и подтвержденного пароля
        if (userData.password !== userData.confirmPassword) {
            toast.error('Введённые пароли не совпадают!');
            console.error('Пароли не совпадают');
            return;
        }

        // Проверка минимальной длины пароля
        if (userData.password.length < 8) {
            toast.error('Пароль должен содержать минимум 8 символов.');
            return;
        }
        try {
            var username = userData.username;
            var email = userData.email;
            var password = userData.password;
            const response = await fetch('http://localhost:3001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                toast.success('Регистрация прошла успешно!', {
                    onClose: () => navigate('/login'),
                    autoClose: 5000,
                });
            } else {
                console.error('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }


        // здесь должна быть отправка данных на сервер

        setError('')
        console.log('Отправка данных на БД')
    };

    return (
        <div className={styles.form__section}>
            <div className={styles.form__container}>
                <div className={styles.image_container}>
                    <img src={require('../sources/startpage/ion_fitness.svg')['default']} alt="" />
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formField}>
                        <label htmlFor="fullName"></label>
                        <input
                            placeholder='Введите полное имя'
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formField}>
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
                    <div className={styles.formField}>
                        <label htmlFor="password"></label>
                        <input
                            placeholder='Введите пароль'
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="confirmPassword"></label>
                        <input
                            placeholder='Подтверждение пароля'
                            type="password"
                            name="confirmPassword"
                            autoComplete="new-password"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        <p className={styles.button_text}>Создать аккаунт</p>
                    </button>
                    <div className={styles.footer_text}>
                        <div className={styles.flex__container}>
                            <p className={styles.noaccount_link}>Уже есть аккаунт?</p>
                            <Link className={styles.register_link} to={'/login'}>Войти</Link>
                        </div>
                    </div>
                    {error !== '' && <p className={styles.error_message}>{error}</p>}
                </form>
            </div>
            <ToastContainer />
        </div >
    );
};

export default RegistrationForm;
