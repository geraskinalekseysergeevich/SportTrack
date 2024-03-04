import React from 'react';
import Calories from '../components/Calories';
import { useLocation } from 'react-router-dom';

const MealsPage = () => {
    const location = useLocation();
    const { userId } = location.state;
    console.log(userId);
    return (
        <div>
            <Calories userId={userId}/>
        </div>
    );
};

export default MealsPage;