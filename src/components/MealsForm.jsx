import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MealItem from './MealItem';
import MealItemAddForm from './MealItemAddForm';
import classes from '../UI/MealsForm.module.css';
import TabBar from './TabBar';
import plus_icon from '../sources/meals/plus.png';
import save_icon from '../sources/meals/save.png';
import MealItemEditForm from './MealItemEditForm';

const MealsForm = ({ userId }) => {
    const [model, setModel] = useState( { isTotal: true } );
    const [openAddItem, setOpenAddItem] = useState(false);
    const [openEditItem, setOpenEditItem] = useState(false)
    const [mealName, setMealName] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    const [editedItem, setEditedItem] = useState()


    const toggleAddItemMenu = () => {
        setOpenAddItem(!openAddItem)
        setOpenEditItem(false)
    };

    const onAddItem = async (item) => {
        const items = foodItems.filter(el => el.id !== item.id)
        items.push(item);
        setFoodItems(items);
        setEditedItem(undefined);
        setOpenAddItem(false);
        setModel( { isTotal: true } )
    }

    const onRemoveItem = (item) => {
        setFoodItems(foodItems.filter(el => el.id !== item.id));
    }

    const onEditItem = (id) => {
        const selectedItem = foodItems.find(item => item.id === id)
        setEditedItem(selectedItem)
        setOpenEditItem(true)
    }

    const saveEdits = (editedItem) => {
        const updatedItems = foodItems.map(item => {
            return item.id === editedItem.id ? editedItem : item
        });
        setFoodItems(updatedItems);
        setEditedItem(null);
        setOpenEditItem(false);
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

    const getCurrentDatetime = () => {
        // получаем текущую дату
        const currentdate = new Date();
        const datetime =
            currentdate.getHours() +
            ':' +
            currentdate.getMinutes() +
            ':' +
            currentdate.getSeconds();
        return datetime
    }

    const handleSaveAll = async (e) => {
        e.preventDefault();
        try {
            foodItems.forEach(async item => {
                var course = mealName;
                var name = item.name;
                var weight = item.weight;
                var calories = item.calories;
                var protein = item.protein;
                var carbs = item.carbs;
                var fat = item.fat;
                var timecreated = getCurrentDatetime();
                var date = dayToday();
                var items = ["date:'" + date + "'", "course:'" + course + "'", "name:'" + name + "'", "timecreated:'" + timecreated + "'", "weight:" + Number(weight),
                "calories:" + Number(calories), "protein:" + Number(protein), "carbs:" + Number(carbs), "fat:" + Number(fat)];

                const response = await fetch('http://localhost:3001/api/users/saveUserCallorie', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, items }),
                });

                if (response.ok) {
                    const { userId } = await response.json();
                    console.log(userId);
                    // Сохранение токена и ID пользователя, например, в локальном хранилище
                    console.log('Log successful');
                    //navigate('/trainings', { state: { userId } });
                } else {
                    console.error('Log failed');
                }
            })
            setFoodItems([]);
        }

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
                        <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })} />
                    </div>
                    <div className={classes.title__container}>
                        <label htmlFor="meal-name-input">Название:</label>
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

                        {openAddItem && (<MealItemAddForm model={model} setModel={setModel} onSave={onAddItem} />)}
                        {openEditItem && (<MealItemEditForm editedModel={editedItem} setEditedModel={setEditedItem} saveEdits={() => saveEdits(editedItem)}/>)}

                        <div className={classes.bottom_buttons}>
                            <div className={classes.icons__container} onClick={toggleAddItemMenu}>
                                <img src={plus_icon} alt="plus icon" />
                            </div>

                            <div className={classes.icons__container}>
                                <img src={save_icon} alt="save icon" onClick={handleSaveAll} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TabBar userId={userId} />
        </>
    );
};

export default MealsForm;
