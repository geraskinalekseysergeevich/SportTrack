import React from 'react';
import { render, screen } from '@testing-library/react'; // Импортируем функции render и screen для рендеринга компонентов и поиска элементов
import ExerciseError from '../ExerciseError'; // Импортируем компонент, который мы хотим протестировать
import '@testing-library/jest-dom/extend-expect';

// Тестирование компонента ExerciseError
describe('ExerciseError компонент', () => {
  // Тестирование функции getErrorText
  describe('getErrorText функция', () => {
    it('должна возвращать текст ошибки для ошибки с кодом 1', () => {
      // Рендерим компонент с ошибкой 1
      render(<ExerciseError error={1} />);
      // Проверяем, что компонент рендерит правильный текст ошибки
      expect(screen.getByText('Пустое название тренировки')).toBeInTheDocument();
    });

    it('должна возвращать текст ошибки для ошибки с кодом 2', () => {
      // Рендерим компонент с ошибкой 2
      render(<ExerciseError error={2} />);
      // Проверяем, что компонент рендерит правильный текст ошибки
      expect(screen.getByText('Тренировка с таким названием уже существует')).toBeInTheDocument();
    });

    it('должна возвращать пустую строку для неизвестной ошибки', () => {
      // Рендерим компонент с неизвестной ошибкой (например, error=0)
      render(<ExerciseError error={0} />);
      // Проверяем, что компонент не рендерит элемент с пустым текстом
      expect(() => screen.getByText('')).toThrow();
    });
  });
});