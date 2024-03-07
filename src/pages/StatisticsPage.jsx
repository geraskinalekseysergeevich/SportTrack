import React from 'react';
import Stats from '../components/Stats'
import { useLocation } from 'react-router-dom';
import "../App.css"

const StatisticsPage = () => {
    const location = useLocation();
    const { userId } = location.state;
    // console.log(userId);
    return (
        <div>
            <Stats userId={userId} />
        </div>
    );
};

export default StatisticsPage;