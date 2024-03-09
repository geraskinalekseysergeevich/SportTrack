import React from 'react';
import ProfileData from '../components/ProfileData';
import { useLocation } from 'react-router-dom';


const ProfilePage = () => {
    const location = useLocation();
    const { userId } = location.state;
    return (
        <>
            <ProfileData userId={userId}/>
        </>
    );
};

export default ProfilePage;