import React, { useState } from 'react';
import styles from './ProfilePage.module.css';

interface ProfilePageProps {
  user: { email: string; picture?: string; phone?: string; address?: string };
  onUpdate: (user: any) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdate }) => {
  const [form, setForm] = useState({
    picture: user.picture || '',
    email: user.email,
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['profile-form']}>
      <div className={styles['profile-picture-box']}>
        <img
          src={form.picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
          alt="Profile"
          className={styles['profile-picture-img']}
        />
      </div>
      <div className={styles['profile-fields']}>
        <h2 className={styles['profile-title']}>Profile</h2>
        <div className={styles['profile-field']}>
          <label className={styles['profile-label']}>Picture URL:</label>
          <input name="picture" value={form.picture} onChange={handleChange} className={styles['profile-input']} />
        </div>
        <div className={styles['profile-field']}>
          <label className={styles['profile-label']}>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} className={styles['profile-input']} />
        </div>
        <div className={styles['profile-field']}>
          <label className={styles['profile-label']}>Phone:</label>
          <input name="phone" value={form.phone} onChange={handleChange} className={styles['profile-input']} />
        </div>
        <div className={styles['profile-field']}>
          <label className={styles['profile-label']}>Address:</label>
          <input name="address" value={form.address} onChange={handleChange} className={styles['profile-input']} />
        </div>
        <button type="submit" className={styles['profile-btn']}>Update Profile</button>
      </div>
    </form>
  );
};

export default ProfilePage;
