// ========== ELEMENT SELECTORS ==========
const cartBtn = document.querySelector(".cart-btn");
const cartSidebar = document.querySelector(".cart-sidebar");
const closeModalBtn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");
const modalCard = document.querySelector(".modal-card");
const productGrid = document.querySelector(".grid");
const cartContainer = document.querySelector(".cart-container");
const cartCount = document.querySelector(".cart-count");
const totalPriceEl = document.querySelector(".total-price");

// ========== CART STORAGE ==========
let cart = [];

// ========== PRODUCT PREVIEW MODAL ==========
function openModal(product) {
  modal.classList.add("open");
  modalCard.innerHTML = `
    <img src="${product.image}" alt="${product.title}" style="width:100%;border-radius:10px;">
    <div>
      <h2>${product.title}</h2>
      <p class="muted">${product.desc}</p>
      <h3 style="margin-top:10px;">$${product.price}</h3>
      <button class="btn primary" onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    </div>
  `;
}

function closeModal() {
  modal.classList.remove("open");
}
if (modal) modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) closeModal();
});

// ========== CART FUNCTIONS ==========
function toggleCart() {
  cartSidebar.classList.toggle("open");
  renderCart();
}

function addToCart(product) {
  const exists = cart.find((p) => p.id === product.id);
  if (exists) {
    exists.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter((p) => p.id !== id);
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, p) => sum + p.qty, 0);
  cartCount.textContent = count;
}

function renderCart() {
  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="empty">Your cart is empty 🛒</div>`;
    totalPriceEl.textContent = "$0";
    return;
  }

  cartContainer.innerHTML = cart
    .map(
      (p) => `
    <div class="cart-item">
      <img src="${p.image}" alt="${p.title}">
      <div class="meta">
        <h4>${p.title}</h4>
        <p>$${p.price} × ${p.qty}</p>
      </div>
      <button class="remove" onclick="removeFromCart(${p.id})">✕</button>
    </div>`
    )
    .join("");

  const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  totalPriceEl.textContent = `$${total.toFixed(2)}`;
}

// ========== DUMMY PRODUCTS ==========
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    desc: "Noise cancelling over-ear headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1585386959984-a4155223167d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    title: "Smart Watch",
    desc: "Fitness tracking with heart-rate monitor",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1603791452906-bb8c9eebc35c?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    title: "Sneakers",
    desc: "Comfortable and stylish running shoes",
    price: 74.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    title: "Laptop Bag",
    desc: "Water-resistant, 15-inch capacity",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1606813903175-3b25b6cfa54b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    title: "Wireless Mouse",
    desc: "Ergonomic and fast response",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=400&q=80",
  },
];

// ========== RENDER PRODUCTS ==========
if (productGrid) {
  productGrid.innerHTML = products
    .map(
      (p) => `
    <div class="product">
      <img src="${p.image}" alt="${p.title}">
      <h3 class="p-title">${p.title}</h3>
      <p class="p-desc">${p.desc}</p>
      <div class="p-meta">
        <span class="price">$${p.price}</span>
      </div>
      <div class="add">
        <button class="cart" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        <button class="view" onclick='openModal(${JSON.stringify(p)})'>View</button>
      </div>
    </div>`
    )
    .join("");
}

// ========== EVENT LISTENERS ==========
if (cartBtn) cartBtn.addEventListener("click", toggleCart);
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
