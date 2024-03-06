import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../UI/TabBar.module.css'; // предполагается, что стили определены в этом файле

const TabBar = ({ userId }) => {
    const [activePage, setActivePage] = useState(1);
    const navigate = useNavigate();

    const handleNavigation = (page, path) => {
        setActivePage(page);
        navigate(path, { state: { userId } });
    };

    return (
        <div className={classes.tabbar__container}>
            <div className={classes.tabbar__page} onClick={() => handleNavigation(1, '/home')}>
                <i className={`fi fi-sr-home ${classes.tabbar__icon}`}></i>
                <p className={classes.page__name}>Домашняя</p>
            </div>
            <div className={classes.tabbar__page} onClick={() => handleNavigation(2, '/trainings')}>
                <i className={`fi fi-ss-gym ${classes.tabbar__icon}`}></i>
                <p className={classes.page__name}>Тренировки</p>
            </div>
            <div className={classes.tabbar__page} onClick={() => handleNavigation(3, '/meals')}>
                <i className={`fi fi-sr-utensils ${classes.tabbar__icon}`}></i>
                <p className={classes.page__name}>Калории</p>
            </div>
            <div className={classes.tabbar__page} onClick={() => handleNavigation(4, '/statistics')}>
                <i className={`fi fi-br-stats ${classes.tabbar__icon}`}></i>
                <p className={classes.page__name}>Статистика</p>
            </div>
            {/* Индикаторы активной страницы могут быть добавлены здесь */}
        </div>
    );
};

export default TabBar;