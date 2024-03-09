import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import RouterMenu from '../RouterMenu';

// Get the mocked navigate function
const navigateMock = require('react-router-dom').useNavigate;

// Mock window.location.href
const originalNavigate = window.location.href;
window.location.href = 'http://localhost/';

test('renders RouterMenu component', () => {
  render(
    <BrowserRouter>
      <RouterMenu />
    </BrowserRouter>
  );

  // Check if the brand name is rendered
  expect(screen.getByText('Sport Track')).toBeInTheDocument();

  // Check if each navigation link is rendered
  // ...
});

test('navigates to the correct path when a link is clicked', () => {
  const { container } = render(
    <BrowserRouter>
      <RouterMenu />
    </BrowserRouter>
  );

  // Click on the Home link and check if the correct path is navigated to
  const homeLink = container.querySelector('a[href="/home"]');
  expect(homeLink).toBeInTheDocument();
  fireEvent.click(homeLink);
  expect(navigateMock).toHaveBeenCalledWith('/home', { state: { userId: undefined } });

  // Restore the original window.location.href
  window.location.href = originalNavigate;
});
