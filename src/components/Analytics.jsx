import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = ({ settings }) => {
  const [analytics, setAnalytics] = useState({
    totalDetections: 1247,
    accuracy: 94.23,
    avgFps: 29,
    uptime: 12.5,
    objectTypes: [
      { name: 'Людина', count: 456, percentage: 37 },
      { name: 'Коробка', count: 389, percentage: 31 },
      { name: 'Транспорт', count: 234, percentage: 19 },
      { name: 'Інше', count: 168, percentage: 13 }
    ],
    recentDetections: [
      { time: '14:23:15', object: 'Людина', camera: 'Камера 1', confidence: 0.95 },
      { time: '14:22:58', object: 'Коробка', camera: 'Камера 2', confidence: 0.88 },
      { time: '14:22:34', object: 'Транспорт', camera: 'Камера 1', confidence: 0.92 },
      { time: '14:21:47', object: 'Людина', camera: 'Камера 3', confidence: 0.87 },
      { time: '14:21:12', object: 'Перешкода', camera: 'Камера 4', confidence: 0.76 }
    ],
    performance: [
      { hour: '08:00', detections: 45, accuracy: 92.15 },
      { hour: '10:00', detections: 67, accuracy: 94.32 },
      { hour: '12:00', detections: 89, accuracy: 95.47 },
      { hour: '14:00', detections: 78, accuracy: 93.21 },
      { hour: '16:00', detections: 82, accuracy: 94.08 }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalDetections: prev.totalDetections + Math.floor(Math.random() * 3),
        uptime: Math.round((prev.uptime + 0.017) * 10) / 10,
        accuracy: Math.min(99.99, parseFloat((prev.accuracy + (Math.random() - 0.5) * 0.2).toFixed(2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="analytics">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1 className="page-title">Аналітика розпізнавання</h1>
            <p className="page-subtitle">Статистика та метрики роботи системи комп'ютерного зору</p>
          </div>
          <button onClick={exportData} className="btn-outline">
            📥 Експорт даних
          </button>
        </div>
      </div>

      {/* Основні метрики */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            👁️
          </div>
          <div className="metric-content">
            <div className="metric-value">{analytics.totalDetections.toLocaleString()}</div>
            <div className="metric-label">Всього виявлено</div>
            <div className="metric-change positive">+12 сьогодні</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            📈
          </div>
          <div className="metric-content">
            {/* Фіксуємо точність до 2 знаків після коми */}
            <div className="metric-value">{analytics.accuracy.toFixed(2)}%</div>
            <div className="metric-label">Точність</div>
            <div className="metric-change positive">+0.15%</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            ⚡
          </div>
          <div className="metric-content">
            <div className="metric-value">{analytics.avgFps}</div>
            <div className="metric-label">FPS середній</div>
            <div className="metric-change neutral">±0</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            ⏱️
          </div>
          <div className="metric-content">
            <div className="metric-value">{analytics.uptime}г</div>
            <div className="metric-label">Час роботи</div>
            <div className="metric-change positive">стабільно</div>
          </div>
        </div>
      </div>

      <div className="analytics-content">
        {/* Розподіл об'єктів */}
        <div className="analytics-card">
          <h3>📊 Розпізнані класи об'єктів</h3>
          <div className="objects-distribution">
            {analytics.objectTypes.map((obj, idx) => (
              <div key={idx} className="distribution-item">
                <div className="distribution-header">
                  <span className="object-name">{obj.name}</span>
                  <span className="object-stats">
                    {obj.count} ({obj.percentage}%)
                  </span>
                </div>
                <div className="distribution-bar">
                  <div
                    className="distribution-fill"
                    style={{ width: `${obj.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Останні виявлення */}
        <div className="analytics-card">
          <h3>🕒 Історія виявлень (остання година)</h3>
          <div className="detections-table">
            <table>
              <thead>
                <tr>
                  <th>Час</th>
                  <th>Об'єкт</th>
                  <th>Камера</th>
                  <th>Впевненість</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentDetections.map((detection, idx) => (
                  <tr key={idx}>
                    <td className="time-cell">{detection.time}</td>
                    <td className="object-cell">
                      <span className="object-badge">{detection.object}</span>
                    </td>
                    <td className="camera-cell">{detection.camera}</td>
                    <td className="confidence-cell">
                      <span className={`confidence-badge ${
                        detection.confidence > 0.8 ? 'high' : 
                        detection.confidence > 0.6 ? 'medium' : 'low'
                      }`}>
                        {/* Фіксуємо впевненість до 2 знаків для таблиці */}
                        {(detection.confidence * 100).toFixed(2)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Продуктивність */}
        <div className="analytics-card">
          <h3>📈 Продуктивність за годинами</h3>
          <div className="performance-chart">
            {analytics.performance.map((item, idx) => (
              <div key={idx} className="performance-item">
                <div className="performance-bar">
                  <div
                    className="performance-fill"
                    style={{ height: `${item.detections}%` }}
                    title={`${item.detections} виявлень`}
                  ></div>
                </div>
                <div className="performance-label">
                  <span>{item.hour}</span>
                  {/* Фіксуємо точність до 2 знаків для графіка */}
                  <span className="performance-accuracy">{item.accuracy.toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Системна інформація */}
        <div className="analytics-card">
          <h3>⚙️ Системна інформація</h3>
          <div className="system-info">
            <div className="info-item">
              <span>Модель:</span>
              <span className="info-value">{settings.modelType}</span>
            </div>
            <div className="info-item">
              <span>Поріг впевненості:</span>
              <span className="info-value">{(settings.detectionThreshold * 100).toFixed(0)}%</span>
            </div>
            <div className="info-item">
              <span>Активні камери:</span>
              <span className="info-value">3/4</span>
            </div>
            <div className="info-item">
              <span>Останнє оновлення:</span>
              <span className="info-value">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;