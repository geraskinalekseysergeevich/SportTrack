import React, { useState } from 'react';
import classes from '../UI/TabBar.module.css';
import home_icon from '../sources/tabbar/home.png';
import train_icon from '../sources/tabbar/train.png';
import kcal_icon from '../sources/tabbar/kcal.png';
import stats_icon from '../sources/tabbar/stats.png';

const TabBar = () => {

    const [activePage, setActivePage] = useState(1)

    return (
        <div className={classes.tabbar__container}>
            <a className={classes.tabbar__page}>
                <i className={`fi fi-sr-home ${classes.tabbar__icon}`} onClick={() => setActivePage(1)}>   </i>
                <p className={classes.page__name}>Домашняя</p>
                {/* {activePage === 1 && <div></div>} */}
            </a>
            <a className={classes.tabbar__page}>
                <i className={`fi fi-ss-gym ${classes.tabbar__icon}`} nClick={() => setActivePage(2)}></i>
                <p className={classes.page__name}>Тренировки</p>
                {activePage === 2 && <div></div>}
            </a>
            <a className={classes.tabbar__page}>
                <i className={`fi fi-sr-utensils ${classes.tabbar__icon}`} onClick={() => setActivePage(3)}></i>
                <p className={classes.page__name}>Калории</p>
                {activePage === 3 && <div></div>}
            </a>
            <a className={classes.tabbar__page}>
                <i className={`fi fi-br-stats ${classes.tabbar__icon}`} onClick={() => setActivePage(4)}></i>
                <p className={classes.page__name}>Прогресс</p>
                {activePage === 4 && <div></div>}
            </a>
        </div>
    );
};

export default TabBar;