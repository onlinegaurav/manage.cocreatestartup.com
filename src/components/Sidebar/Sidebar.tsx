import React from 'react';
import styles from './Sidebar.module.css';

const menuOptions = [
  'Dashboard',
  'Projects',
  'Teams',
  'Profile',
  'Settings',
  'Resources',
  'Community',
  'Support',
];

interface SidebarProps {
  user: { email: string; picture?: string };
  onMenuSelect: (menu: string) => void;
  selected: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect, selected }) => (
  <aside className={styles.sidebar}>
    <nav className={styles.menu}>
      <ul className={styles['menu-list']}>
        {menuOptions.map(option => (
          <li key={option} className={styles['menu-item']}>
            <button
              className={selected === option ? `${styles['menu-btn']} ${styles['selected']}` : styles['menu-btn']}
              onClick={() => onMenuSelect(option)}
              data-testid={`menu-${option.toLowerCase()}`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
export {};
