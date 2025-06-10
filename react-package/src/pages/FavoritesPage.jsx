import React from 'react';
import './FavoritesPage.css'; // Создадим этот файл стилей

// Принимаем favoriteItems и onRemoveFromFavorite
function FavoritesPage({ favoriteItems, onRemoveFromFavorite }) {
  return (
    <div className="favorites-page">
      <h2>Избранные товары</h2>
      {favoriteItems.length === 0 ? (
        <p className="favorites-empty">У вас пока нет избранных товаров.</p>
      ) : (
        <div className="favorites-grid">
          {favoriteItems.map(item => (
            <div key={item.id} className="favorite-card">
              <img src={`https://via.placeholder.com/${item.image}`} alt={item.name} className="favorite-card__image" />
              <h3 className="favorite-card__name">{item.name}</h3>
              <p className="favorite-card__price">{item.price}</p>
              <button
                className="favorite-card__remove-button"
                onClick={() => onRemoveFromFavorite(item.id)}
              >
                Удалить из избранного
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;