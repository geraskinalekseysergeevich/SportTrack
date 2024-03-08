import React from 'react';
import styles from "../UI/HomeData.module.css"

const HomeActivity = ({ combined }) => {
    return combined.map((item, key) => {
        if (item.type === "diet") {
            return (
                <div key={key} className={styles["person-activities-card"]}>
                    <h1>Прием пищи: {item.name.slice(1,-1)}</h1>
                    <p>Калории: {item.calories}, Б: {item.protein}, Ж: {item.fat}, У: {item.carbs}</p>
                </div>
            );
        } else if (item.type === "workout") {
            return (
                <div key={key} className={styles["person-activities-card"]}>
                    <h1>Тренировка: {item.name.slice(1,-1)}</h1>
                    <p>Время тренировки: {item.time}, Место: {item.location.slice(1,-1)}</p>
                </div>
            );
        }
    });
};

export default HomeActivity;