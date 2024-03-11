import React, { useEffect, useState } from "react";
import styles from "../UI/HomeData.module.css"
import { useNavigate } from "react-router-dom";
import HomeActivity from "./HomeActivity";
import { BrowserRouter as Router, Link } from "react-router-dom";

const HomeData = ({ userId }) => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({ items: [], exercises: [] });
    const [workout, setWorkout] = useState([]);
    const [diet, setDiet] = useState([]);
    const [combined, setCombined] = useState([]);

    // получаем данные пользователя с сервера при загрузке страницы
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`)
                const data = await response.json()
                setInputData(data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [userId])

    // Функция для сортировки данных по полю timecreated
    function sortByTimeCreated(combinedData) {
        combinedData.sort((a, b) => {
            const timeA = a.timecreated.split(':');
            const timeB = b.timecreated.split(':');

            // Сравниваем часы
            if (parseInt(timeA[0]) !== parseInt(timeB[0])) {
                return parseInt(timeB[0]) - parseInt(timeA[0]);
            }

            // Сравниваем минуты
            if (parseInt(timeA[1]) !== parseInt(timeB[1])) {
                return parseInt(timeB[1]) - parseInt(timeA[1]);
            }

            // Сравниваем секунды
            return parseInt(timeB[2]) - parseInt(timeA[2]);
        });
    }

    // подготавливаем данные для отображения
    const prepareData = () => {

        const array1 = workout.map(el => {
            const obj = {};
            el.forEach(element => {
                // делим ключи и значения и заполняем заново в нужном формате
                const [key, ...value] = element.split(':')
                obj[key.trim()] = value.join(':').replace(/'/g, '').trim()
            });
            return obj;
        });

        const array2 = diet.map(entry => {
            const obj = {};
            entry.forEach(element => {
                // делим ключи и значения и заполняем заново в нужном формате
                const [key, ...value] = element.split(':');
                const trimmedKey = key.trim();
                obj[trimmedKey] = value.join(':').replace(/'/g, '').trim();
            });
            return obj;
        });

        // объединяем два массива в combined, добавляем поле type для определения типа записи
        const combinedData = [...array1.map(item => ({ ...item, type: 'workout' })), ...array2.map(item => ({ ...item, type: 'diet' }))]
        // сортируем объединенный массив по времени создания
        sortByTimeCreated(combinedData)
        setCombined(combinedData)
    }

    // делим полученные с сервера данные на workout и diet и подготавливаем
    useEffect(() => {
        if (inputData.exercises !== undefined && inputData.items !== undefined) {
            setWorkout(inputData.exercises)
            setDiet(inputData.items)
        }
    }, [inputData.items, inputData.exercises])

    useEffect(() => {
        prepareData()
    }, [workout, diet])

    const returnInfo = (info) => {
        if (inputData.information !== undefined) {
            return inputData.information[info]
        } else { return '' }
    }

    return (
        <>
            <div className={styles.home__section}>
                <div className={styles.home__container}>
                    <div className={styles.home__header}>
                        <h1 className={styles.home__title}>Домашняя страница</h1>
                        <Link to="/new">New Page Link</Link>
                        <a href="/new">New Page a</a>
                        <div className={styles.home__header__welcome}>
                            <div className={styles.home__header__text}>
                                С возвращением в SportTrack,
                                <p className={styles.name__user}>{inputData.username}!</p>
                            </div>
                            <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })} />
                        </div>
                    </div>

                    <div className={styles["person-data"]}>
                        <div className={styles["person-data-card"]}>
                            <i className={`fi fi-rr-ruler-triangle ${styles["card-icon"]}`}></i>
                            <div className={styles["card-name"]}>Рост</div>
                            <div className={styles["card-value"]}>{returnInfo('height')} см</div>
                        </div>

                        <div className={styles["person-data-card"]}>
                            <i className={`fi fi-sr-scale ${styles["card-icon"]}`}></i>
                            <div className={styles["card-name"]}>Вес</div>
                            <div className={styles["card-value"]}>{returnInfo('weight')} кг</div>
                        </div>

                        <div className={styles["person-data-card"]}>
                            <i className={`fi fi-sr-user ${styles["card-icon"]}`}></i>
                            <div className={styles["card-name"]}>Возраст</div>
                            <div className={styles["card-value"]}>{returnInfo('age')} лет</div>
                        </div>
                    </div>
                    <div className={styles["person-activities"]}>
                        <h2 className={styles["person-activities-header"]}>Ваша активность:</h2>
                        <HomeActivity combined={combined} />
                    </div>
                </div>

            </div>
        </>
    );
};
export default HomeData;

