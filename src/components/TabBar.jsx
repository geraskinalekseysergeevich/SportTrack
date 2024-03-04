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
            <div>
                <img src={home_icon} alt="home" onClick={() => setActivePage(1)}/>
                {activePage === 1 && <div></div>}
            </div>
            <div>
                <img src={train_icon} alt="train" onClick={() => setActivePage(2)}/>
                {activePage === 2 && <div></div>}
            </div>
            <div>
                <img src={kcal_icon} alt="kcal" onClick={() => setActivePage(3)}/>
                {activePage === 3 && <div></div>}
            </div>
            <div>
                <img src={stats_icon} alt="stats" onClick={() => setActivePage(4)}/>
                {activePage === 4 && <div></div>}
            </div>
        </div>
    );
};

export default TabBar;