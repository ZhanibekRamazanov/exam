import React from 'react';
import './MyOrdersPage.css';

// Принимаем myOrders
function MyOrdersPage({ myOrders }) {
  return (
    <div className="my-orders-page">
      <h2>Мои заказы</h2>
      {myOrders.length === 0 ? (
        <p className="my-orders-empty">У вас пока нет оформленных заказов.</p>
      ) : (
        <div className="orders-list">
          {myOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Заказ № {order.id}</h3>
                <p>Дата: {order.date}</p>
              </div>
              <div className="order-items">
                <h4>Товары:</h4>
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={`https://via.placeholder.com/${item.image}`} alt={item.name} className="order-item__image" />
                    <span className="order-item__name">{item.name}</span>
                    <span className="order-item__quantity">x{item.quantity || 1}</span>
                    <span className="order-item__price">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <p className="order-total">Общая сумма: {order.total}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;