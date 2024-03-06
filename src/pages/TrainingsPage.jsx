import React from 'react';
import ExerciseForm from '../components/ExerciseForm';
import { useLocation } from 'react-router-dom';


const TrainingsPage = () => {
    // Внутри вашего компонента
    const location = useLocation();
    const { userId } = location.state;
    // console.log(userId);
    return (
        <div>
            <ExerciseForm userId={userId}/>
        </div>
    );
};

export default TrainingsPage;