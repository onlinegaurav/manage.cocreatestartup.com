import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

jest.mock('../services/authService', () => ({
  loginWithEmail: jest.fn(() => Promise.resolve()),
}));

describe('LoginForm', () => {
  it('renders email input and login button', () => {
    render(<LoginForm />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('shows loading state and calls loginWithEmail on submit', async () => {
    render(<LoginForm />);
    const input = screen.getByTestId('email-input');
    const button = screen.getByTestId('login-button');
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);
    expect(button).toHaveTextContent('Logging in...');
    await waitFor(() => expect(button).toHaveTextContent('Login'));
  });

  it('shows error message on login failure', async () => {
    const { loginWithEmail } = require('../services/authService');
    loginWithEmail.mockImplementationOnce(() => Promise.reject(new Error('fail')));
    render(<LoginForm />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'fail@example.com' } });
    fireEvent.click(screen.getByTestId('login-button'));
    await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
    expect(screen.getByTestId('error-message')).toHaveTextContent('Login failed (stub)');
  });
});

