import React from 'react';
import classes from '../UI/ExerciseFormButtons.module.css';

const ExerciseFormButtons = ({saveFunc = undefined, removeFunc = undefined, innerText}) => {
    return (
        <div className={classes.footer_buttons}>
            <button onClick={saveFunc}>Сохранить</button>
            <button onClick={removeFunc}>{innerText}</button>
        </div>
    );
};

export default ExerciseFormButtons;