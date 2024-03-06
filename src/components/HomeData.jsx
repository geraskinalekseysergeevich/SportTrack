import React from "react";
import styles from "../UI/HomeData.module.css"
import TabBar from "./TabBar";

const HomeData = ({userId}) => {
    return (
        <>
        <div className={styles.home__section}>
            <div className={styles.home__container}>
                <div className={styles.home__header}>
                    <h1 className={styles.home__title}>Домашняя страница</h1>

                    <div className={styles.home__header__welcome}>
                        <p className={styles.home__header__text}>
                            С возвращением в SportTrack!
                            <div className={styles.name__user}>Макаров Семён</div>
                        </p>
                        <img src={require("../sources/avatar.png")} alt="" />
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
                        <div className={styles["card-name"]}>Возвраст</div>
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

