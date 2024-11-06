import "./src/assets/css/style.css"

document.querySelector("#app").innerHTML = `
<header>
<h1>Desserts</h1>
</header>
<main>
    <div class="product-list">
      <!-- Продукты будут добавлены здесь -->
    </div>
    <div class="cart">
      <h2>Your Cart (<span class="cart-count">0</span>)</h2>
      <ul class="cart-items">
        <!-- Товары в корзине будут добавлены здесь -->
      </ul>
      <div class="cart-total">
        <span>Order Total</span>
        <span class="total-price">$0.00</span>
      </div>
      <button class="confirm-order">Confirm the order</button>
    </div>
  </main> `;


