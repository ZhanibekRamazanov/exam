<template>
  <div id = 'app'>
    <header>
      <div>
        <a href="#">
          <h1>ECOMMERCE</h1>
        </a>
        <div>
          <button @click="toggleCart">
            <img src="./assets/icons/cart.svg" alt="">
          </button>
          <button>
            <img src="" alt="">
          </button>
          <button>
            <img src="" alt="">
          </button>
        </div>
      </div>
    </header>

    <main>
      <form>
        <input type="text"
        >
        <button>

        </button>
      </form>


      <div class="product_list">
        <h2>Все товары</h2>
        <div class="product-grid">
          <div v-for="product in allProducts" :key="product.id">
            <img :src="product.image" :alt="sqsqs" class="">
            <h2>{{ product.title }}</h2>
            <p>{{ product.price }}</p>
            <div class="product-actions">
              <button @click = "addToCart(product)">
                <img src="./assets/icons/plus.svg" alt="">
              </button>
              <button>
                <img src="" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>


    <div class="cart-sidebar-overlay" v-if="isCartVisible" @click.self="toggleCart">
      <div class="cart-sidebar">
        <div>
          <h2>Корзина</h2>
          <button @click = "toggleCart">X</button>
        </div>
        <div v-if="cartItems.length === 0">
          <h1>dobva</h1>
        </div>
        <div v-else>
          <div v-for="item in cartItems" :key="item.id + '-' + item.cartId" class="">
            <img :src="item.image" alt="">
            <h1>{{ item.title }}</h1>
            <p>{{ item.price }}</p>
          </div>
        </div>
                  <div v-if="cartItems.length > 0">
      <button @click = "placeOrder"></button>
    </div>
      </div>
    </div>


  </div>
</template>

<script>
import productsData from './data/clothes/products.json';

export default {
  name: 'App',
  data() {
    return {
      isCartVisible: false,
      allProducts: [],
      cartItems: [],
    };
  },
  mounted(){
    this.allProducts = productsData;
  },
  methods : {
    toggleCart(){
      this.isCartVisible = !this.isCartVisible;
    },
    addToCart(product){
      this.cartItems.push({...product, cartId: Date.now() + Math.random()});
      alert('tovar');
    },
    placeOrder(){
      if (this.cartItems.length === 0){
        alert('ttrtr')
        return;
      }
      alert('sqsq')
      this.cartItems = [];
      this.isCartVisible = false;
    }
  }
}

</script>

<style>

.cart-sidebar-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 999;
}

.cart-sidebar{
  position: relative;
  width: 300px;
  height: 100%;
  background-color: white;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

</style>