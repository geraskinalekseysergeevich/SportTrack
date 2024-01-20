import React, { useState } from 'react';
import styles from '../UI/RegistrationForm.module.css';

const RegistrationForm = () => {

    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')


    const handleChange = (e) => {
        // e - событие содержит имя поля и его изменения 
        const { name, value } = e.target;
        setUserData({
            ...userData, // копирование предыдущего объекта
            [name]: value, // изменение нужных полей
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // проверка на совпадение пароля и подтвержденного пароля
        if (userData.password !== userData.confirmPassword) {
            setError('Введённые пароли не совпадают!')
            console.error('Пароли не совпадают')
            return
        }

        // здесь должна быть отправка данных на сервер

        setError('')
        console.log('Отправка данных на БД')
    };

    return (
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
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">
                    <p>Создать аккаунт</p>
                </button>
                { error !== '' && <p className={styles.error_message}>{error}</p> }
            </form>
        </div>
    );
};

export default RegistrationForm;
