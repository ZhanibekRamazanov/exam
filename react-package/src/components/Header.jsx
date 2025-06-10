import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

import CartIcon from '../assets/icons/cart.svg';
import LogoutIcon from '../assets/icons/back.svg';
import HeartIcon from '../assets/icons/like.svg';
import OrdersIcon from '../assets/icons/user.svg'; // Добавим иконку для "Моих заказов"

function Header({ isLoggedIn, onLogout }) { // Убрали userEmail и счетчики
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      onLogout();
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__title-link">
          <h1 className="header__title">E-COMMERCE APP</h1>
        </Link>
      </div>
      <div className="header__right">
        {/* Кнопка Корзина */}
        <Link to="/cart" className="header__button header__button--icon header__button--cart">
          <img src={CartIcon} alt="Корзина" className="header__icon" />
          {/* <span className="header__button-text">Корзина</span> Убираем текст по требованию, оставляем только иконку и можно тултип*/}
        </Link>

        {/* Кнопка Избранное */}
        <Link to="/favorites" className="header__button header__button--icon header__button--favorites">
          <img src={HeartIcon} alt="Избранное" className="header__icon" />
          {/* <span className="header__button-text">Избранное</span> */}
        </Link>

        {/* Кнопка Мои заказы - только для авторизованных, с текстом */}
        {isLoggedIn && (
          <Link to="/my-orders" className="header__button header__button--orders">
            <img src={OrdersIcon} alt="Мои заказы" className="header__icon header__icon--small" />
            <span className="header__button-text">Мои заказы</span>
          </Link>
        )}

        {/* Кнопка Вход/Выход */}
        {isLoggedIn ? (
          <button className="header__button header__button--icon header__button--logout" onClick={handleAuthClick}>
            <img src={LogoutIcon} alt="Выход" className="header__icon" />
          </button>
        ) : (
          <button className="header__button header__button--login" onClick={handleAuthClick}>
            Вход
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;