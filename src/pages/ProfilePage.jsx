import React from 'react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
    const location = useLocation();
    const { userId } = location.state;
    console.log(userId);
    return (
        <div>
            
        </div>
    );
};

export default ProfilePage;