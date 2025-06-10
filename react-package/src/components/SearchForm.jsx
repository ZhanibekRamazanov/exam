import React, { useState } from 'react'; // Импортируем useState
import './SearchForm.css';

function SearchForm({ onSearch }) { // Принимаем onSearch как пропс
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для значения инпута

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    onSearch(searchTerm); // Вызываем функцию поиска из App.jsx
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}> {/* Используем form и onSubmit */}
      <input
        type="text"
        placeholder="Поиск товаров..."
        className="search-form__input"
        value={searchTerm} // Привязываем значение инпута к состоянию
        onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние при изменении
      />
      <button type="submit" className="search-form__button">Найти</button>
    </form>
  );
}

export default SearchForm;