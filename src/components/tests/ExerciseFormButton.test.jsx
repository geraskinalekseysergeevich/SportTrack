import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ExerciseFormButtons from '../ExerciseFormButtons';

describe('ExerciseFormButtons компонент', () => {
  it('должен вызывать функцию сохранения при клике на кнопку "Сохранить"', () => {
    const saveFunc = jest.fn(); // Создаем mock-функцию для сохранения
    render(<ExerciseFormButtons saveFunc={saveFunc} />);
    
    // Находим кнопку "Сохранить" и кликаем на нее
    fireEvent.click(screen.getByText('Сохранить'));
    
    // Проверяем, что функция сохранения была вызвана
    expect(saveFunc).toHaveBeenCalled();
  });

  it('должен вызывать функцию удаления при клике на кнопку с заданным текстом', () => {
    const removeFunc = jest.fn(); // Создаем mock-функцию для удаления
    const buttonText = 'Удалить'; // Задаем текст кнопки
    
    render(<ExerciseFormButtons removeFunc={removeFunc} innerText={buttonText} />);
    
    // Находим кнопку с заданным текстом и кликаем на нее
    fireEvent.click(screen.getByText(buttonText));
    
    // Проверяем, что функция удаления была вызвана
    expect(removeFunc).toHaveBeenCalled();
  });
});