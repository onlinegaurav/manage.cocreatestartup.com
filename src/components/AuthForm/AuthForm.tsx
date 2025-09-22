import React, { useState } from 'react';
import styles from './AuthForm.module.css';

interface AuthFormProps {
  onAuth: (user: { email: string; picture?: string }) => void;
}

const providerList = [
  { name: 'Google', id: 'google', icon: '/assets/icons/google.svg' },
  { name: 'Microsoft', id: 'microsoft', icon: '/assets/icons/microsoft.svg' },
  { name: 'Apple', id: 'apple', icon: '/assets/icons/apple.svg' },
  { name: 'LinkedIn', id: 'linkedin', icon: '/assets/icons/linkedin.svg' },
];

const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    setError('');
    onAuth({ email });
  };

  const handleProvider = (provider: string) => {
    onAuth({ email: provider + '@provider.com', picture: undefined });
  };

  return (
    <form className={styles['auth-form']} onSubmit={handleSubmit}>
      <input
        data-testid="email-input"
        className={styles['auth-input']}
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit" className={styles['auth-btn']} data-testid={mode === 'login' ? 'login-btn' : 'signup-btn'}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
      <button
        type="button"
        className={styles['auth-toggle']}
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        data-testid="toggle-auth-mode"
      >
        {mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Login'}
      </button>
      <div className={styles['auth-provider-label']}>or continue with</div>
      {providerList.map(p => (
        <button
          key={p.id}
          type="button"
          className={styles['auth-provider-btn']}
          onClick={() => handleProvider(p.id)}
          data-testid={`provider-${p.id}`}
        >
          <img src={p.icon} alt={p.name + ' icon'} style={{ width: 20, height: 20, marginRight: 10, verticalAlign: 'middle' }} />
          {p.name}
        </button>
      ))}
      {error && <div className={styles['auth-error']}>{error}</div>}
    </form>
  );
};

export default AuthForm;

export {};
