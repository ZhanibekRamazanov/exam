import React from 'react';
import './ProductList.css';

import AddToCartIcon from '../assets/icons/plus.svg';
import AddToFavIcon from '../assets/icons/like.svg';

// Принимаем products, isLoggedIn, onAddToCart, onAddToFavorite
function ProductList({ products, isLoggedIn, onAddToCart, onAddToFavorite }) {

  return (
    <div className="product-list">
      <h2>Все товары</h2>
      <div className="product-grid">
        {products.length > 0 ? ( // Проверяем, есть ли товары для отображения
          products.map(product => (
            <div key={product.id} className="product-card">
              <img src={`https://via.placeholder.com/${product.image}`} alt={product.name} className="product-card__image" />
              <h3 className="product-card__name">{product.name}</h3>
              <p className="product-card__price">{product.price}</p>
              <div className="product-card__actions">
                <button
                  className="product-card__button product-card__button--add-to-cart"
                  onClick={() => onAddToCart(product)} // Вызываем функцию при клике
                  disabled={!isLoggedIn} // Делаем кнопку неактивной, если не авторизован
                  title={!isLoggedIn ? "Войдите, чтобы добавить в корзину" : "Добавить в корзину"}
                >
                  <img src={AddToCartIcon} alt="Добавить в корзину" className="product-card__icon" />
                </button>
                <button
                  className="product-card__button product-card__button--add-to-fav"
                  onClick={() => onAddToFavorite(product)} // Вызываем функцию при клике
                  disabled={!isLoggedIn} // Делаем кнопку неактивной, если не авторизован
                  title={!isLoggedIn ? "Войдите, чтобы добавить в избранное" : "Добавить в избранное"}
                >
                  <img src={AddToFavIcon} alt="Добавить в избранное" className="product-card__icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products-message">Товары не найдены.</p> // Сообщение, если товаров нет
        )}
      </div>
    </div>
  );
}

export default ProductList;