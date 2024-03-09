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
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            toast.error('Введённые пароли не совпадают!');
            console.error('Пароли не совпадают');
            return;
        }

        // Валидация пароля
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
        if (!passwordRegex.test(userData.password)) {
            toast.error('Пароль должен содержать минимум 6 символов, одну заглавную букву, одну строчную букву и одну цифру.');
            return;
        }

        // Валидация имени
        if (userData.username.length < 3 || userData.username.length > 20) {
            toast.error('Имя должно содержать от 3 до 20 символов.');
            return;
        }

        // Валидация электронной почты
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            toast.error('Некорректный адрес электронной почты.');
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

        setError('');
        console.log('Отправка данных на БД');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <div className={styles.passwordField}>
                            <input
                                placeholder='Введите пароль'
                                type={showPassword ? "text" : "password"}
                                name="password"
                                autoComplete="new-password"
                                value={userData.password}
                                onChange={handleChange}
                                required
                            />
                            <i
                                className={`fi ${showPassword ? 'fi-rs-eye' : 'fi-rs-crossed-eye'} ${styles.passwordIcon}`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="confirmPassword"></label>
                        <input
                            placeholder='Подтверждение пароля'
                            type={showPassword ? "text" : "password"}
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
        </div>
    );
};

export default RegistrationForm;
