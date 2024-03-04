import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';

// Парсинг строки с временем в минуты
const parseTime = (timeStr) => {
  const [min, sec] = timeStr.split(':').map(parseFloat);
  return min + sec / 60;
};

// Парсинг строки с датой
const parseDate = (dateStr) => {
  const [date, time] = dateStr.split('@');
  const [day, month, year] = date.split('/').map((val) => parseInt(val, 10));
  return new Date(year, month, day);
};

const StatisticsComponent = ({ trainData, calorieData }) => {
  const [dailyExercise, setDailyExercise] = useState({});
  const [dailyCalories, setDailyCalories] = useState({});
  const [dailyActivityChart, setDailyActivityChart] = useState({});

  useEffect(() => {
    // Расчет ежедневного времени тренировок
    const exerciseStats = trainData.reduce((acc, data) => {
      const dateKey = parseDate(data.timecreated).toLocaleDateString();
      acc[dateKey] = (acc[dateKey] || 0) + parseTime(data.time);
      return acc;
    }, {});

    // Расчет ежедневного потребления калорий
    const calorieStats = calorieData.reduce((acc, data) => {
      const dateKey = parseDate(data.timecreated).toLocaleDateString();
      acc[dateKey] = (acc[dateKey] || 0) + data.calorie;
      return acc;
    }, {});

    // Построение столбчатого графика активности со временем и калориями
    const activityChart = {
      labels: Object.keys(exerciseStats),
      datasets: [
        {
          label: 'Процент выполнения упражнений',
          data: Object.values(exerciseStats).map((val) => (val / 60) * 100),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Процент потребления калорий',
          data: Object.values(calorieStats).map((val) => (val / 2000) * 100),
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1,
        },
      ],
    };

    setDailyExercise(exerciseStats);
    setDailyCalories(calorieStats);
    setDailyActivityChart(activityChart);
  }, [trainData, calorieData]); // Обновляем данные при изменении trainData и calorieData

  // Круговая диаграмма для тренировок
  const pieExerciseData = {
    labels: ['Пройдено', 'Осталось'],
    datasets: [
      {
        data: [
          Math.min(Object.values(dailyExercise).reduce((a, b) => a + b, 0), 60),
          Math.max(60 - Object.values(dailyExercise).reduce((a, b) => a + b, 0), 0)
        ],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderColor: 'rgba(255,255,255,0.5)',
      },
    ],
  };

  // Круговая диаграмма для калорий
  const pieCalorieData = {
    labels: ['Употреблено', 'Осталось'],
    datasets: [
      {
        data: [
          Math.min(Object.values(dailyCalories).reduce((a, b) => a + b, 0), 2000),
          Math.max(2000 - Object.values(dailyCalories).reduce((a, b) => a + b, 0), 0)
        ],
        backgroundColor: ['#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#FFCE56','#FF6384'],
        borderColor: 'rgba(255,255,255,0.5)',
      },
    ],
  };

  return (
    <div>
      <h2>Статистика тренировок</h2>
      <Pie data={pieExerciseData} />
      <h2>Статистика калорий</h2>
      <Pie data={pieCalorieData} />
      <h2>Активность по дням</h2>
      <Bar data={dailyActivityChart} />
    </div>
  );
};

export default StatisticsComponent;