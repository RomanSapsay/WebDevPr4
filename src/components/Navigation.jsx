import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const tabs = [
    { id: 'home', name: 'Головна', icon: '🏠', path: '/' },
    { id: 'detection', name: 'Детекція', icon: '👁', path: '/detection' },
    { id: 'control', name: 'Керування', icon: '🎮', path: '/control' },
    { id: 'analytics', name: 'Аналітика', icon: '📊', path: '/analytics' },
    { id: 'settings', name: 'Налаштування', icon: '⚙️', path: '/settings' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <div className="brand-logo">
          🤖
        </div>
        <div>
          <h1 className="brand-title">RoboVision</h1>
          <p className="brand-subtitle">CV Integration System</p>
        </div>
      </div>
      
      <div className="nav-links">
        {tabs.map(tab => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`nav-link ${location.pathname === tab.path ? 'active' : ''}`}
          >
            <span className="nav-link-icon">{tab.icon}</span>
            <span className="nav-link-text">{tab.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;