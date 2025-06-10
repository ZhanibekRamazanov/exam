import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import './AuthForm.css'; // Общие стили для форм авторизации

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Для перенаправления после входа

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение формы (перезагрузку страницы)
    const success = onLogin(email, password); // Вызываем функцию входа из App.jsx
    if (success) {
      navigate('/'); // Если вход успешен, перенаправляем на главную страницу
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <div className="form-group">
        <label htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="login-password">Пароль:</label>
        <input
          type="password"
          id="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="auth-submit-button">Войти</button>
    </form>
  );
}

export default LoginForm;