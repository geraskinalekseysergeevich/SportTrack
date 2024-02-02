import React from 'react';
import classes from '../UI/VisualCheckboxes.module.css';

const VisualCheckboxes = ({data, disabledState, changeFunc, changeCheckboxFunc}) => {
    return (
        <div className={classes.visualcheckboxes__container}>
            <div className={classes.repetitions}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="repetitions"
                        checked={!!data.repetitions}
                        onChange={changeCheckboxFunc}
                        disabled={disabledState}
                    />
                    <label>Количество повторений:</label>
                </div>
                <input
                    type="number"
                    name="repetitions"
                    value={data.repetitions || ''}
                    onChange={changeFunc}
                    disabled={disabledState === true ? true : !data.repetitions}
                    min={1}
                    className={classes.small_input}
                />
            </div>
            <div className={classes.sets}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="sets"
                        checked={!!data.sets}
                        onChange={changeCheckboxFunc}
                        disabled={disabledState}
                    />
                    <label>Количество подходов:</label>
                </div>
                <input
                    type="number"
                    name="sets"
                    value={data.sets || ''}
                    onChange={changeFunc}
                    disabled={disabledState === true ? true : !data.sets}
                    min={1}
                    className={classes.small_input}
                />
            </div>
            <div className={classes.weight}>
                <div className={classes.checkbox__container}>
                    <input
                        type="checkbox"
                        name="weight"
                        checked={!!data.weight}
                        onChange={changeCheckboxFunc}
                        disabled={disabledState}
                    />
                    <label>Вес утяжеления:</label>
                </div>
                <input
                    type="number"
                    name="weight"
                    value={data.weight || ''}
                    onChange={changeFunc}
                    disabled={disabledState === true ? true : !data.weight}
                    min={1}
                    className={classes.small_input}
                />
            </div>
        </div>
    );
};

export default VisualCheckboxes;