import React, { useState } from 'react';
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

  if (!user) {
    return (
      <div className={styles['auth-bg']}>
        <div className={styles['auth-card']}>
          <h1 className={styles['auth-title']}>Manage CoCreateStartup</h1>
          <AuthForm onAuth={setUser} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles['app-root']}>
      {/* Header Bar */}
      <header className={styles['header-bar']}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <img src="/assets/icons/cocreatestartup-logo.svg" alt="CoCreateStartup Logo" style={{ height: 36, marginRight: 18 }} />
        </div>
        <div className={styles['header-profile']}>
          <span className={styles['header-profile-email']}>{user.email}</span>
          <img
            src={user.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
            alt="Profile"
            className={styles['header-profile-img']}
            data-testid="topright-profile"
          />
        </div>
      </header>
      {/* Main Content Area */}
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
