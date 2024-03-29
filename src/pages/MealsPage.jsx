import React from 'react';
import { useLocation } from 'react-router-dom';
import MealsForm from '../components/MealsForm';

const MealsPage = () => {
    const location = useLocation();
    const { userId } = location.state;
    return (
        <div>
            <MealsForm userId={userId}/>
        </div>
    );
};

export default MealsPage;