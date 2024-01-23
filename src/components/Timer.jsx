import React from 'react';
import classes from '../UI/Timer.module.css';
import start_icon from '../sources/exercise/play.png';
import pause_icon from '../sources/exercise/pause.png';
import stop_icon from '../sources/exercise/stop.png';

const Timer = ({formatTimeFunc, startStopFunc, intervalId, resetFunc}) => {
    return (
        <div className={classes.timer__container}>
            <div className={classes.icons__container} onClick={startStopFunc}>
                {intervalId 
                ? <img src={pause_icon} alt='pause'/>
                : <img src={start_icon} alt='start'/>
                }
            </div>

            <div className={classes.time__container}>
                <p>Время:</p>
                <p className={classes.time}>{formatTimeFunc()}</p>
            </div>
            
            <div className={classes.icons__container} onClick={resetFunc}>
                <img src={stop_icon} alt="stop" />
            </div>
        </div>
    );
};

export default Timer;