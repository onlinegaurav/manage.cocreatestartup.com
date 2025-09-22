import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the portal title and AuthForm', () => {
    render(<App />);
    expect(screen.getByText('Manage CoCreateStartup')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('allows login with email', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('login-btn'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('allows signup with email', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('toggle-auth-mode'));
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'newuser@example.com' } });
    fireEvent.click(screen.getByTestId('signup-btn'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('newuser@example.com')).toBeInTheDocument();
  });

  it('allows login with providers', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('provider-google'));
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('google@provider.com')).toBeInTheDocument();
    // Sidebar menu
    expect(screen.getByTestId('menu-profile')).toBeInTheDocument();
  });

  it('navigates to profile page and updates profile', () => {
    render(<App />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'profile@example.com' } });
    fireEvent.click(screen.getByTestId('login-btn'));
    fireEvent.click(screen.getByTestId('menu-profile'));
    expect(screen.getByText('Profile')).toBeInTheDocument();
    const phoneInput = screen.getByLabelText('Phone:');
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.click(screen.getByText('Update Profile'));
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });
});
