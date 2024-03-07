import React, { useEffect, useState } from "react";
import styles from "../UI/HomeData.module.css"
import { useNavigate } from "react-router-dom";
import HomeActivity from "./HomeActivity";

const HomeData = ({userId}) => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState([]);
    const [workout, setWorkout] = useState([]);
    const [diet, setDiet] = useState([]);
    const [combined, setCombined] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`);
                const data = await response.json();
                setInputData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        setWorkout(inputData.exercises)
        setDiet(inputData.items)
    }, [userId]);


    const dayToday = () => {
        var currentdate = new Date();
        if(currentdate.getMonth()+ 1 < 10){
        var datetime =
            currentdate.getFullYear() +
            '-0' +
            (currentdate.getMonth() + 1) +
            '-' +
            currentdate.getDate();
        } else datetime =
        currentdate.getFullYear() +
        '-' +
        (currentdate.getMonth() + 1) +
        '-' +
        currentdate.getDate();
        return datetime;
    }

    useEffect(() => {
        if(workout != undefined && diet != undefined){

        const prepareData = () => {
            var newArray1 = []
            var array1 = [];
            var array2 = [];
            var newArray2 = []

            workout.forEach(el => {
                newArray1 = [];
                el.forEach(element => {
                    var item = element.split(":");
                    var key = item[0].trim();
                    if(item[0]==='time'||item[0]==='timecreated')
                        var value = item[1]+":"+item[2];
                    else value = item[1].trim();
                    newArray1[key] = value;
                })
                if(newArray1['date'] === "'" + dayToday() + "'")
                array1.push(newArray1);
            });
            diet.forEach(el => {
                newArray2 = [];
                el.forEach(element => {
                    var item = element.split(":");
                    var key = item[0].trim();
                    if(item[0]==='timecreated')
                        var value = item[1]+":"+item[2];
                    else value = item[1].trim();
                    newArray2[key] = value;
                })
                if(newArray2['date'] === "'" + dayToday() + "'")
                array2.push(newArray2);
            });
            // объединяем два массива, добавляем поляm type для определения типа записи
            setCombined([...array1.map(item=>({...item, type: 'workout'})), ...array2.map(item=>({...item, type: 'diet'}))]);
            // сортируем объединенный массив по времени создания
            console.log(combined);
        }
        prepareData();
    }
    }, [combined, diet, setCombined, workout]);

    const returnInfo = (info) => {
        if(inputData.information != undefined) { return inputData.information[info] }
        else if (info === 'weight'){ return "Внимание! Вы не ввели вашу информацию" }
        else { return ""}
    }
    // Функция для сортировки данных по полю timecreated
    function sortByTimeCreated(a, b) {
        if (a.timecreated > b.timecreated) {
        return -1;
        }
        if (a.timecreated < b.timecreated) {
        return 1;
        }
        return 0;
    }

    return (
        <>
        <div className={styles.home__section}>
            <div className={styles.home__container}>
                <div className={styles.home__header}>
                    <h1 className={styles.home__title}>Домашняя страница</h1>

                    <div className={styles.home__header__welcome}>
                        <div className={styles.home__header__text}>
                            С возвращением в SportTrack,
                            <p className={styles.name__user}>{inputData.username}!</p>
                        </div>
                        <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })}/>
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
                        <div className={styles["card-value"]}>{returnInfo('age')}</div>
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

