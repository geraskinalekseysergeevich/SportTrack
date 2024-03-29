import React from 'react';
import HomeData from '../components/HomeData';
import { useLocation } from 'react-router-dom';
import TabBar from '../components/TabBar';

const HomePage = () => {
    const location = useLocation();
    const { userId } = location.state;
    return (
        <>
            <HomeData userId={userId}/>
            <TabBar userId={userId}/>
        </>
    );
};

export default HomePage;