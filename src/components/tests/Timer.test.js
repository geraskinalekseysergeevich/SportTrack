import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Timer from '../Timer';
import '@testing-library/jest-dom';


describe('Timer component', () => {
  const mockFormatTimeFunc = jest.fn().mockReturnValue('00:00:00');
  const mockStartStopFunc = jest.fn();
  const mockResetFunc = jest.fn();

  test('renders Timer component', () => {
    const { getByText } = render(<Timer formatTimeFunc={mockFormatTimeFunc} />);
    const timeElement = getByText('Время:');
    expect(timeElement).toBeInTheDocument();
  });

  test('displays start icon when not running', () => {
    const { getByAltText } = render(<Timer intervalId={null} formatTimeFunc={mockFormatTimeFunc} />);
    const startIcon = getByAltText('start');
    expect(startIcon).toBeInTheDocument();
  });

  test('displays pause icon when running', () => {
    const { getByAltText } = render(<Timer intervalId={123} formatTimeFunc={mockFormatTimeFunc} />);
    const pauseIcon = getByAltText('pause');
    expect(pauseIcon).toBeInTheDocument();
  });

  test('calls startStopFunc when clicking on icons__container', () => {
    const { getByAltText } = render(<Timer startStopFunc={mockStartStopFunc} formatTimeFunc={mockFormatTimeFunc} />);
    const iconsContainer = getByAltText('start').parentElement;
    fireEvent.click(iconsContainer);
    expect(mockStartStopFunc).toHaveBeenCalledTimes(1);
  });

  test('displays stop icon when not running', () => {
    const { getByAltText } = render(<Timer intervalId={null} formatTimeFunc={mockFormatTimeFunc} />);
    const stopIcon = getByAltText('stop');
    expect(stopIcon).toBeInTheDocument();
  });

  test('calls resetFunc when clicking on icons__container', () => {
    const { getByAltText } = render(<Timer resetFunc={mockResetFunc} formatTimeFunc={mockFormatTimeFunc} />);
    const iconsContainer = getByAltText('stop').parentElement;
    fireEvent.click(iconsContainer);
    expect(mockResetFunc).toHaveBeenCalledTimes(1);
  });
});
