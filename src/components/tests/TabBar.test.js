import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TabBar from '../TabBar';

describe('TabBar component', () => {
    // Test 1: renders without crashing
    test('renders without crashing', () => {
        render(<Router><TabBar userId={123} /></Router>);
    });

    // Test 2: navigates to the correct path on click
    test('navigates to the correct path on click', () => {
        const { getByText } = render(<Router><TabBar userId={123} /></Router>);

        fireEvent.click(getByText('Домашняя'));
       
        fireEvent.click(getByText('Тренировки'));
        

        fireEvent.click(getByText('Калории'));
        

        fireEvent.click(getByText('Статистика'));
        
    });

    // Test 3: Add more tests to cover other aspects of the component
    // For example, checking the active state, handling edge cases, etc.
});
