import React from 'react';
import classes from '../UI/Timer.module.css';

const Timer = ({formatTimeFunc, startStopFunc, intervalId, resetFunc}) => {
    return (
        <div className={classes.timer__container}>
            <div>Время: {formatTimeFunc()}</div>
            <button type="button" onClick={startStopFunc}>
                {intervalId 
                ? <img src={require('../sources/exercise/pause.png')} alt="pause" />
                : <img src={require('../sources/exercise/stop.png')} alt="start" />
                }
            </button>
            <button type="button" onClick={resetFunc}>Сброс</button>
        </div>
    );
};

export default Timer;