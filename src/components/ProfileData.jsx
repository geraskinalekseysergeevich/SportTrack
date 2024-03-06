import React from "react";
import styles from "../UI/ProfileData.module.css";
import { useNavigate } from 'react-router-dom';
import TabBar from "./TabBar";

const ProfileData = ({userId}) => {

    const navigate = useNavigate();

    return (
        <>
        <div className={styles.profile__section}>
            <div className={styles.profile__container}>
                <div className={styles.profile__header}>
                    <i className={`fi fi-br-arrow-left ${styles.profile_icon}`} onClick={() => navigate('/home', { state: { userId } })}></i>
                    <img src={require("../sources/avatar.png")} alt="" className={styles["profile-img"]} />



                    <i className={`fi fi-rr-edit ${styles.profile_icon}`}></i>
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
                        <div className={styles["card-name"]}>Возвраст</div>
                        <div className={styles["card-value"]}>20 лет</div>
                    </div>
                </div>

                <div className={styles.person__information}>
                    <p className={styles.person__information__title}>Информация</p>
                    <p className={styles.person__information__text}>
                        Привет! Я - Сема, спортсмен по призванию. Мои дни наполнены тренировками, а моя страсть - плавание. Стараюсь поддерживать баланс между физической активностью, здоровым питанием и отдыхом. Каждая тренировка для меня - шанс стать сильнее и лучше.
                        <br /><br />Я уверен, что через труд и постоянное совершенствование можно достигнуть любой цели. Вне тренировок я обычный человек, который верит в силу воли и стремится вдохновлять других к здоровому образу жизни
                    </p>
                </div>
                {/* у этой кнопки не задан стиль но я его назвал для тебя */}
                <div>
                    <button className={styles["person-exit"]} onClick={() => navigate('/', { state: {} })}>Выйти</button>
                </div>
            </div>
        </div>
        <TabBar userId={userId}/>
        </>
    );
};

export default ProfileData;
