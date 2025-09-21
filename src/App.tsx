import React from 'react';
import AuthForm from './components/AuthForm';

const App: React.FC = () => (
  <div style={{ maxWidth: 400, margin: '40px auto', textAlign: 'center' }}>
    <h1>Manage CoCreateStartup</h1>
    <AuthForm />
  </div>
);

export default App;
