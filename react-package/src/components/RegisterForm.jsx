import React, { useState } from 'react';
import './AuthForm.css'; // Общие стили для форм авторизации

function RegisterForm({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызываем функцию регистрации из App.jsx
    const success = onRegister(email, password, confirmPassword);
    if (success) {
      // Если регистрация успешна, можно очистить поля или перенаправить на страницу входа
      // Для этого экзамена, просто очистим поля и дадим сообщение через alert из App.jsx
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      // Дополнительно: можно было бы автоматически переключиться на режим входа в AuthPage
      // Для этого AuthPage должен передать функцию для переключения режима
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      <div className="form-group">
        <label htmlFor="register-email">Email:</label>
        <input
          type="email"
          id="register-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="register-password">Пароль:</label>
        <input
          type="password"
          id="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Подтвердите пароль:</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="auth-submit-button">Зарегистрироваться</button>
    </form>
  );
}

export default RegisterForm;