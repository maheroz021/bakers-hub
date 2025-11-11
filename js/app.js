/* --- Baker's Hub Main App JavaScript --- */

document.addEventListener('DOMContentLoaded', () => {

  // --- Core Elements ---
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  const cartIcon = document.getElementById('cart-icon');
  const stickyCart = document.getElementById('sticky-cart');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemCount = document.getElementById('cart-item-count');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalPrice = document.getElementById('cart-total-price');

  const productGrid = document.getElementById('product-grid');
  const menuFilters = document.getElementById('menu-filters');
  const searchBar = document.getElementById('search-bar');

  // --- Cart State ---
  let cart = JSON.parse(localStorage.getItem('bakersHubCart')) || [];

  // --- Mobile Navigation ---
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('is-active');
    });
  }

  // --- Sticky Cart Toggle ---
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      stickyCart.classList.add('show');
    });
  }

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => {
      stickyCart.classList.remove('show');
    });
  }

  // --- Product Rendering (for Menu Page) ---
  const renderProducts = (category = 'all', searchTerm = '') => {
    if (!productGrid) return; // Only run on pages with a product grid

    productGrid.innerHTML = ''; // Clear existing products
    
    let filteredProducts = products;

    // 1. Filter by category
    if (category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    // 2. Filter by search term
    const lowerSearchTerm = searchTerm.trim().toLowerCase();
    if (lowerSearchTerm !== '') {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = '<p>No items found. Try a different search or filter.</p>';
      return;
    }

    filteredProducts.forEach(product => {
      productGrid.appendChild(createProductCard(product));
    });
  };

  // --- Reusable: Create Product Card ---
  // We'll use this for the menu AND the featured section
  const createProductCard = (product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-card__image">
      <div class="product-card__content">
        <h3 class="product-card__title">${product.name}</h3>
        <div class="product-card__info">
          <span class="product-card__price">$${product.price.toFixed(2)}</span>
          <span class="product-card__rating">
            ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
          </span>
        </div>
        <div class="product-card__buttons">
          <button class="btn-add-cart" data-id="${product.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
          <a href="https://wa.me/1234567890?text=I'd like to order the ${product.name}" target="_blank" class="btn-whatsapp">
            <i class="fab fa-whatsapp"></i> Order Now
          </a>
        </div>
      </div>
    `;
    return productCard;
  };

  // --- Product Filtering ---
  if (menuFilters) {
    menuFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        // Update active button
        menuFilters.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        
        // Render products
        const category = e.target.getAttribute('data-category');
        const searchTerm = searchBar ? searchBar.value : ''; // Get current search
        renderProducts(category, searchTerm);
      }
    });
  }

  // --- Product Search ---
  if (searchBar) {
    searchBar.addEventListener('keyup', () => {
      const searchTerm = searchBar.value;
      // Get the currently active category
      const activeCategory = menuFilters.querySelector('.filter-btn.active').getAttribute('data-category');
      renderProducts(activeCategory, searchTerm);
    });
  }

  // --- Cart Logic ---
  const saveCart = () => {
    localStorage.setItem('bakersHubCart', JSON.stringify(cart));
    updateCartUI();
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
    stickyCart.classList.add('show'); // Show cart on add
  };
  
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const cartItem = cart.find(item => item.id === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
      }
    }
    saveCart();
  };

  const updateCartUI = () => {
    if (!cartItemCount) return; // Exit if cart elements aren't on the page

    // Update cart icon count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItemCount.textContent = totalItems;
    
    // Update sticky cart content
    if (totalItems === 0) {
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div>
            <h4 class="cart-item__name">${item.name}</h4>
            <span class="cart-item__price">$${item.price.toFixed(2)}</span>
          </div>
          <div class="cart-item__quantity">
            <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
          </div>
        </div>
      `).join('');
    }
    
    // Update total price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  };
  
  // --- Event Listeners for Dynamic Content ---
  
  // Add to Cart
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart') || e.target.closest('.btn-add-cart')) {
      const button = e.target.closest('.btn-add-cart');
      const productId = button.getAttribute('data-id');
      addToCart(productId);
    }
  });

  // Update Quantity
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('qty-btn')) {
        const productId = e.target.getAttribute('data-id');
        const action = e.target.getAttribute('data-action');
        const cartItem = cart.find(item => item.id === productId);
        
        if (action === 'increase') {
          updateCartQuantity(productId, cartItem.quantity + 1);
        } else if (action === 'decrease') {
          updateCartQuantity(productId, cartItem.quantity - 1);
        }
      }
    });
  }
  
  // --- Form Validation (for Contact & Order pages) ---
  const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    const validateInput = (input) => {
      let isValid = true;
      const errorEl = input.nextElementSibling; // Get the .error-message div
      
      // Reset
      input.classList.remove('invalid');
      if (errorEl) errorEl.style.display = 'none';

      // Check for emptiness
      if (input.required && input.value.trim() === '') {
        isValid = false;
      }
      
      // Check for email type
      if (input.type === 'email' && !/\S+@\S+\.\S+/.test(input.value)) {
        isValid = false;
      }

      if (!isValid) {
        input.classList.add('invalid');
        if (errorEl) errorEl.style.display = 'block';
      }
      
      return isValid;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop form submission
      let isFormValid = true;

      inputs.forEach(input => {
        if (!validateInput(input)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        // --- Form is valid ---
        console.log('Form is valid and ready to submit');
        
        if (formId === 'contact-form') {
          const statusEl = document.getElementById('form-status');
          statusEl.textContent = 'Thank you! Your message has been sent.';
          statusEl.className = 'form-message success';
          statusEl.style.display = 'block';
          form.reset();
        }
        
        if (formId === 'checkout-form') {
          // Clear cart and show success
          localStorage.removeItem('bakersHubCart');
          updateCartUI(); // Update cart everywhere (will be 0)
          document.querySelector('.order-grid').innerHTML = 
            `<h2><span class="script-font">Thank You!</span></h2>
             <p>Your order has been placed successfully. We'll be in touch shortly.</p>
             <a href="index.html" class="btn" style="margin-top: 1rem;">Back to Home</a>`;
        }
        
      } else {
        // --- Form is invalid ---
        if (formId === 'contact-form') {
          const statusEl = document.getElementById('form-status');
          statusEl.textContent = 'Please correct the errors above.';
          statusEl.className = 'form-message error';
          statusEl.style.display = 'block';
        }
      }
    });

    // Validate on blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
    });
  };
  
  // --- Order Page Logic ---
  const loadOrderSummary = () => {
    const summaryItemsEl = document.getElementById('order-summary-items');
    const summaryTotalEl = document.getElementById('order-summary-total');
    
    if (!summaryItemsEl) return; // Only run on order page
    
    if (cart.length === 0) {
      summaryItemsEl.innerHTML = '<p>Your cart is empty. Please add items from the menu.</p>';
      return;
    }
    
    summaryItemsEl.innerHTML = cart.map(item => `
      <div class="order-item">
        <span class="order-item-name">${item.name} <span class="order-item-details">(x${item.quantity})</span></span>
        <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('');
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summaryTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
  };

  /* --- Load Today's Special --- */
  const loadTodaysSpecial = () => {
    // 1. Find the special product
    const specialProduct = products.find(product => product.isSpecial === true);
    const container = document.getElementById('todays-special-container');
    if (!specialProduct || !container) {
      return;
    }
    
    // 4. Create the HTML for the special section
    container.innerHTML = `
      <h2 class="section-title">
        Today's <span class="script-font">Special</span>
      </h2>
      
      <div class="special-grid">
        <img src="${specialProduct.image}" alt="${specialProduct.name}" class="special-image">
        
        <div class="special-content">
          <h2>${specialProduct.name}</h2>
          <span class="script-font">You'll love this!</span>
          <p>${specialProduct.description}</p>
          <div class="special-price">$${specialProduct.price.toFixed(2)}</div>
          <button class="btn btn-add-cart" data-id="${specialProduct.id}">
            <i class="fas fa-shopping-cart"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
  };

  /* --- Load Featured Products (New Function) --- */
  const loadFeaturedProducts = () => {
    // 1. Find all featured products
    const featuredProducts = products.filter(product => product.isFeatured === true);
    
    // 2. Find the container on the homepage
    const container = document.getElementById('featured-products-grid');
    
    // 3. If no container, stop.
    if (!container) {
      return;
    }
    
    // 4. Create the HTML for each featured product
    featuredProducts.forEach(product => {
      container.appendChild(createProductCard(product));
    });
  };
  
  // --- Initial Page Load ---
  const initialSearch = searchBar ? searchBar.value : '';
  const initialCategory = menuFilters ? menuFilters.querySelector('.filter-btn.active').getAttribute('data-category') : 'all';
  
  renderProducts(initialCategory, initialSearch); // Render products on menu page
  updateCartUI(); // Load cart from localStorage
  validateForm('contact-form');
  validateForm('checkout-form');
  loadOrderSummary();
  loadTodaysSpecial(); 
  loadFeaturedProducts(); // <-- ADD THIS LINE
});