// Store Configuration
const STORE_CONFIG = {
  phone: '+966509729530',
  name: 'مؤسسة مزاج الهناء',
  location: 'الرياض - طويق',
  mapUrl: 'https://maps.app.goo.gl/QjLs3uUzsqxrfyyo9?g_st=ic'
};

// Mock Database - Products
let products = [
  {
    id: 1,
    name: 'شيش فضي فاخر',
    category: 'شيش',
    price: 150,
    originalPrice: 200,
    rating: 4.8,
    reviews: 42,
    image: 'images/shisha-1.jpg',
    description: 'شيش فضي عالي الجودة مع تصميم فاخر',
    images: ['images/shisha-1.jpg', 'images/shisha-1-2.jpg', 'images/shisha-1-3.jpg', 'images/shisha-1-4.jpg']
  },
  {
    id: 2,
    name: 'شيش ذهبي كلاسيكي',
    category: 'شيش',
    price: 180,
    originalPrice: 250,
    rating: 4.9,
    reviews: 38,
    image: 'images/shisha-2.jpg',
    description: 'شيش ذهبي كلاسيكي مع زخارف تقليدية جميلة',
    images: ['images/shisha-2.jpg', 'images/shisha-2-2.jpg', 'images/shisha-2-3.jpg', 'images/shisha-2-4.jpg']
  },
  {
    id: 3,
    name: 'شيش إلكترونية ذكية',
    category: 'شيش-الكترونية',
    price: 350,
    originalPrice: 450,
    rating: 4.7,
    reviews: 25,
    image: 'images/electronic-shisha-1.jpg',
    description: 'شيش إلكترونية حديثة مع تحكم ذكي',
    images: ['images/electronic-shisha-1.jpg', 'images/electronic-shisha-1-2.jpg', 'images/electronic-shisha-1-3.jpg', 'images/electronic-shisha-1-4.jpg']
  },
  {
    id: 4,
    name: 'شيش إلكترونية ملونة',
    category: 'شيش-الكترونية',
    price: 320,
    originalPrice: 400,
    rating: 4.6,
    reviews: 20,
    image: 'images/electronic-shisha-2.jpg',
    description: 'شيش إلكترونية ملونة مع إضاءة LED',
    images: ['images/electronic-shisha-2.jpg', 'images/electronic-shisha-2-2.jpg', 'images/electronic-shisha-2-3.jpg', 'images/electronic-shisha-2-4.jpg']
  },
  {
    id: 5,
    name: 'فحم طبيعي سريع الاشتعال',
    category: 'فحم',
    price: 25,
    originalPrice: 35,
    rating: 4.9,
    reviews: 85,
    image: 'images/charcoal-1.jpg',
    description: 'فحم طبيعي عالي الجودة سريع الاشتعال',
    images: ['images/charcoal-1.jpg', 'images/charcoal-1-2.jpg', 'images/charcoal-1-3.jpg', 'images/charcoal-1-4.jpg']
  },
  {
    id: 6,
    name: 'فحم كوكو برميل كبير',
    category: 'فحم',
    price: 80,
    originalPrice: 120,
    rating: 4.8,
    reviews: 60,
    image: 'images/charcoal-2.jpg',
    description: 'فحم كوكو عالي الجودة في برميل كبير',
    images: ['images/charcoal-2.jpg', 'images/charcoal-2-2.jpg', 'images/charcoal-2-3.jpg', 'images/charcoal-2-4.jpg']
  },
  {
    id: 7,
    name: 'معسل تفاح فاخر',
    category: 'معسل',
    price: 45,
    originalPrice: 60,
    rating: 4.9,
    reviews: 120,
    image: 'images/molasses-1.jpg',
    description: 'معسل تفاح بنكهة فاخرة عالية الجودة',
    images: ['images/molasses-1.jpg', 'images/molasses-1-2.jpg', 'images/molasses-1-3.jpg', 'images/molasses-1-4.jpg']
  },
  {
    id: 8,
    name: 'معسل نعناع برستيج',
    category: 'معسل',
    price: 50,
    originalPrice: 70,
    rating: 4.8,
    reviews: 95,
    image: 'images/molasses-2.jpg',
    description: 'معسل نعناع برستيج بنكهة منعشة',
    images: ['images/molasses-2.jpg', 'images/molasses-2-2.jpg', 'images/molasses-2-3.jpg', 'images/molasses-2-4.jpg']
  }
];

// Cart Management
let cart = [];

// Load Products on Page Load
document.addEventListener('DOMContentLoaded', function() {
  loadProducts('all');
  loadCategories();
  loadReviews();
  startVisitorCounter();
  loadCart();
});

// Load and Display Products
function loadProducts(category = 'all') {
  const productsGrid = document.getElementById('products-grid');
  
  if (!productsGrid) return;

  let filteredProducts = products;

  if (category !== 'all') {
    filteredProducts = products.filter(p => p.category === category);
  }

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p class="loading">لا توجد منتجات في هذا القسم</p>';
    return;
  }

  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image" onclick="openProductModal(${product.id})">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name" onclick="openProductModal(${product.id})">${product.name}</h3>
        <div class="product-rating">
          ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating} (${product.reviews})
        </div>
        <div class="product-price">
          <span class="original-price">${product.originalPrice} ﷼</span>
          <span class="final-price">${product.price} ﷼</span>
          <span class="discount-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
        </div>
        <p class="product-description">${product.description}</p>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart"></i> أضف للسلة
          </button>
          <button class="btn-detail" onclick="openProductModal(${product.id})">
            <i class="fas fa-eye"></i> تفاصيل
          </button>
        </div>
      </div>
    </div>
  `).join('');

  updateFilterButtons(category);
}

// Filter Products
function filterProducts(category) {
  loadProducts(category);
}

// Update Filter Buttons
function updateFilterButtons(activeCategory) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  if (activeCategory === 'all') {
    buttons[0].classList.add('active');
  } else {
    buttons.forEach(btn => {
      if (btn.textContent.includes(activeCategory.replace('-الكترونية', ' إلكترونية'))) {
        btn.classList.add('active');
      }
    });
  }
}

// Load Categories
function loadCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  if (!categoriesGrid) return;

  const categories = [
    { name: 'الشيش', category: 'شيش', image: 'images/shisha.jpg' },
    { name: 'شيش إلكترونية', category: 'شيش-الكترونية', image: 'images/electronic-shisha.jpg' },
    { name: 'الفحم', category: 'فحم', image: 'images/charcoal.jpg' },
    { name: 'المعسل', category: 'معسل', image: 'images/molasses.jpg' }
  ];

  categoriesGrid.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="filterProducts('${cat.category}')">
      <img src="${cat.image}" alt="${cat.name}">
      <h3>${cat.name}</h3>
    </div>
  `).join('');
}

// Load Reviews
function loadReviews() {
  // Reviews are already in HTML, just add interactivity if needed
  const reviewsGrid = document.getElementById('reviews-grid');
  if (!reviewsGrid) return;
  
  // Reviews are static for now
}

// Visitor Counter
function startVisitorCounter() {
  let visitors = localStorage.getItem('visitors') || 250;
  visitors = parseInt(visitors);

  const visitorsDisplay = document.getElementById('visitors-display');
  if (visitorsDisplay) {
    visitorsDisplay.textContent = visitors;
  }

  // Increment visitors every hour
  setInterval(() => {
    visitors += Math.floor(Math.random() * 5) + 1;
    localStorage.setItem('visitors', visitors);
    if (visitorsDisplay) {
      visitorsDisplay.textContent = visitors;
    }
  }, 3600000); // 1 hour
}

// Product Modal Functions
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const content = document.getElementById('product-detail-content');

  content.innerHTML = `
    <h2>${product.name}</h2>
    <div class="product-detail-info">
      <img src="${product.image}" alt="${product.name}" class="product-detail-img">
      
      <div class="product-detail-gallery">
        ${(product.images || [product.image]).map((img, idx) => `
          <img src="${img}" alt="صورة ${idx + 1}" class="gallery-img ${idx === 0 ? 'active' : ''}" 
               onclick="changeMainImage('${img}', this)">
        `).join('')}
      </div>

      <h3 class="product-detail-name">${product.name}</h3>
      
      <div class="product-detail-rating">
        ${'⭐'.repeat(Math.floor(product.rating))} ${product.rating} (${product.reviews} تقييم)
      </div>

      <div class="product-detail-price">
        <span class="product-detail-original">${product.originalPrice} ﷼</span>
        <span class="product-detail-final">${product.price} ﷼</span>
      </div>

      <p class="product-detail-description">${product.description}</p>

      <div class="quantity-selector">
        <label for="product-qty">الكمية:</label>
        <input type="number" id="product-qty" value="1" min="1" max="100">
      </div>

      <div class="product-detail-actions">
        <button class="btn-primary" onclick="addToCartFromModal(${product.id})">
          <i class="fas fa-shopping-cart"></i> أضف للسلة
        </button>
        <button class="btn-primary" style="background-color: #25d366;" onclick="whatsappProduct(${product.id})">
          <i class="fab fa-whatsapp"></i> واتس
        </button>
      </div>
    </div>
  `;

  modal.classList.add('show');
}

function changeMainImage(imageSrc, element) {
  const mainImg = document.querySelector('.product-detail-img');
  if (mainImg) {
    mainImg.src = imageSrc;
  }
  
  document.querySelectorAll('.gallery-img').forEach(img => {
    img.classList.remove('active');
  });
  element.classList.add('active');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.remove('show');
}

// Cart Functions
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartCount();
  showNotification(`تم إضافة ${product.name} للسلة`);
}

function addToCartFromModal(productId) {
  const qtyInput = document.getElementById('product-qty');
  const quantity = parseInt(qtyInput.value) || 1;
  addToCart(productId, quantity);
  closeProductModal();
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
  }
}

function openCart() {
  const modal = document.getElementById('cart-modal');
  const cartItems = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">السلة فارغة</p>';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" style="width: 60px; height: 60px; border-radius: 5px; object-fit: cover;">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price} ﷼</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">حذف</button>
      </div>
    `).join('');
  }

  updateCartTotal();
  modal.classList.add('show');
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  modal.classList.remove('show');
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(c => c.id === productId);
  if (item) {
    item.quantity = newQuantity;
    saveCart();
    updateCartCount();
    openCart(); // Refresh cart display
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  openCart(); // Refresh cart display
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    cartTotal.textContent = `الإجمالي: ${total} ﷼`;
  }
}

function checkoutCart() {
  if (cart.length === 0) {
    showNotification('السلة فارغة');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const items = cart.map(item => `${item.name} x ${item.quantity}`).join(', ');
  
  const message = `السلام عليكم، أريد شراء:\n${items}\nالإجمالي: ${total} ﷼`;
  
  const whatsappUrl = `https://wa.me/966509729530?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Cart Storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

// Admin Panel Functions
function openAdminLogin() {
  const modal = document.getElementById('admin-modal');
  modal.classList.add('show');
}

function closeAdminLogin() {
  const modal = document.getElementById('admin-modal');
  modal.classList.remove('show');
}

function loginAdmin(event) {
  event.preventDefault();

  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  if (username === 'mzag' && password === 'mzag') {
    localStorage.setItem('adminLoggedIn', 'true');
    closeAdminLogin();
    openAdminPanel();
  } else {
    const errorMsg = document.getElementById('login-error');
    errorMsg.textContent = 'بيانات الدخول غير صحيحة';
  }
}

function openAdminPanel() {
  // Create admin panel if it doesn't exist
  if (!document.getElementById('admin-panel')) {
    const adminPanel = document.createElement('div');
    adminPanel.id = 'admin-panel';
    adminPanel.innerHTML = `
      <div style="position: fixed; top: 0; right: 0; width: 100%; height: 100%; background: white; z-index: 2000; overflow-y: auto;">
        <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h1>لوحة التحكم</h1>
            <button onclick="closeAdminPanel()" style="padding: 10px 20px; background: red; color: white; border: none; border-radius: 5px; cursor: pointer;">
              <i class="fas fa-sign-out-alt"></i> تسجيل الخروج
            </button>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <button onclick="showProductManagement()" style="padding: 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
              <i class="fas fa-box"></i> إدارة المنتجات
            </button>
            <button onclick="showOrderManagement()" style="padding: 20px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
              <i class="fas fa-shopping-bag"></i> الطلبات
            </button>
            <button onclick="showStatistics()" style="padding: 20px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">
              <i class="fas fa-chart-bar"></i> الإحصائيات
            </button>
          </div>

          <div id="admin-content">
            <h2>مرحبا بك في لوحة التحكم</h2>
            <p>اختر أحد الخيارات أعلاه لبدء الإدارة</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(adminPanel);
  }
}

function closeAdminPanel() {
  localStorage.removeItem('adminLoggedIn');
  const panel = document.getElementById('admin-panel');
  if (panel) {
    panel.remove();
  }
}

function showProductManagement() {
  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <h2>إدارة المنتجات</h2>
    
    <div style="margin: 20px 0;">
      <button onclick="showAddProduct()" style="padding: 10px 20px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer;">
        <i class="fas fa-plus"></i> إضافة منتج جديد
      </button>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">اسم المنتج</th>
          <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">القسم</th>
          <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">السعر</th>
          <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">التقييم</th>
          <th style="padding: 10px; text-align: right; border: 1px solid #ddd;">الإجراءات</th>
        </tr>
      </thead>
      <tbody>
        ${products.map(p => `
          <tr style="border: 1px solid #ddd;">
            <td style="padding: 10px; border: 1px solid #ddd;">${p.name}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.category}</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.price} ﷼</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${p.rating} ⭐</td>
            <td style="padding: 10px; border: 1px solid #ddd;">
              <button onclick="editProduct(${p.id})" style="padding: 5px 10px; background: #3498db; color: white; border: none; border-radius: 3px; cursor: pointer; margin-right: 5px;">
                تعديل
              </button>
              <button onclick="deleteProduct(${p.id})" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer;">
                حذف
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function showAddProduct() {
  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <h2>إضافة منتج جديد</h2>
    <form onsubmit="saveNewProduct(event)" style="max-width: 600px;">
      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">اسم المنتج</label>
        <input type="text" id="product-name" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">القسم</label>
        <select id="product-category" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <option value="شيش">شيش</option>
          <option value="شيش-الكترونية">شيش إلكترونية</option>
          <option value="فحم">فحم</option>
          <option value="معسل">معسل</option>
        </select>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">السعر الأصلي</label>
          <input type="number" id="product-original-price" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">السعر بعد الخصم</label>
          <input type="number" id="product-price" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">الوصف</label>
        <textarea id="product-description" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 100px;"></textarea>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">صورة المنتج</label>
        <input type="file" id="product-image" accept="image/*" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">عدد التقييمات (1-50)</label>
        <input type="number" id="product-reviews" min="1" max="50" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">التقييم (1-5)</label>
        <input type="number" id="product-rating" min="1" max="5" step="0.1" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>

      <button type="submit" style="padding: 10px 20px; background: #2ecc71; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%;">
        <i class="fas fa-save"></i> حفظ المنتج
      </button>
      <button type="button" onclick="showProductManagement()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; margin-top: 10px;">
        إلغاء
      </button>
    </form>
  `;
}

function saveNewProduct(event) {
  event.preventDefault();

  const newProduct = {
    id: Math.max(...products.map(p => p.id), 0) + 1,
    name: document.getElementById('product-name').value,
    category: document.getElementById('product-category').value,
    originalPrice: parseInt(document.getElementById('product-original-price').value),
    price: parseInt(document.getElementById('product-price').value),
    description: document.getElementById('product-description').value,
    image: 'images/placeholder.jpg',
    rating: parseFloat(document.getElementById('product-rating').value),
    reviews: parseInt(document.getElementById('product-reviews').value),
    images: ['images/placeholder.jpg']
  };

  products.push(newProduct);
  showNotification('تم إضافة المنتج بنجاح');
  showProductManagement();
}

function editProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <h2>تعديل المنتج: ${product.name}</h2>
    <form onsubmit="saveEditProduct(event, ${productId})" style="max-width: 600px;">
      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">اسم المنتج</label>
        <input type="text" id="edit-product-name" value="${product.name}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">السعر الأصلي</label>
          <input type="number" id="edit-original-price" value="${product.originalPrice}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">السعر بعد الخصم</label>
          <input type="number" id="edit-price" value="${product.price}" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
        </div>
      </div>

      <div style="margin: 15px 0;">
        <label style="display: block; margin-bottom: 5px; font-weight: bold;">الوصف</label>
        <textarea id="edit-description" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; min-height: 100px;">${product.description}</textarea>
      </div>

      <button type="submit" style="padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%;">
        <i class="fas fa-save"></i> حفظ التعديلات
      </button>
      <button type="button" onclick="showProductManagement()" style="padding: 10px 20px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; margin-top: 10px;">
        إلغاء
      </button>
    </form>
  `;
}

function saveEditProduct(event, productId) {
  event.preventDefault();

  const product = products.find(p => p.id === productId);
  if (product) {
    product.name = document.getElementById('edit-product-name').value;
    product.originalPrice = parseInt(document.getElementById('edit-original-price').value);
    product.price = parseInt(document.getElementById('edit-price').value);
    product.description = document.getElementById('edit-description').value;
    showNotification('تم تعديل المنتج بنجاح');
  }

  showProductManagement();
}

function deleteProduct(productId) {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    products = products.filter(p => p.id !== productId);
    showNotification('تم حذف المنتج بنجاح');
    showProductManagement();
  }
}

function showOrderManagement() {
  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <h2>الطلبات</h2>
    <p style="color: #666; margin-top: 20px;">الطلبات المُرسلة عبر الواتس ستظهر هنا. حالياً لا توجد طلبات.</p>
    <p style="color: #999; font-size: 14px; margin-top: 10px;">تطبيق Copilot متكامل سيتم إضافة نظام إدارة الطلبات الكامل قريباً</p>
  `;
}

function showStatistics() {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * Math.random() * 10), 0);

  const content = document.getElementById('admin-content');
  content.innerHTML = `
    <h2>الإحصائيات</h2>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
      <div style="background: #3498db; color: white; padding: 20px; border-radius: 5px;">
        <h3>عدد المنتجات</h3>
        <p style="font-size: 32px; font-weight: bold; margin-top: 10px;">${totalProducts}</p>
      </div>

      <div style="background: #2ecc71; color: white; padding: 20px; border-radius: 5px;">
        <h3>الزائرون</h3>
        <p style="font-size: 32px; font-weight: bold; margin-top: 10px;">${localStorage.getItem('visitors') || 250}</p>
      </div>

      <div style="background: #e74c3c; color: white; padding: 20px; border-radius: 5px;">
        <h3>إجمالي الأقسام</h3>
        <p style="font-size: 32px; font-weight: bold; margin-top: 10px;">4</p>
      </div>

      <div style="background: #f39c12; color: white; padding: 20px; border-radius: 5px;">
        <h3>التقييم الكلي</h3>
        <p style="font-size: 32px; font-weight: bold; margin-top: 10px;">4.8 ⭐</p>
      </div>
    </div>

    <div style="margin-top: 30px;">
      <h3>توزيع المنتجات حسب القسم</h3>
      <ul style="margin-top: 15px;">
        ${['شيش', 'شيش-الكترونية', 'فحم', 'معسل'].map(cat => {
          const count = products.filter(p => p.category === cat).length;
          const percent = (count / totalProducts * 100).toFixed(1);
          return `<li style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px;">
            <strong>${cat}</strong>: ${count} منتج (${percent}%)
            <div style="background: #ddd; height: 20px; border-radius: 3px; margin-top: 5px; overflow: hidden;">
              <div style="background: #3498db; height: 100%; width: ${percent}%; transition: width 0.3s;"></div>
            </div>
          </li>`;
        }).join('')}
      </ul>
    </div>
  `;
}

// Contact Functions
function callStore() {
  window.location.href = `tel:${STORE_CONFIG.phone}`;
}

function whatsappStore() {
  const message = `السلام عليكم، أريد التواصل مع مؤسسة مزاج الهناء`;
  window.open(`https://wa.me/966509729530?text=${encodeURIComponent(message)}`, '_blank');
}

function whatsappProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const message = `السلام عليكم، أريد الاستفسار عن منتج:\n${product.name}\nالسعر: ${product.price} ﷼`;
  window.open(`https://wa.me/966509729530?text=${encodeURIComponent(message)}`, '_blank');
}

// Notification System
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: #27ae60;
    color: white;
    padding: 15px 20px;
    border-radius: 5px;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
  const cartModal = document.getElementById('cart-modal');
  const adminModal = document.getElementById('admin-modal');
  const productModal = document.getElementById('product-modal');

  if (cartModal && event.target === cartModal) {
    cartModal.classList.remove('show');
  }
  if (adminModal && event.target === adminModal) {
    adminModal.classList.remove('show');
  }
  if (productModal && event.target === productModal) {
    productModal.classList.remove('show');
  }
});