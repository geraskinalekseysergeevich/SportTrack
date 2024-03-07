import React, { useEffect, useState } from "react";
import styles from "../UI/HomeData.module.css"
import { useNavigate } from "react-router-dom";

const HomeData = ({userId}) => {
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({items: [], exercises: []});

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
    }, [userId]);


    return (
        <>
        <div className={styles.home__section}>
            <div className={styles.home__container}>
                <div className={styles.home__header}>
                    <h1 className={styles.home__title}>Домашняя страница</h1>

                    <div className={styles.home__header__welcome}>
                        <div className={styles.home__header__text}>
                            С возвращением в SportTrack!
                            <p className={styles.name__user}>Макаров Семён</p>
                        </div>
                        <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })}/>
                    </div>
                </div>

                <div className={styles["person-data"]}>
                    <div className={styles["person-data-card"]}>
                        <i className={`fi fi-rr-ruler-triangle ${styles["card-icon"]}`}></i>
                        <div className={styles["card-name"]}>Рост</div>
                        <div className={styles["card-value"]}>172 см</div>
                    </div>

                    <div className={styles["person-data-card"]}>
                        <i className={`fi fi-sr-scale ${styles["card-icon"]}`}></i>
                        <div className={styles["card-name"]}>Вес</div>
                        <div className={styles["card-value"]}>70 кг</div>
                    </div>

                    <div className={styles["person-data-card"]}>
                        <i className={`fi fi-sr-user ${styles["card-icon"]}`}></i>
                        <div className={styles["card-name"]}>Возраст</div>
                        <div className={styles["card-value"]}>20 лет</div>
                    </div>
                </div>

                <div className={styles["person-activities"]}>
                    <h2 className={styles["person-activities-header"]}>Ваша активность:</h2>
                    <div className={styles["person-activities-card"]}>

                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default HomeData;

