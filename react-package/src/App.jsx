import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ProductList from './components/ProductList';
import AuthPage from './pages/AuthPage';
import MyOrdersPage from './pages/MyOrdersPage';
import CartPage from './pages/CartPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(''); // Пока оставляем, если вдруг понадобится для других целей
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [myOrders, setMyOrders] = useState([]); // Новый стейт для оформленных заказов

  const [products, setProducts] = useState([
    { id: 1, name: 'Название товара 1', price: '1100 тг', image: '150x150' },
    { id: 2, name: 'Название товара 2', price: '1100 тг', image: '150x150' },
    { id: 3, name: 'Название товара 3', price: '1100 тг', image: '150x150' },
    { id: 4, name: 'Название товара 4', price: '1100 тг', image: '150x150' },
    { id: 5, name: 'Название товара 5', price: '1100 тг', image: '150x150' },
    { id: 6, name: 'Название товара 6', price: '1100 тг', image: '150x150' },
    { id: 7, name: 'Название товара 7', price: '1100 тг', image: '150x150' },
    { id: 8, name: 'Название товара 8', price: '1100 тг', image: '150x150' },
    { id: 9, name: 'Кружка', price: '2500 тг', image: '150x150' },
    { id: 10, name: 'Футболка', price: '5000 тг', image: '150x150' },
    { id: 11, name: 'Книга', price: '3000 тг', image: '150x150' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === 'password123') {
      setIsLoggedIn(true);
      setUserEmail(email);
      alert('Вход выполнен успешно!');
      return true;
    } else {
      alert('Неверный email или пароль!');
      return false;
    }
  };

  const handleRegister = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert('Пароли не совпадают!');
      return false;
    }
    alert(`Пользователь ${email} успешно зарегистрирован! Теперь войдите.`);
    return true;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCartItems([]);
    setFavoriteItems([]);
    setMyOrders([]); // Очищаем заказы при выходе
    alert('Вы вышли из системы.');
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert('Для добавления в корзину необходимо войти!');
      return;
    }
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`Товар "${product.name}" добавлен в корзину!`);
  };

  const handleUpdateCartItemQuantity = (productId, newQuantity) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      return prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    alert('Товар удален из корзины.');
  };

  const handleAddToFavorite = (product) => {
    if (!isLoggedIn) {
      alert('Для добавления в избранное необходимо войти!');
      return;
    }
    setFavoriteItems(prevItems => {
      if (prevItems.some(item => item.id === product.id)) {
        alert(`Товар "${product.name}" уже в избранном!`);
        return prevItems;
      }
      return [...prevItems, product];
    });
    alert(`Товар "${product.name}" добавлен в избранное!`);
  };

  const handleRemoveFromFavorite = (productId) => {
    setFavoriteItems(prevItems => prevItems.filter(item => item.id !== productId));
    alert('Товар удален из избранного.');
  };

  // Новая функция для оформления заказа
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert('Корзина пуста. Добавьте товары, прежде чем оформлять заказ!');
      return;
    }

    // Для демонстрации: создаем "заказ" с текущими товарами и датой/временем
    const newOrder = {
      id: Date.now(), // Уникальный ID заказа
      date: new Date().toLocaleString(),
      items: [...cartItems], // Копируем товары из корзины
      total: cartItems.reduce((sum, item) => sum + parseFloat(item.price.replace(' тг', '')) * (item.quantity || 1), 0) + ' тг'
    };

    setMyOrders(prevOrders => [...prevOrders, newOrder]);
    setCartItems([]); // Очищаем корзину после оформления заказа
    alert('Заказ успешно оформлен! Вы можете просмотреть его в разделе "Мои заказы".');
    // Можно перенаправить на страницу "Мои заказы"
    // navigate('/my-orders'); // Если бы это была функция внутри компонента
  };


  const handleSearch = (query) => {
    if (!query) {
      setFilteredProducts(products);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProducts(results);
    if (results.length === 0) {
      alert('По вашему запросу ничего не найдено.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          // Больше не передаем cartItemCount и favoriteItemCount, так как счетчики не нужны
        />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <SearchForm onSearch={handleSearch} />
                <ProductList
                  products={filteredProducts}
                  isLoggedIn={isLoggedIn}
                  onAddToCart={handleAddToCart}
                  onAddToFavorite={handleAddToFavorite}
                />
              </>
            } />
            <Route path="/auth" element={<AuthPage onLogin={handleLogin} onRegister={handleRegister} />} />
            <Route
              path="/my-orders"
              element={isLoggedIn ? <MyOrdersPage myOrders={myOrders} /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/cart"
              element={<CartPage
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateCartItemQuantity}
                onRemoveItem={handleRemoveFromCart}
                onPlaceOrder={handlePlaceOrder} // Передаем функцию оформления заказа
              />}
            />
            <Route
              path="/favorites"
              element={<FavoritesPage
                favoriteItems={favoriteItems}
                onRemoveFromFavorite={handleRemoveFromFavorite}
                // Можно добавить onAddToCartFromFav, если нужно переносить из избранного в корзину
              />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;