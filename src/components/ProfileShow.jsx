import React from 'react';
import styles from '../UI/ProfileShow.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileShow = ({userInfo}) => {

    const navigate = useNavigate();

    return (
        <div>
            <div className={styles["person-data"]}>
                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-rr-ruler-triangle ${styles["card-icon"]}`}></i>
                    <div className={styles["card-name"]}>Рост</div>
                    <div className={styles["card-value"]}>
                        {userInfo.height === 0
                        ? 'Заполните данные'
                        : userInfo.height}
                    </div>
                </div>

                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-sr-scale ${styles["card-icon"]}`}></i>
                    <div className={styles["card-name"]}>Вес</div>
                    <div className={styles["card-value"]}>
                        {userInfo.weight === 0
                        ? 'Заполните данные'
                        : userInfo.weight}
                    </div>
                </div>

                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-sr-user ${styles["card-icon"]}`}></i>
                    <div className={styles["card-name"]}>Возраст</div>
                    <div className={styles["card-value"]}>
                        {userInfo.age === 0
                        ? 'Заполните данные'
                        : userInfo.age}
                    </div>
                </div>
            </div>
            <div className={styles.person__information}>
                <p className={styles.person__information__title}>Информация</p>
                <p className={styles.person__information__text}>
                    {userInfo.info === ''
                    ? 'Заполните данные'
                    : userInfo.info}
                </p>
            </div>
            <div className={styles["person-exit"]}>
                <button onClick={() => navigate('/', { state: {} })}>Выйти</button>
            </div>
        </div>
    );
};

export default ProfileShow;