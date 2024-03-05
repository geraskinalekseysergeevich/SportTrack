import React from "react";
import styles from '../UI/HumanData.module.css';

const HumanData = () => {
    return (
        <div className={styles.human_data}>
            <div className={styles.human_data_name}>
                <input type="text" placeholder="Имя" />
            </div>
            <div className={styles.human_data_surname}>
                <input type="text" placeholder="Фамилия" />
            </div>
        </div>
    )
};

export default HumanData;
