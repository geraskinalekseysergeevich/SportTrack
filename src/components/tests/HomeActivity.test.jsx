import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeActivity from '../HomeActivity';
import '@testing-library/jest-dom/extend-expect';

describe('HomeActivity компонент', () => {
    test('должен рендерить элементы для типа "diet" с правильными данными', () => {
        const combined = [
            { type: 'diet', name: 'Завтрак', calories: 300, protein: 10, fat: 5, carbs: 50, date: '2024-03-09' }
        ];

        render(<HomeActivity combined={combined} />);

        expect(screen.getByText(/Прием пищи: Завтрак/)).toBeInTheDocument();
        expect(screen.getByText(/Калории: 300/)).toBeInTheDocument();
        expect(screen.getByText(/Б: 10/)).toBeInTheDocument();
        expect(screen.getByText(/Ж: 5/)).toBeInTheDocument();
        expect(screen.getByText(/У: 50/)).toBeInTheDocument();
        expect(screen.getByText(/2024-03-09/)).toBeInTheDocument();
    });

    test('должен рендерить элементы для типа "workout" с правильными данными', () => {
        const combined = [
            { type: 'workout', name: 'Утренняя тренировка', time: '8:00', location: 'спортзал', date: '2024-03-09' }
        ];

        render(<HomeActivity combined={combined} />);

        expect(screen.getByText(/Тренировка: Утренняя тренировка/)).toBeInTheDocument();
        expect(screen.getByText(/Время тренировки: 8:00/)).toBeInTheDocument();
        expect(screen.getByText(/Место: спортзал/)).toBeInTheDocument();
        expect(screen.getByText(/2024-03-09/)).toBeInTheDocument();
    });

    test('должен возвращать сообщение о пустом списке для неподдерживаемого типа', () => {
        const combined = [
            { type: 'unsupported', name: 'Unsupported', calories: 300, protein: 10, fat: 5, carbs: 50, date: '2024-03-09' }
        ];
    
        render(<HomeActivity combined={combined} />);
    
        expect(screen.getByText(/Здесь будут отображаться ваши последние приемы пищи и тренировки/)).toBeInTheDocument();
    });
});
