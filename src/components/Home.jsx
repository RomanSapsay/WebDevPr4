import React from 'react';
import './Home.css';

const Home = () => {
  const stats = [
    { label: 'Активні камери', value: '4', change: '+0', icon: '📹' },
    { label: 'Виявлено об\'єктів', value: '1,247', change: '+12', icon: '🔍' },
    { label: 'Точність системи', value: '94.2%', change: '+0.5%', icon: '🎯' },
    { label: 'Час роботи', value: '12.5г', change: 'стабільно', icon: '⏱️' }
  ];

  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">RoboVision Platform</h1>
        <p className="hero-subtitle">
          Інтеграція роботизованої платформи з системою комп'ютерного зору
        </p>
        <div className="hero-buttons">
          <button 
            className="btn-primary"
            onClick={() => window.location.href = '/detection'}
          >
            ▶️ Почати детекцію
          </button>
          <button 
            className="btn-secondary"
            onClick={() => window.location.href = '/control'}
          >
            🎮 Керування роботом
          </button>
        </div>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-change positive">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
            👁️
          </div>
          <h3>Детекція об'єктів</h3>
          <p>Розпізнавання та класифікація об'єктів у реальному часі з використанням сучасних моделей комп'ютерного зору</p>
          <ul>
            <li>✅ YOLOv5, YOLOv8, EfficientDet</li>
            <li>✅ Візуалізація bounding boxes</li>
            <li>✅ Аналіз впевненості</li>
          </ul>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            🤖
          </div>
          <h3>Керування роботом</h3>
          <p>Взаємодія з роботизованою платформою через REST API та WebSocket з автоматичним уникненням перешкод</p>
          <ul>
            <li>✅ Відправка команд навігації</li>
            <li>✅ Обхід перешкод</li>
            <li>✅ Адаптивне керування</li>
          </ul>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">
            📈
          </div>
          <h3>Аналітика даних</h3>
          <p>Детальна візуалізація результатів роботи системи комп'ютерного зору та статистики продуктивності</p>
          <ul>
            <li>✅ Статистика детекції</li>
            <li>✅ Журнал подій</li>
            <li>✅ Експорт даних</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;