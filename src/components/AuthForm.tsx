import React, { useState } from 'react';
import { loginWithEmail, signUpWithEmail, loginWithProvider } from '../services/authService';

const styles = {
  form: {
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    padding: 32,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 16,
    alignItems: 'stretch',
  },
  input: {
    padding: '12px 14px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: 16,
    outline: 'none',
    transition: 'border 0.2s',
  },
  button: {
    padding: '12px 0',
    borderRadius: 4,
    border: 'none',
    background: '#007bff',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginBottom: 4,
  },
  buttonDisabled: {
    background: '#b3d1ff',
    cursor: 'not-allowed',
  },
  error: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'left' as const,
  },
  toggle: {
    background: 'none',
    border: 'none',
    color: '#007bff',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: 14,
    marginTop: 8,
    alignSelf: 'center',
  },
  providerButton: {
    padding: '10px 0',
    borderRadius: 4,
    border: '1px solid #ccc',
    background: '#f5f5f5',
    color: '#333',
    fontWeight: 500,
    fontSize: 15,
    cursor: 'pointer',
    marginBottom: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
};

const PROVIDERS = [
  { id: 'google', label: 'Google', icon: '🔵' },
  { id: 'github', label: 'GitHub', icon: '⚫' },
  { id: 'microsoft', label: 'Microsoft', icon: '🟦' },
  { id: 'apple', label: 'Apple', icon: '⚪' },
];

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await loginWithEmail(email);
        alert('Login successful (stub)');
      } else {
        await signUpWithEmail(email);
        alert('Sign up successful (stub)');
      }
    } catch (err) {
      setError(`${mode === 'login' ? 'Login' : 'Sign up'} failed (stub)`);
    } finally {
      setLoading(false);
    }
  };

  const handleProvider = async (provider: string) => {
    setError(null);
    setLoading(true);
    try {
      await loginWithProvider(provider);
      alert(`Login with ${provider} successful (stub)`);
    } catch (err) {
      setError(`Login with ${provider} failed (stub)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PROVIDERS.map((p) => (
          <button
            type="button"
            key={p.id}
            style={styles.providerButton}
            onClick={() => handleProvider(p.id)}
            disabled={loading}
            data-testid={`provider-${p.id}`}
          >
            <span>{p.icon}</span> Continue with {p.label}
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: '#888', margin: '8px 0' }}>or</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
        data-testid="email-input"
        autoFocus
      />
      <button
        type="submit"
        disabled={loading}
        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        data-testid={mode === 'login' ? 'login-button' : 'signup-button'}
      >
        {loading ? (mode === 'login' ? 'Logging in...' : 'Signing up...') : (mode === 'login' ? 'Login' : 'Sign Up')}
      </button>
      {error && <div style={styles.error} data-testid="error-message">{error}</div>}
      <button
        type="button"
        style={styles.toggle}
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        disabled={loading}
        data-testid="toggle-mode"
      >
        {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
      </button>
    </form>
  );
};

export default AuthForm;

