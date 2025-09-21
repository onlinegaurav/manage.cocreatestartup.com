import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Test for the portal title and AuthForm elements

describe('App', () => {
  it('renders the portal title', () => {
    render(<App />);
    expect(screen.getByText('Manage CoCreateStartup')).toBeInTheDocument();
  });

  it('renders the email input field', () => {
    render(<App />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('renders provider login buttons', () => {
    render(<App />);
    expect(screen.getByTestId('provider-google')).toBeInTheDocument();
    expect(screen.getByTestId('provider-github')).toBeInTheDocument();
    expect(screen.getByTestId('provider-microsoft')).toBeInTheDocument();
    expect(screen.getByTestId('provider-apple')).toBeInTheDocument();
  });
});
