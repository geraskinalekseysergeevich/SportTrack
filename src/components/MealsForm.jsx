import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MealItem from './MealItem';
import MealItemAddForm from './MealItemAddForm';
import classes from '../UI/MealsForm.module.css';
import TabBar from './TabBar';
import plus_icon from '../sources/meals/plus.png';
import save_icon from '../sources/meals/save.png';

const MealsForm = ({userId}) => {
    const [openAddItem, setOpenAddItem] = useState(false);
    const [mealName, setMealName] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [editedItem, setEditedItem] = useState();

    const toggleAddItemMenu = () => {
        setOpenAddItem(!openAddItem);
    };

    const onAddItem = async (item) => {
        const items = foodItems.filter(el => el.id !== item.id)
        items.push(item);
        setFoodItems(items);
        setEditedItem(undefined);
        setOpenAddItem(false);
    }

    const onRemoveItem = (item) => {
        setFoodItems(foodItems.filter(el => el.id !== item.id));
    }

    const onEditItem = (item) => {
        setEditedItem(item);
        setOpenAddItem(true);
    }

    const dayToday = () => {
        var currentdate = new Date();
        if (currentdate.getMonth() + 1 < 10) {
            var datetime =
                currentdate.getFullYear() +
                '-0' +
                (currentdate.getMonth() + 1) +
                '-' +
                currentdate.getDate();
        } else datetime =
            currentdate.getFullYear() +
            '-' +
            (currentdate.getMonth() + 1) +
            '-' +
            currentdate.getDate();
        return datetime;
    }

    const handleSaveAll = async(e) => {
        e.preventDefault();
        try {
            foodItems.forEach(async item => {
                var course = mealName;
                var name = item.name;
                var weight = item.weight;
                var calories = item.isTotal ? item.calories : item.calories * item.weight;
                var protein = item.isTotal ? item.protein : item.protein * item.weight;
                var carbs = item.isTotal ? item.carbs : item.carbs * item.weight;
                var fat = item.isTotal ? item.fat : item.fat * item.weight;
                var date = dayToday();
                var items = ["date:'"+date+"'", "course:'"+course+"'", "name:'"+name+"'", "weight:"+Number(weight),
                 "calories:"+Number(calories), "protein:"+Number(protein), "carbs:"+Number(carbs), "fat:"+Number(fat)];

                console.log(items);

                const response = await fetch('http://localhost:3001/api/users/saveUserCallorie', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({userId, items}),
                  });

                  if (response.ok) {
                    const { token, userId } = await response.json();
                    console.log(userId);
                    // Сохранение токена и ID пользователя, например, в локальном хранилище
                    console.log('Log successful');
                    //navigate('/trainings', { state: { userId } });
                  } else {
                    console.error('Log failed');
                  }
                })}
            catch (error) {
                  console.error('Log error:', error);
                }
            }

            const navigate = useNavigate();

    return (
        <>
            <div className={classes.mealsform__section}>
                <div className={classes.mealsform__container}>
                    <div className={classes.mealsform_header}>
                        <h1>Добавить приём пищи</h1>
                        <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })}/>
                    </div>
                    <div className={classes.title__container}>
                        <label for="meal-name-input">Название:</label>
                        <input
                            type="text"
                            id="meal-name-input"
                            placeholder="Завтрак | Обед | Ужин"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                    </div>
                    <div className={classes.mealdata__container}>
                        {foodItems.map((item) =>
                            <MealItem key={item.id} model={item} onEditItem={onEditItem} onRemoveItem={onRemoveItem} />
                        )}

                        {openAddItem && (<MealItemAddForm model={editedItem} onSave={onAddItem} />)}

                        <div className={classes.bottom_buttons}>
                            <div className={classes.icons__container} onClick={toggleAddItemMenu}>
                                <img src={plus_icon} alt="plus icon" />
                            </div>
                            
                            <div className={classes.icons__container}>
                                <img src={save_icon} alt="save icon" onClick={handleSaveAll}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TabBar userId={userId}/>
        </>
    );
};

export default MealsForm;
