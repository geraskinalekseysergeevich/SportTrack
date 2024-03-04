import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ProgressBar from 'react-customizable-progressbar';
import { Chart } from 'react-google-charts';

const StatisticsComponent = ({userId}) => {
    const [exerciseData, setExerciseData] = useState([]);
    const [nutritionData, setNutritionData] = useState({date: [], percentage: []});
    const recommendedTime = 60; 
    const recommendedCalories = 2000;
    //console.log(userId);

    const log = () =>{
        //console.log(exerciseData);
        //console.log(nutritionData);
        
    }

    const dayToday = () => {
        var currentdate = new Date();
        if(currentdate.getMonth()+ 1 < 10){
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

    const getNutritionPercenatge = () =>{
        var percentage = 0
        console.log(nutritionData)

        //nutritionData.forEach(data => {
            //console.log(data.date.split('T')[0] + '  ' + dayToday());
            //console.log("!"+data)
            // if(data.date.split('T')[0] === dayToday()){
            // percentage = data.percentage;
            // }
        //});
        return percentage;
    }

    const getExercisePercenatge = () =>{
        var percentage = 0
        exerciseData.forEach(data => {
            //console.log(data.date.split('T')[0] + '  ' + dayToday());
            if(data.date.split('T')[0] === dayToday()){
            percentage = data.percentage;
            }
        });
        return percentage;
    }

    const getExerciseChartData = () => {
        var ddata = [["Date", "Выполнение тренировок"]];
        // ddata.push(["Date", "Percentage", {role:"style"}])
        for (let index = -6; index <= 0; index++) {
            exerciseData.forEach(data => {
                //console.log(data.date.split('-')[2].split('T')[0]);
                if(parseInt(data.date.split('-')[2].split('T')[0]) === parseInt(dayToday().split('-')[2])+index){
                ddata.push([data.date.split('T')[0], data.percentage]);
                }
            });
            //console.log(ddata)
        }
        return ddata;
    }

    const getNutritionChartData = () => {
        // var ddata = [["Date", "Норма калорий"]];
        // // ddata.push(["Date", "Percentage", {role:"style"}])
        // for (let index = -6; index <= 0; index++) {
        //     nutritionData.forEach(data => {
        //         console.log(data.date.split('-')[2].split('T')[0]);
        //         if(parseInt(data.date.split('-')[2].split('T')[0]) === parseInt(dayToday().split('-')[2])+index){
        //         ddata.push([data.date.split('T')[0], data.percentage]);
        //         }
        //     });
        //     //console.log(ddata)
        // }
        // return ddata;
    }
      
    
    const [inputData, setInputData] = useState({ items: [], exercises: [] });

    useEffect(() => {
        const exerciseArray = [];
        const nutritionArray = [];
        const groupedData = [];
        
        fetch(`http://localhost:3001/api/users/user/data?userId=${userId}`) // id пользователя как параметр
        .then(response => response.json())
        .then(data => setInputData(data))
        .catch(error => console.error(error));
          
        inputData.items.forEach((item) => {
        //if(typeof(item) == Array)
                let resultObject = {};
                if(item!=null && item!==undefined){
                item.forEach(el => {
                    if(el!=null && el!==undefined){
                        let [key, value] = el.split(':');
                        key = key.replace(/'/g, '').trim();
                        value = value.replace(/'/g, '').trim();
                        value = !isNaN(value) ? parseInt(value, 10) : value; // Проверяем, является ли значение числом
                        resultObject[key] = value;
                }});
                groupedData.push(resultObject)
            }
        }
        );


        // inputData.forEach((item) => {
        //    const date = moment(item.timecreated, 'DD/M/YYYY @ HH:mm:ss')
        //        .startOf('day')
        //        .format();

        //     if (!(date in groupedData)) {
        //         groupedData[date] = { trainTime: 0, calories: 0 };
        //     }

        //     if (item.type === 'train') {
        //         const timeMinutes =
        //             parseFloat(item.time.split(':')[0]);
        //         groupedData[date].trainTime += timeMinutes;
        //     } else if (item.type === 'calorie') {
        //         groupedData[date].calories += item.calorie;
        //     }
        // });
        Object.keys(groupedData).forEach((date) => {
            nutritionArray.push({
                date: groupedData[date].date,
                percentage:
                    (groupedData[date].calories / recommendedCalories) * 100,
            });
        });

        //setExerciseData(exerciseArray);
        //console.log(nutritionArray);
        //console.log(nutritionData)
        console.log(nutritionArray)
        var groupedNutrition = []
        nutritionArray.forEach(element => {
            if(!(element['date'] in groupedNutrition))
                groupedNutrition[element['date']] = { percentage: 0 };
        });
        
        console.log(groupedNutrition)
        nutritionArray.forEach(element => {
            groupedNutrition.forEach(el2 => { 
                    console.log(element['date']+el2['date'])
            });
        });
        console.log(groupedNutrition)
        setNutritionData();
    }, [userId]);
    



    return (
        <div>

            {/* 
            <div style={{display:'inline-block'}}>
            <div><h1>Нагрузки</h1><p>{parseInt(getExercisePercenatge())}%/100%</p></div>
            <div style={{width:200, height:200, margin:'auto', display:'inline-block'}}>
                <ProgressBar progress={getExercisePercenatge()} strokeColor='red'></ProgressBar>
            </div>
            <div><h1>Еда</h1><p>{parseInt(getNutritionPercenatge())}%/100%</p></div>
            <div style={{width:200, height:200, margin:'auto', display:'inline-block'}}>
                <ProgressBar progress={getNutritionPercenatge()} strokeColor='lime'></ProgressBar>
            </div>
            </div>
            <Chart chartType="ColumnChart" width="100%" height="400px" data={getExerciseChartData()} />
            <Chart chartType="ColumnChart" width="100%" height="400px" data={getNutritionChartData()} />
            {}
            {log()} */}
        </div>


          
    );
};

export default StatisticsComponent;
