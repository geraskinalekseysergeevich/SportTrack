import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileShow from '../ProfileShow';

describe('ProfileShow component', () => {
  // Sample user information
  const userInfo = {
    height: 170,
    weight: 70,
    age: 25,
    info: 'User information',
  };

  // Test 1: renders profile information correctly
  test('renders profile information correctly', () => {
    render(
      <Router>
        <ProfileShow userInfo={userInfo} />
      </Router>
    );

    // Check if the profile information is rendered correctly
    expect(screen.getByText('Рост')).toBeInTheDocument();
    expect(screen.getByText('170')).toBeInTheDocument();
    expect(screen.getByText('Вес')).toBeInTheDocument();
    expect(screen.getByText('70')).toBeInTheDocument();
    expect(screen.getByText('Возраст')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Информация')).toBeInTheDocument();
    expect(screen.getByText('User information')).toBeInTheDocument();
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });

  // Test 2: renders "Заполните данные" for zero values
  test('renders "Заполните данные" for zero values', () => {
    const userInfoWithZeroValues = {
      height: 0,
      weight: 0,
      age: 0,
      info: '',
    };

    render(
      <Router>
        <ProfileShow userInfo={userInfoWithZeroValues} />
      </Router>
    );

    // Check if "Заполните данные" is rendered for zero values
    expect(screen.getByText('Заполните данные')).toBeInTheDocument();
  });

  // Test 3: navigates to "/" when the "Выйти" button is clicked
  test('navigates to "/" when the "Выйти" button is clicked', () => {
    const navigateMock = jest.fn();

    render(
      <Router>
        <ProfileShow userInfo={userInfo} navigate={navigateMock} />
      </Router>
    );

    // Click the "Выйти" button
    fireEvent.click(screen.getByText('Выйти'));

    // Check if navigate function is called with the correct arguments
    expect(navigateMock).toHaveBeenCalledWith('/', { state: {} });
  });
});
