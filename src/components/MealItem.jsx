import React from 'react';
import classes from '../UI/MealItem.module.css';

const MealItem = ({model, onEditItem, onRemoveItem}) => {
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
                    <span>{model.isTotal ? model.calories : model.calories * model.weight}ккал</span>
                </div>

                <div className={classes.bju__container}>
                    <div>
                        <label>Б: </label>
                        <span>{model.isTotal ? model.protein : model.protein * model.weight}г.,</span>
                    </div>
                    <div>
                        <label>Ж: </label>
                        <span>{model.isTotal ? model.fat : model.fat * model.weight}г.,</span>
                    </div>
                    <div>
                        <label>У: </label>
                        <span>{model.isTotal ? model.carbs : model.carbs * model.weight}г.</span>
                    </div>
                </div>
            </div>

            <div className={classes.meal_buttons}>
                <button onClick={() => onEditItem(model)}>Изменить</button>
                <button onClick={() => onRemoveItem(model)}>Удалить</button>
            </div>
        </div>
    );
};

export default MealItem;