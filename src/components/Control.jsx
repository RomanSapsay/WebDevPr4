import React, { useState, useEffect } from 'react';
import './Control.css';

const Control = ({ settings }) => {
  const [robotStatus, setRobotStatus] = useState({
    active: true,
    mode: 'Автоматичний',
    battery: 87,
    position: { x: 5.2, y: 3.8, angle: 45 },
    speed: 0.5,
    lastCommand: null
  });

  const [selectedObject, setSelectedObject] = useState('');
  const [command, setCommand] = useState('');

  const availableObjects = [
    { id: 'person', name: 'Людина' },
    { id: 'box', name: 'Коробка' },
    { id: 'vehicle', name: 'Транспорт' },
    { id: 'obstacle', name: 'Перешкода' },
    { id: 'marker', name: 'Маркер' }
  ];

  const availableCommands = [
    { id: 'approach', name: 'Наблизитись' },
    { id: 'avoid', name: 'Обійти' },
    { id: 'grab', name: 'Захопити' },
    { id: 'track', name: 'Відстежувати' },
    { id: 'scan', name: 'Сканувати' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRobotStatus(prev => ({
        ...prev,
        position: {
          x: Math.round((prev.position.x + (Math.random() - 0.5) * 0.1) * 10) / 10,
          y: Math.round((prev.position.y + (Math.random() - 0.5) * 0.1) * 10) / 10,
          angle: (prev.position.angle + Math.floor(Math.random() * 6 - 3) + 360) % 360
        },
        battery: Math.max(0, prev.battery - 0.05)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCommandSubmit = () => {
    if (selectedObject && command) {
      const objectName = availableObjects.find(obj => obj.id === selectedObject)?.name;
      const commandName = availableCommands.find(cmd => cmd.id === command)?.name;
      
      setRobotStatus(prev => ({
        ...prev,
        lastCommand: `${commandName} → ${objectName}`
      }));

      console.log('Відправка команди до робота:', { object: selectedObject, action: command });
      
      setSelectedObject('');
      setCommand('');
      
      setTimeout(() => {
        setRobotStatus(prev => ({ ...prev, lastCommand: null }));
      }, 5000);
    }
  };

  const handleEmergencyStop = () => {
    setRobotStatus(prev => ({
      ...prev,
      active: false,
      speed: 0,
      lastCommand: 'Аварійна зупинка'
    }));
  };

  const handleRestart = () => {
    setRobotStatus(prev => ({
      ...prev,
      active: true,
      mode: 'Автоматичний',
      speed: 0.5,
      lastCommand: 'Перезапуск системи'
    }));
  };

  return (
    <div className="control">
      <div className="page-header">
        <h1 className="page-title">Керування роботом</h1>
        <p className="page-subtitle">Віддалене керування роботизованою платформою</p>
      </div>

      {/* Статус робота */}
      <div className="status-grid">
        <div className="status-card">
          <div className="status-header">
            <h3>Статус робота</h3>
            {robotStatus.active ? (
              <span className="status-icon">🟢</span>
            ) : (
              <span className="status-icon">🔴</span>
            )}
          </div>
          <div className="status-content">
            <div className="status-item">
              <span>Режим:</span>
              <span className="status-value">{robotStatus.mode}</span>
            </div>
            <div className="status-item">
              <span>Активний:</span>
              <span className={`status-value ${robotStatus.active ? 'text-green-600' : 'text-red-600'}`}>
                {robotStatus.active ? 'Так' : 'Ні'}
              </span>
            </div>
          </div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <h3>Батарея</h3>
            <span className="status-icon">🔋</span>
          </div>
          <div className="battery-display">
            <div className="battery-level">
              <div 
                className="battery-fill"
                style={{ width: `${robotStatus.battery}%` }}
              ></div>
            </div>
            <span className="battery-value">{robotStatus.battery}%</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <h3>Швидкість</h3>
            <span className="status-icon">⚡</span>
          </div>
          <div className="speed-display">
            <div className="speed-value">{robotStatus.speed} м/с</div>
            <div className="speed-label">Поточна швидкість</div>
          </div>
        </div>

        <div className="status-card">
          <div className="status-header">
            <h3>Позиція</h3>
            <span className="status-icon">📍</span>
          </div>
          <div className="position-display">
            <div className="position-item">
              <span>X:</span>
              <span>{robotStatus.position.x}m</span>
            </div>
            <div className="position-item">
              <span>Y:</span>
              <span>{robotStatus.position.y}m</span>
            </div>
            <div className="position-item">
              <span>Кут:</span>
              <span>{robotStatus.position.angle}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Екстрені кнопки */}
      <div className="emergency-controls">
        <button 
          className="btn-emergency"
          onClick={handleEmergencyStop}
        >
          ⚠️ Аварійна зупинка
        </button>
        <button 
          className="btn-restart"
          onClick={handleRestart}
        >
          🔄 Перезапуск
        </button>
      </div>

      {/* Форма відправки команд */}
      <div className="command-form card">
        <h3>📨 Відправити команду</h3>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Цільовий об'єкт</label>
            <select
              value={selectedObject}
              onChange={(e) => setSelectedObject(e.target.value)}
              className="form-select"
            >
              <option value="">Оберіть об'єкт...</option>
              {availableObjects.map(obj => (
                <option key={obj.id} value={obj.id}>
                  {obj.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Дія</label>
            <select
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="form-select"
            >
              <option value="">Оберіть дію...</option>
              {availableCommands.map(cmd => (
                <option key={cmd.id} value={cmd.id}>
                  {cmd.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleCommandSubmit}
          className="btn-primary"
          disabled={!selectedObject || !command}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          🚀 Виконати команду
        </button>
      </div>

      {/* Остання команда */}
      {robotStatus.lastCommand && (
        <div className="command-feedback">
          <span className="feedback-icon">✅</span>
          <span>Команда виконана: {robotStatus.lastCommand}</span>
        </div>
      )}

      {/* Інформація про підключення */}
      <div className="connection-info card">
        <h3>🌐 Інформація про підключення</h3>
        <div className="connection-details">
          <div className="connection-item">
            <span>API робота:</span>
            <span className={settings.robotApiUrl ? 'text-green-600' : 'text-red-600'}>
              {settings.robotApiUrl ? '🟢 Підключено' : '🔴 Не підключено'}
            </span>
          </div>
          <div className="connection-item">
            <span>Останнє оновлення:</span>
            <span>{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="connection-item">
            <span>Затримка:</span>
            <span>~120мс</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Control;