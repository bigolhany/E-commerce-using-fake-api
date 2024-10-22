// API URL
const API_URL = 'https://fakestoreapi.com/products';

// consts
const productList = document.getElementById('product-list');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// Fetch Products
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();
    displayProducts(products);
  } catch (err) {
    console.error(err);
    showError();
  } finally {
    loading.classList.add('d-none');
  }
}

// Display Products in Cards
function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'col-lg-3');

    productCard.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-price">$${product.price}</p>
          <p class="card-rating">
            ${renderStars(product.rating.rate)} (${product.rating.count})
          </p>
        </div>
      </div>
    `;

    productList.appendChild(productCard);
  });
}

// Render Star Ratings
function renderStars(rating) {
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += i < Math.floor(rating) 
      ? '<i class="fas fa-star text-warning"></i>' 
      : '<i class="far fa-star text-warning"></i>';
  }
  return stars;
}

// Show Error Message
function showError() {
  error.classList.remove('d-none');
}

// Initialize Fetching
fetchProducts();
