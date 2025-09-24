import React, { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm/AuthForm';
import Sidebar from './components/Sidebar/Sidebar';
import ProfilePage from './components/ProfilePage/ProfilePage';
import styles from './App.module.css';

interface UserProfile {
  email: string;
  picture?: string;
  phone?: string;
  address?: string;
}

const defaultMenu = 'Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<string>(defaultMenu);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!user) {
    return (
      <div className={styles['auth-bg']}>
        <div className={styles['auth-card']}>
          <div className={styles['auth-card-header']}>
            <img src="/assets/icons/cocreatestartup-logo.svg" alt="CoCreateStartup" className={styles['auth-card-logo']} />
          </div>
          <AuthForm onAuth={setUser} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['app-root']}>
      {/* Header Bar */}
      <header className={styles['header-bar']}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/assets/icons/cocreatestartup-favicon.svg" alt="CoCreateStartup Logo" className={styles['header-left-logo']} />
          <span className={styles['header-title']}>Manage CoCreateStartup</span>
        </div>
        <div className={styles['header-profile']}>
          <button
            type="button"
            className={styles['theme-toggle']}
            onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          <span className={styles['header-profile-email']}>{user.email}</span>
          <img
            src={user.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            alt="Profile"
            className={styles['header-profile-img']}
            data-testid="topright-profile"
          />
        </div>
      </header>
      {/* Main Content Area: Sidebar on the left, main content on the right */}
      <div className={styles['main-content']}>
        <Sidebar user={user} onMenuSelect={setSelectedMenu} selected={selectedMenu} />
        <main className={styles['detail-wrapper']}>
          <div className={styles['detail-pane']}>
            {selectedMenu === 'Profile' ? (
              <ProfilePage user={user} onUpdate={setUser} />
            ) : (
              <>
                <h2 className={styles['detail-title']}>{selectedMenu}</h2>
                <p className={styles['detail-desc']}>Welcome to the {selectedMenu} section.</p>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
