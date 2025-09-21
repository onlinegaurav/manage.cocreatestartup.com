import React, { useState } from 'react';
import { loginWithEmail } from '../services/authService';

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
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWithEmail(email);
      alert('Login successful (stub)');
    } catch (err) {
      setError('Login failed (stub)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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
        data-testid="login-button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <div style={styles.error} data-testid="error-message">{error}</div>}
    </form>
  );
};

export default LoginForm;
