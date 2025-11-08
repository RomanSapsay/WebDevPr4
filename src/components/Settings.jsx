import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ settings, setSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(localSettings);
    setHasChanges(false);
    setTimeout(() => {
      alert('✅ Налаштування успішно збережено!');
    }, 500);
  };

  const resetToDefaults = () => {
    setLocalSettings({
      apiUrl: 'http://localhost:5000/api',
      cameraEnabled: true,
      detectionThreshold: 0.7,
      modelType: 'yolov5',
      googleApiKey: '',
      roboflowApiKey: '',
      roboflowModel: 'your-model',
      visionProvider: 'opencv',
      robotApiUrl: 'http://localhost:8080/api',
      confidenceThreshold: 75,
      fps: 30,
      enabledClasses: ['person', 'box', 'vehicle', 'obstacle'],
      autoDetect: false,
      opencvConfidence: 0.6
    });
    setHasChanges(true);
  };

  const objectClasses = [
    { id: 'person', name: 'Людина' },
    { id: 'box', name: 'Коробка' },
    { id: 'vehicle', name: 'Транспорт' },
    { id: 'obstacle', name: 'Перешкода' },
    { id: 'tool', name: 'Інструмент' },
    { id: 'marker', name: 'Маркер' },
    { id: 'animal', name: 'Тварина' },
    { id: 'furniture', name: 'Меблі' }
  ];

  const visionProviders = [
    { id: 'opencv', name: 'OpenCV.js (безкоштовно)' },
    { id: 'tensorflow', name: 'TensorFlow.js (клієнтський)' },
    { id: 'google', name: 'Google Cloud Vision' },
    { id: 'roboflow', name: 'Roboflow' },
    { id: 'clarifai', name: 'Clarifai' }
  ];

  const models = [
    { id: 'yolov5', name: 'YOLOv5' },
    { id: 'yolov8', name: 'YOLOv8' },
    { id: 'faster-rcnn', name: 'Faster R-CNN' },
    { id: 'ssd', name: 'SSD MobileNet' },
    { id: 'efficientdet', name: 'EfficientDet' }
  ];

  return (
    <div className="settings">
      <div className="page-header">
        <h1 className="page-title">Налаштування системи</h1>
        <p className="page-subtitle">Конфігурація параметрів комп'ютерного зору та інтеграції</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Параметри підключення */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🌐</span>
            <h2>Параметри підключення</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>URL API комп'ютерного зору</label>
              <input
                type="url"
                value={localSettings.apiUrl}
                onChange={(e) => handleChange('apiUrl', e.target.value)}
                className="form-input"
                placeholder="http://localhost:5000/api"
              />
            </div>

            <div className="form-group">
              <label>URL API роботизованої платформи</label>
              <input
                type="url"
                value={localSettings.robotApiUrl}
                onChange={(e) => handleChange('robotApiUrl', e.target.value)}
                className="form-input"
                placeholder="http://localhost:8080/api"
              />
            </div>

            <div className="form-group">
              <label>Провайдер комп'ютерного зору</label>
              <select
                value={localSettings.visionProvider}
                onChange={(e) => handleChange('visionProvider', e.target.value)}
                className="form-select"
              >
                {visionProviders.map(provider => (
                  <option key={provider.id} value={provider.id}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Налаштування OpenCV */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🔍</span>
            <h2>Налаштування OpenCV</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="checkbox-label large">
                <input
                  type="checkbox"
                  checked={localSettings.autoDetect || false}
                  onChange={(e) => handleChange('autoDetect', e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <div className="checkbox-content">
                  <span className="checkbox-text">Автоматична детекція з камери</span>
                  <span className="checkbox-description">
                    Виконувати детекцію автоматично кожну секунду при активній камері
                  </span>
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                Мінімальна впевненість детекції: 
                <span className="value-display">
                  {((localSettings.opencvConfidence || 0.6) * 100).toFixed(0)}%
                </span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={(localSettings.opencvConfidence || 0.6) * 100}
                onChange={(e) => handleChange('opencvConfidence', parseInt(e.target.value) / 100)}
                className="form-range"
              />
              <div className="range-labels">
                <span>10%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Параметри розпізнавання */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">👁️</span>
            <h2>Параметри розпізнавання</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>
                Поріг впевненості: 
                <span className="value-display">
                  {(localSettings.detectionThreshold * 100).toFixed(0)}%
                </span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={localSettings.detectionThreshold}
                onChange={(e) => handleChange('detectionThreshold', parseFloat(e.target.value))}
                className="form-range"
              />
              <div className="range-labels">
                <span>10%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="form-group">
              <label>Модель розпізнавання</label>
              <select
                value={localSettings.modelType}
                onChange={(e) => handleChange('modelType', e.target.value)}
                className="form-select"
              >
                {models.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Частота оновлення (FPS)</label>
              <select
                value={localSettings.fps}
                onChange={(e) => handleChange('fps', parseInt(e.target.value))}
                className="form-select"
              >
                <option value="15">15 FPS</option>
                <option value="30">30 FPS</option>
                <option value="60">60 FPS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Класи об'єктів */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">📦</span>
            <h2>Класи об'єктів для виявлення</h2>
          </div>
          
          <div className="classes-grid">
            {objectClasses.map(objClass => (
              <label key={objClass.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={localSettings.enabledClasses.includes(objClass.id)}
                  onChange={(e) => {
                    const newClasses = e.target.checked
                      ? [...localSettings.enabledClasses, objClass.id]
                      : localSettings.enabledClasses.filter(c => c !== objClass.id);
                    handleChange('enabledClasses', newClasses);
                  }}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">{objClass.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* API Ключі */}
        <div className="settings-section">
          <div className="section-header">
            <span className="section-icon">🔑</span>
            <h2>API Ключі та безпека</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Google Cloud Vision API Key</label>
              <input
                type="password"
                value={localSettings.googleApiKey}
                onChange={(e) => handleChange('googleApiKey', e.target.value)}
                className="form-input"
                placeholder="Введіть ваш API ключ"
              />
            </div>

            <div className="form-group">
              <label>Roboflow API Key</label>
              <input
                type="password"
                value={localSettings.roboflowApiKey}
                onChange={(e) => handleChange('roboflowApiKey', e.target.value)}
                className="form-input"
                placeholder="Введіть ваш Roboflow ключ"
              />
            </div>

            <div className="form-group">
              <label>Roboflow Model ID</label>
              <input
                type="text"
                value={localSettings.roboflowModel}
                onChange={(e) => handleChange('roboflowModel', e.target.value)}
                className="form-input"
                placeholder="your-model/1"
              />
            </div>

            <div className="form-group">
              <label>Clarifai API Key</label>
              <input
                type="password"
                value={localSettings.clarifaiApiKey || ''}
                onChange={(e) => handleChange('clarifaiApiKey', e.target.value)}
                className="form-input"
                placeholder="Ваш Clarifai API ключ"
              />
            </div>
          </div>
        </div>

        {/* Додаткові налаштування */}
        <div className="settings-section">
          <div className="section-header">
            <h2>⚙️ Додаткові налаштування</h2>
          </div>
          
          <div className="additional-settings">
            <label className="checkbox-label large">
              <input
                type="checkbox"
                checked={localSettings.cameraEnabled}
                onChange={(e) => handleChange('cameraEnabled', e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <div className="checkbox-content">
                <span className="checkbox-text">Активувати камеру для реального часу</span>
                <span className="checkbox-description">
                  Включити захоплення відео з камери для аналізу в реальному часі
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Кнопки дій */}
        <div className="settings-actions">
          <button
            type="submit"
            className="btn-primary large"
            disabled={!hasChanges}
          >
            💾 Зберегти налаштування
          </button>
          
          <button
            type="button"
            onClick={resetToDefaults}
            className="btn-outline"
          >
            🔄 Скинути до стандартних
          </button>
        </div>
      </form>

      {/* Поточні налаштування */}
      <div className="current-settings">
        <h3>📄 Поточні налаштування</h3>
        <div className="settings-preview">
          <pre>{JSON.stringify(settings, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Settings;