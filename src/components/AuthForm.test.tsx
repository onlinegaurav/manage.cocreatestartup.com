import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthForm from './AuthForm/AuthForm';

jest.mock('../services/authService', () => ({
  loginWithEmail: jest.fn(() => Promise.resolve()),
  signUpWithEmail: jest.fn(() => Promise.resolve()),
  loginWithProvider: jest.fn(() => Promise.resolve()),
}));

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders email input and login button by default', () => {
    render(<AuthForm onAuth={jest.fn()} />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('toggles to sign up mode and back', () => {
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.click(screen.getByTestId('toggle-mode'));
    expect(screen.getByTestId('signup-button')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('toggle-mode'));
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
  });

  it('calls loginWithEmail on login submit', async () => {
    const { loginWithEmail } = require('../services/authService');
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByTestId('login-button'));
    await waitFor(() => expect(loginWithEmail).toHaveBeenCalledWith('test@example.com'));
  });

  it('calls signUpWithEmail on sign up submit', async () => {
    const { signUpWithEmail } = require('../services/authService');
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.click(screen.getByTestId('toggle-mode'));
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'new@example.com' } });
    fireEvent.click(screen.getByTestId('signup-button'));
    await waitFor(() => expect(signUpWithEmail).toHaveBeenCalledWith('new@example.com'));
  });

  it('calls loginWithProvider when provider button is clicked', async () => {
    const { loginWithProvider } = require('../services/authService');
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.click(screen.getByTestId('provider-google'));
    await waitFor(() => expect(loginWithProvider).toHaveBeenCalledWith('google'));
  });

  it('shows error message on login failure', async () => {
    const { loginWithEmail } = require('../services/authService');
    loginWithEmail.mockImplementationOnce(() => Promise.reject(new Error('fail')));
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'fail@example.com' } });
    fireEvent.click(screen.getByTestId('login-button'));
    await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
    expect(screen.getByTestId('error-message')).toHaveTextContent('Login failed (stub)');
  });

  it('shows error message on sign up failure', async () => {
    const { signUpWithEmail } = require('../services/authService');
    signUpWithEmail.mockImplementationOnce(() => Promise.reject(new Error('fail')));
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.click(screen.getByTestId('toggle-mode'));
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'fail@example.com' } });
    fireEvent.click(screen.getByTestId('signup-button'));
    await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
    expect(screen.getByTestId('error-message')).toHaveTextContent('Sign up failed (stub)');
  });

  it('shows error message on provider login failure', async () => {
    const { loginWithProvider } = require('../services/authService');
    loginWithProvider.mockImplementationOnce(() => Promise.reject(new Error('fail')));
    render(<AuthForm onAuth={jest.fn()} />);
    fireEvent.click(screen.getByTestId('provider-github'));
    await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
    expect(screen.getByTestId('error-message')).toHaveTextContent('Login with github failed (stub)');
  });
});
