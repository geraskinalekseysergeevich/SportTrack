import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TabBar from '../TabBar';

describe('TabBar component', () => {
    test('renders without crashing', () => {
        render(<Router><TabBar userId={123} /></Router>);
    });

    test('navigates to the correct path on click', () => {
        const { getByText } = render(<Router><TabBar userId={123} /></Router>);

        fireEvent.click(getByText('Домашняя'));
        // Add assertions for navigation, you may need to mock the useNavigate hook for this

        fireEvent.click(getByText('Тренировки'));
        // Add assertions for navigation

        fireEvent.click(getByText('Калории'));
        // Add assertions for navigation

        fireEvent.click(getByText('Статистика'));
        // Add assertions for navigation
    });

    // Add more tests to cover other aspects of the component, such as checking active state, etc.
});
