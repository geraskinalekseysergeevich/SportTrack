import React, { useState } from 'react';
import styles from '../UI/ProfileEdit.module.css';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({userId, userInfo}) => {

    const [newUserInfo, setNewUserInfo] = useState({...userInfo})
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserInfo({ ...newUserInfo, [name]: value });
    };

    const updateUserInfo = async () => {
        console.log('test')
        try {
            const response = await fetch(`http://localhost:3001/api/users/updateData`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, newUserInfo })
            })

            if(!response.ok) {
                throw new Error('Ошибка при обновлении данных')
            } else {
                console.log('Данные успешно обновлены')
            }
            

        }
        catch(error) {
            console.log('Ошибка при обновлении данных:', error)
        }

    }

    return (
        <div>
            <div className={styles["person-data"]}>
                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-rr-ruler-triangle ${styles["card-icon"]}`}></i>
                    <label className={styles["card-name"]}>Рост</label>
                    <input 
                        type="number"
                        name='height'
                        min={'1'}
                        value={newUserInfo.height} 
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-sr-scale ${styles["card-icon"]}`}></i>
                    <label className={styles["card-name"]}>Вес</label>
                    <input 
                        type="number" 
                        name='weight'
                        min={'1'}
                        value={newUserInfo.weight}
                        onChange={handleInputChange}
                    />
                </div>

                <div className={styles["person-data-card"]}>
                    <i className={`fi fi-sr-user ${styles["card-icon"]}`}></i>
                    <label className={styles["card-name"]}>Возраст</label>
                    <input 
                        type="number"
                        name='age'
                        min={'1'}
                        value={newUserInfo.age}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles.person__information}>
                <p className={styles.person__information__title}>Информация</p>
                <textarea 
                    type="text"
                    name='info'
                    value={newUserInfo.info}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles["person-exit"]}>
                <button onClick={() => {updateUserInfo(); navigate('/home', { state: { userId } })} }>Сохранить</button>
            </div>
        </div>
    );
};

export default ProfileEdit;