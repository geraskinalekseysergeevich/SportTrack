import React from 'react';
import classes from '../UI/ActivityExerciseButton.module.css'

const ActivityExerciseButton = ({setActiveTabFunc, activeTab, innerText}) => {
    return (
        <div className={classes.button__container} onClick={() => setActiveTabFunc(`${activeTab}`)}>
            <div className={classes.button_flexcontainer} >
                <div>{innerText}</div>
                <div>+</div>
            </div>
        </div>
    );
};

export default ActivityExerciseButton;