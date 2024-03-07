import React from 'react';
import styles from "../UI/HomeData.module.css"

const HomeActivity = ({ combined }) => {
    return combined.map(item => {
      if (item.type === "diet") {
        return (
          <div className={styles["person-activities-card"]}>
            Прием пищи: {item.name.slice(1,-1)} <br></br> Калории: {item.calories}, Б: {item.protein}, Ж: {item.fat}, У: {item.carbs}</div>
        );
      } else if (item.type === "workout") {
        return (
          <div className={styles["person-activities-card"]}>
            Тренировка: {item.name.slice(1,-1)} <br></br> Время тренировки: {item.time}, Место: {item.location.slice(1,-1)}</div>
        );
      }
    });
  };


export default HomeActivity;