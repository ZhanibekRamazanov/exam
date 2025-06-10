import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css'; // Создадим этот файл стилей

// Принимаем cartItems, onUpdateQuantity, onRemoveItem, onPlaceOrder
function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, onPlaceOrder }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace(' тг', ''));
      return sum + (priceValue * (item.quantity || 1));
    }, 0);
  };

  const handlePlaceOrderClick = () => {
    onPlaceOrder(); // Вызываем функцию оформления заказа
    if (cartItems.length > 0) { // Если корзина была не пуста перед оформлением
      navigate('/my-orders'); // Перенаправляем на "Мои заказы"
    }
  };

  return (
    <div className="cart-page">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty">Ваша корзина пуста.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-card">
                <img src={`https://via.placeholder.com/${item.image}`} alt={item.name} className="cart-item-card__image" />
                <div className="cart-item-info">
                  <h3 className="cart-item-card__name">{item.name}</h3>
                  <p className="cart-item-card__price">{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                  </div>
                  <button
                    className="cart-item-card__remove-button"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Итого:</h3>
            <p className="cart-total-price">{calculateTotal()} тг</p>
            <button className="place-order-button" onClick={handlePlaceOrderClick}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;