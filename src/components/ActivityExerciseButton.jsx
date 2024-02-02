import React from 'react';
import classes from '../UI/ActivityExerciseButton.module.css'

const ActivityExerciseButton = ({setActiveTabFunc, activeTab, innerText}) => {
    return (
        <div className={classes.button__container} onClick={() => setActiveTabFunc(activeTab)}>
            <div className={classes.button_flexcontainer} >
                <h1>{innerText}</h1>
                <div>+</div>
            </div>
        </div>
    );
};

export default ActivityExerciseButton;