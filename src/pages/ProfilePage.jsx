import React from 'react';
import TabBar from '../components/TabBar';
import ProfileData from '../components/ProfileData';


const ProfilePage = () => {
    const location = useLocation();
    const { userId } = location.state;
    console.log(userId);
    return (
        <>
            <ProfileData />
            <TabBar />
        </>
    );
};

export default ProfilePage;