import React from 'react';
import styles from "../UI/HomeActivity.module.css"

const HomeActivity = ({ combined }) => {
    return combined.map((item, key) => {
        if (item.type === "diet") {
            return (
                <div key={key} className={`${styles["person-activities-card"]} ${styles['diet']}`}>
                    <div>
                        <h1>Прием пищи: {item.name}</h1>
                        <p>Калории: {item.calories}, Б: {item.protein}, Ж: {item.fat}, У: {item.carbs}</p>
                    </div>
                    <p className={styles.date_info}>{item.date}</p>
                </div>
            );
        } else if (item.type === "workout") {
            return (
                <div key={key} className={`${styles["person-activities-card"]} ${styles['training']}`}>
                    <div>
                        <h1>Тренировка: {item.name}</h1>
                        <p>Время тренировки: {item.time}, Место: {item.location || 'не указано'}</p>
                    </div>
                    <p className={styles.date_info}>{item.date}</p>
                </div>
            );
        }
        return (
            <div>
                Здесь будут отображаться ваши последние приемы пищи и тренировки
            </div>
        )
    });
};

export default HomeActivity;