import React from 'react';
import classes from '../UI/VisualExerciseForm.module.css';
import VisualCheckboxes from './VisualCheckboxes';

const VisualExerciseForm = ({changeFunc = undefined, data, changeCheckboxFunc = undefined, disabledState = false}) => {
    return (
        <div className={classes.visual__container}>
            <div className={classes.name}>
                <label>Название упражнения:</label>
                <input
                    type="text"
                    name="name"
                    placeholder=' Введите название тренировки'
                    value={data.name || ''}
                    onChange={changeFunc}
                    disabled={disabledState}
                />
            </div>
            <div className={classes.category}>
                <label>Категория:</label>
                <input
                    type="text"
                    name="category"
                    placeholder=' Введите название категории'
                    value={data.category || ''}
                    onChange={changeFunc}
                    disabled={disabledState}
                />
            </div>
            <VisualCheckboxes
                data={data}
                changeFunc={changeFunc}
                changeCheckboxFunc={changeCheckboxFunc}
                disabledState={disabledState}
            />
            <div className={classes.location}>
                <label>Место:</label>
                <input
                    type="text"
                    name="location"
                    placeholder=' Введите место тренировки'
                    value={data.location || ''}
                    onChange={changeFunc}
                />
            </div>
            <div className={classes.mood_options}>
                <label>Самочувствие:</label>
                <select
                    name="mood"
                    value={data.mood || ''}
                    onChange={changeFunc}
                >
                    <option value="">Выберите вариант</option>
                    <option value="хорошее">Хорошее</option>
                    <option value="плохое">Плохое</option>
                    <option value="не изменилось">Не изменилось</option>
                </select>
            </div>
            <div className={classes.comment}>
                <label>Комментарий:</label>
                <input
                    type="text"
                    name="comment"
                    placeholder=' Введите комментарий'
                    value={data.comment || ''}
                    onChange={changeFunc}
                />
            </div>
        </div>
    );
};

export default VisualExerciseForm;