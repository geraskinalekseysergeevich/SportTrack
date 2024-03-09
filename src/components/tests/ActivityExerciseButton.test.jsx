import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Для расширенных сопоставлений

import ActivityExerciseButton from '../ActivityExerciseButton';

describe('ActivityExerciseButton component', () => {
  test('renders with correct text', () => {
    // Рендерим компонент с указанным текстом
    render(<ActivityExerciseButton innerText="Test Button" />);
    // Проверяем, что текст кнопки отображается корректно
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  test('calls setActiveTabFunc when clicked', () => {
    // Создаем мок функции setActiveTabFunc
    const setActiveTabFuncMock = jest.fn();
    // Рендерим компонент с мок функцией и активной вкладкой
    render(
      <ActivityExerciseButton setActiveTabFunc={setActiveTabFuncMock} activeTab="test" innerText="Test Button" />
    );

    // Нажимаем на кнопку
    fireEvent.click(screen.getByText('Test Button'));
    // Проверяем, что функция setActiveTabFunc была вызвана с правильными аргументами
    expect(setActiveTabFuncMock).toHaveBeenCalledWith('test');
  });
});