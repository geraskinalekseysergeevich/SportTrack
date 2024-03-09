import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TabBar from "./TabBar";
import ProfileShow from "./ProfileShow";
import styles from '../UI/ProfileData.module.css'
import ProfileEdit from "./ProfileEdit";

const ProfileData = ({userId}) => {

    const navigate = useNavigate();
    const [editPage, setEditPage] = useState(0)
    const [userInfo, setUserInfo] = useState({})
    const [userName, setUserName] = useState('')

    // запрос на сервер для получения username и information
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`)
                const data = await response.json()

                setUserInfo(data.information)
                setUserName(data.username)

                if (!response.ok) {
                    throw new Error('Failed to fetch user information')
                }

            } catch (error) {
                console.error('Error fetching user information:', error)
            }
        }

        fetchUserData()
    }, [userId])

    return (
        <div className={styles.profile__section}>
            <div className={styles.profile__container}>
                <div className={styles.profile__header}>
                    <i className={`fi fi-br-arrow-left ${styles.profile_icon}`} onClick={() => navigate('/home', { state: { userId } })}></i>
                    <img src={require("../sources/profile/big-avatar.png")} alt="" className={styles["profile-img"]} />
                    <i className={`fi fi-rr-edit ${styles.profile_icon}`} onClick={() => setEditPage(1)}></i>
                </div>
                <div className={styles.userName__container}>{userName.toUpperCase()}</div>
                {editPage === 0
                ? <ProfileShow userInfo={userInfo}/> 
                : <ProfileEdit userId={userId} userInfo={userInfo}/>}
            </div>
            <TabBar userId={userId}/>
        </div>
    );
};

export default ProfileData;
