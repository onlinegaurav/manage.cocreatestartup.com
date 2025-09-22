import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

type MenuKey = 'Dashboard' | 'Projects' | 'Teams' | 'Settings' | 'Resources' | 'Community' | 'Profile' | 'Support';

interface SidebarProps {
  user: { email: string; picture?: string };
  onMenuSelect: (menu: string) => void;
  selected: string;
  collapsed?: boolean;
}

const ICONS: Record<MenuKey, string> = {
  Dashboard: '/assets/icons/menu/dashboard.svg',
  Projects: '/assets/icons/menu/projects.svg',
  Teams: '/assets/icons/menu/teams.svg',
  Settings: '/assets/icons/menu/settings.svg',
  Resources: '/assets/icons/menu/resources.svg',
  Community: '/assets/icons/menu/community.svg',
  Profile: '/assets/icons/menu/profile.svg',
  Support: '/assets/icons/menu/support.svg',
};

const sections: Array<{ title: string; items: MenuKey[] }> = [
  { title: 'Main', items: ['Dashboard', 'Projects', 'Teams'] },
  { title: 'Workspace', items: ['Settings', 'Resources', 'Community'] },
  { title: 'Account', items: ['Profile', 'Support'] }, // Profile last before Support
];

const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect, selected, collapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(collapsed);
  useEffect(() => { setIsCollapsed(collapsed); }, [collapsed]);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarTop}>
        <button
          type="button"
          className={styles.collapseBtn}
          onClick={() => setIsCollapsed(v => !v)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '»' : '«'}
        </button>
      </div>
      <nav className={styles.menu}>
        <ul className={styles['menu-list']}>
          {sections.map(section => (
            <React.Fragment key={section.title}>
              <li className={styles['menu-section-title']}>{section.title}</li>
              {section.items.map(option => (
                <li key={option} className={styles['menu-item']}>
                  <button
                    className={selected === option ? `${styles['menu-btn']} ${styles['selected']}` : styles['menu-btn']}
                    onClick={() => onMenuSelect(option)}
                    data-testid={`menu-${option.toLowerCase()}`}
                    aria-current={selected === option ? 'page' : undefined}
                  >
                    <span
                      className={styles.menuIcon}
                      style={{ WebkitMaskImage: `url(${ICONS[option]})`, maskImage: `url(${ICONS[option]})` }}
                      aria-hidden="true"
                    />
                    <span className={styles.label}>{option}</span>
                  </button>
                </li>
              ))}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
export {};
