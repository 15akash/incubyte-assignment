import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders string calculator heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/string calculator/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders input textarea', () => {
  render(<App />);
  const textareaElement = screen.getByPlaceholderText(/enter any string with numbers/i);
  expect(textareaElement).toBeInTheDocument();
});

test('renders calculate button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/calculate sum/i);
  expect(buttonElement).toBeInTheDocument();
});
