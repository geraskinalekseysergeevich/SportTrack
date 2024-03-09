import React from 'react';
import classes from '../UI/MealItem.module.css';

const MealItem = ({ model, onRemoveItem, onEditItem }) => {
    return (
        <div className={classes.mealitem_container}>
            <div className={classes.meal_info}>
                <div>
                    <span>{model.name}</span>
                </div>

                <div>
                    <label>Масса нетто: </label>
                    <span>{model.weight}г.</span>
                </div>

                <div>
                    <label>Калорийность: </label>
                    <span>{model.calories}ккал</span>
                </div>

                <div className={classes.bju__container}>
                    <div>
                        <label>Б: </label>
                        <span>{model.protein}г.,</span>
                    </div>
                    <div>
                        <label>Ж: </label>
                        <span>{model.fat}г.,</span>
                    </div>
                    <div>
                        <label>У: </label>
                        <span>{model.carbs}г.</span>
                    </div>
                </div>
            </div>

            <div className={classes.meal_buttons}>
                <button onClick={() => onEditItem(model.id)}>Изменить</button>
                <button onClick={() => onRemoveItem(model)}>Удалить</button>
            </div>
        </div>
    );
};

export default MealItem;