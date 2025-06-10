import React, { useState } from 'react';
import LoginForm from '../components/LoginForm'; // Создадим этот компонент
import RegisterForm from '../components/RegisterForm'; // Создадим этот компонент
import './AuthPage.css'; // Создадим этот файл стилей

function AuthPage({ onLogin, onRegister }) {
  const [isLoginMode, setIsLoginMode] = useState(true); // Состояние для переключения между формами

  const toggleMode = () => {
    setIsLoginMode(prevMode => !prevMode); // Переключаем режим
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(true)}
          >
            Вход
          </button>
          <button
            className={`auth-tab ${!isLoginMode ? 'active' : ''}`}
            onClick={() => setIsLoginMode(false)}
          >
            Регистрация
          </button>
        </div>

        {isLoginMode ? (
          <LoginForm onLogin={onLogin} />
        ) : (
          <RegisterForm onRegister={onRegister} />
        )}
      </div>
    </div>
  );
}

export default AuthPage;