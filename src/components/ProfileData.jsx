import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import TabBar from "./TabBar";
import ProfileShow from "./ProfileShow";
import styles from '../UI/ProfileData.module.css'
import ProfileEdit from "./ProfileEdit";

const ProfileData = ({userId}) => {

    const [editPage, setEditPage] = useState(0)
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`)
                const data = await response.json()
                console.log(data.information)

                setUserInfo(data.information)

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
                {editPage === 0
                ? <ProfileShow userInfo={userInfo}/> 
                : <ProfileEdit userId={userId} userInfo={userInfo}/>}
            </div>
            <TabBar userId={userId}/>
        </div>
    );
};

export default ProfileData;
