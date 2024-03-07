import React, { useState, useEffect } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import { Chart } from 'react-google-charts';
import TabBar from './TabBar';
import { useNavigate } from 'react-router-dom';

const StatisticsComponent = ({ userId }) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [nutritionData, setNutritionData] = useState([]);
    const exerciseArray = [];
    const nutritionArray = [];
    const groupedData = [];
    const [inputData, setInputData] = useState({ items: [], exercises: [] });

    const recommendedTime = 60;
    const recommendedCalories = 2000;

    const dayToday = () => {
        var currentdate = new Date();
        if (currentdate.getMonth() + 1 < 10) {
            var datetime =
                currentdate.getFullYear() +
                '-0' +
                (currentdate.getMonth() + 1) +
                '-' +
                currentdate.getDate();

        } else
            datetime =
                currentdate.getFullYear() +
                '-' +
                (currentdate.getMonth() + 1) +
                '-' +
                currentdate.getDate();
        return datetime;
    };

    const getPreviousWeek = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        const weekArray = [];

        for (let i = 0; i < 7; i++) {
            let date = new Date(currentYear, currentMonth - 1, currentDay - i);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (month < 10) month = '0' + month;

            weekArray.push(`${year}-${month}-${day}`);
        }
        return weekArray;
    };

    const getNutritionPercenatge = () => {
        if (nutritionData[dayToday()] === undefined) return 0;
        else if (isNaN(nutritionData[dayToday()])) return 0;
        else return nutritionData[dayToday()];
    };

    const getNutritionChartData = () => {
        var ddata = [['Date', 'Норма калорий, %']];
        var arr = nutritionData;
        const weekArray = getPreviousWeek();
        for (var i = 0; i < weekArray.length; i++) {
            var date = weekArray[i];
            if (arr[weekArray[i]] !== undefined) {
                var calories = arr[weekArray[i]];
            } else calories = 0;
            ddata.push([date, calories]);
        }
        return ddata;
    };

    const getExercisePercenatge = () => {
        if (nutritionData[dayToday()] === undefined) return 0;
        else if (isNaN(exerciseData[dayToday()])) return 0;
        else return exerciseData[dayToday()];
    };

    const getExerciseChartData = () => {
        var ddata = [['Date', 'Норма времени, %']];
        var arr = exerciseData;
        const weekArray = getPreviousWeek();
        for (var i = 0; i < weekArray.length; i++) {
            var date = weekArray[i];
            if (arr[weekArray[i]] !== undefined) {
                var time = arr[weekArray[i]];
            } else time = 0;
            ddata.push([date, time]);
        }
        return ddata;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`);
                const data = await response.json();
                setInputData(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [userId]);

    useEffect(() => {
        const load = async () => {
            inputData.items.forEach((item) => {
                let resultObject = {};
                if (item != null && item !== undefined) {
                    item.forEach((el) => {
                        if (el != null && el !== undefined) {
                            let [key, value] = el.split(':');

                            key = key.replace(/'/g, '').trim();
                            value = value.replace(/'/g, '').trim();
                            value = !isNaN(value) ? parseInt(value, 10) : value; // Проверяем, является ли значение числом
                            resultObject[key] = value;
                        }
                    });
                    groupedData.push(resultObject);
                }
            });
            inputData.exercises.forEach((item) => {
                let resultObject = {};
                if (item != null && item !== undefined) {
                    item.forEach((el) => {
                        if (el != null && el !== undefined) {
                            let [key, value] = el.split(':');
                            key = key.replace(/'/g, '').trim();
                            value = value.replace(/'/g, '').trim();
                            value = !isNaN(value) ? parseInt(value, 10) : value; // Проверяем, является ли значение числом
                            resultObject[key] = value;
                        }
                    });
                    groupedData.push(resultObject);
                }
            });

            groupedData.forEach((data) => {
                if (data['time'] !== undefined) {
                    exerciseArray.push({
                        date: data['date'],
                        percentage: (data['time'] / recommendedTime) * 100,
                    });
                } else
                    nutritionArray.push({
                        date: data['date'],
                        percentage:
                            (data['calories'] / recommendedCalories) * 100,
                    });
            });

            var groupedNutrition = [];
            nutritionArray.forEach((element) => {
                if (!(element['date'] in groupedNutrition))
                    groupedNutrition[element['date']] = { percentage: 0 };
            });
            for (let item of nutritionArray) {
                if (groupedNutrition[item.date]) {
                    groupedNutrition[item.date].percentage += item.percentage;
                }
            }

            var groupedExercises = [];
            exerciseArray.forEach((element) => {
                if (!(element['date'] in groupedExercises))
                    groupedExercises[element['date']] = { percentage: 0 };
            });

            for (let item of exerciseArray) {
                if (groupedExercises[item.date]) {
                    groupedExercises[item.date].percentage += item.percentage;
                }
            }

            const arr = [];
            const arr2 = [];

            nutritionArray.forEach((obj) => {
                const date = obj.date;
                if (!arr[date]) {
                    arr[date] = 0;
                }
                arr[date] += obj.percentage;
            });

            exerciseArray.forEach((obj) => {
                const date = obj.date;
                if (!arr2[date]) {
                    arr2[date] = 0;
                }
                arr2[date] += obj.percentage;
            });

            setExerciseData(arr2);
            setNutritionData(arr);
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputData.items]);

    const navigate = useNavigate();

    return (
        <>
        <img src={require('../sources/avatar.png')} alt="" onClick={() => navigate('/profile', { state: { userId } })}/>
        <div>
            <div style={{ backgroundColor: 'black'}}>
                <div>
                    <h1>Нагрузки</h1>
                    <p>{parseInt(getExercisePercenatge())}%/100%</p>
                </div>
                <div
                    style={{
                        width: 200,
                        height: 200,
                        margin: 'auto',
                        display: 'inline-block',
                    }}
                >
                    <ProgressBar
                        progress={getExercisePercenatge()}
                        strokeColor="red"
                    ></ProgressBar>
                </div>
                <div>
                    <h1>Еда</h1>
                    <p>{parseInt(getNutritionPercenatge())}%/100%</p>
                </div>
                <div
                    style={{
                        width: 200,
                        height: 200,
                        margin: 'auto',
                        display: 'inline-block',
                    }}
                >
                    <ProgressBar
                        progress={getNutritionPercenatge()}
                        strokeColor="lime"
                    ></ProgressBar>
                </div>
            </div>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={getExerciseChartData()}
            />
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="400px"
                data={getNutritionChartData()}
            />
        </div>
        <TabBar userId={userId}/>
        </>
    );
};

export default StatisticsComponent;
