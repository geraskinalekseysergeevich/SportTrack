import React, { useState } from 'react';
import classes from '../UI/TabBar.module.css';
import { Link } from 'react-router-dom';

const TabBar = () => {

    const [activePage, setActivePage] = useState(1)

    return (
        <div className={classes.tabbar__container}>
            <Link to='/home' className={classes.tabbar__page}>
                <i className={`fi fi-sr-home ${classes.tabbar__icon}`} onClick={() => setActivePage(1)}>   </i>
                <p className={classes.page__name}>Домашняя</p>
                {/* {activePage === 1 && <div></div>} */}
            </Link>
            <Link to='/trainings' className={classes.tabbar__page}>
                <i className={`fi fi-ss-gym ${classes.tabbar__icon}`} onClick={() => setActivePage(2)}></i>
                <p className={classes.page__name}>Тренировки</p>
                {activePage === 2 && <div></div>}
            </Link>
            <Link to='/meals' className={classes.tabbar__page}>
                <i className={`fi fi-sr-utensils ${classes.tabbar__icon}`} onClick={() => setActivePage(3)}></i>
                <p className={classes.page__name}>Калории</p>
                {activePage === 3 && <div></div>}
            </Link>
            <Link to='/statistics' className={classes.tabbar__page}>
                <i className={`fi fi-br-stats ${classes.tabbar__icon}`} onClick={() => setActivePage(4)}></i>
                <p className={classes.page__name}>Статистика</p>
                {activePage === 4 && <div></div>}
            </Link>
        </div>
    );
};

export default TabBar;