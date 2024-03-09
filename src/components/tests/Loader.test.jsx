import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';
import '@testing-library/jest-dom/extend-expect';

describe('Loader Component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
  });

  it('renders loader container', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toBeInTheDocument();
  });

  it('renders loader element', () => {
    render(<Loader />);
    const loaderElement = screen.getByTestId('loader-element');
    expect(loaderElement).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<Loader />);
    const loaderContainer = screen.getByTestId('loader-container');
    expect(loaderContainer).toHaveClass('loader__container');
    const loaderElement = screen.getByTestId('loader-element');
    expect(loaderElement).toHaveClass('loader');
  });
});
