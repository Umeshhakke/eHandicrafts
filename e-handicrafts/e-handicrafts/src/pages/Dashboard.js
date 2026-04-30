import React, { useState } from 'react';
import '../Styles/Dashboard.css';

// Sample handmade products
const allProducts = [
  {
    id: 1,
    name: 'Handwoven Macrame Wall Hanging',
    category: 'Home Decor',
    price: 1299,
    originalPrice: 1999,
    discount: '35% off',
    rating: 4.8,
    reviews: 214,
    image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?q=80&w=300&auto=format',
  },
  {
    id: 2,
    name: 'Terracotta Coffee Mug (Set of 2)',
    category: 'Kitchenware',
    price: 899,
    originalPrice: 1199,
    discount: '25% off',
    rating: 4.6,
    reviews: 157,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=300&auto=format',
  },
  {
    id: 3,
    name: 'Beaded Dreamcatcher',
    category: 'Home Decor',
    price: 649,
    originalPrice: 899,
    discount: '28% off',
    rating: 4.9,
    reviews: 88,
    image: 'https://images.unsplash.com/photo-1604881991720-f91ada269799?q=80&w=300&auto=format',
  },
  {
    id: 4,
    name: 'Hand-painted Silk Scarf',
    category: 'Fashion',
    price: 1499,
    originalPrice: 2499,
    discount: '40% off',
    rating: 4.7,
    reviews: 136,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=300&auto=format',
  },
  {
    id: 5,
    name: 'Wooden Spice Box (Masala Dabba)',
    category: 'Kitchenware',
    price: 2199,
    originalPrice: 2999,
    discount: '27% off',
    rating: 4.5,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1607274134639-0432b7f9ff08?q=80&w=300&auto=format',
  },
  {
    id: 6,
    name: 'Handmade Jute Basket (Set of 3)',
    category: 'Home Decor',
    price: 1499,
    originalPrice: 1899,
    discount: '21% off',
    rating: 4.4,
    reviews: 72,
    image: 'https://images.unsplash.com/photo-1611486212557-88be5ff6f13a?q=80&w=300&auto=format',
  },
  {
    id: 7,
    name: 'Resin Art Coasters (6 pcs)',
    category: 'Home Decor',
    price: 799,
    originalPrice: 1099,
    discount: '27% off',
    rating: 4.3,
    reviews: 58,
    image: 'https://images.unsplash.com/photo-1615873968403-89e0685d8a96?q=80&w=300&auto=format',
  },
  {
    id: 8,
    name: 'Handloom Cotton Kantha Quilt',
    category: 'Fashion',
    price: 1899,
    originalPrice: 3299,
    discount: '42% off',
    rating: 4.8,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1558618616-67d2ffa9e4d8?q=80&w=300&auto=format',
  },
];

const categories = ['All', 'Home Decor', 'Kitchenware', 'Fashion'];

const ProductStore = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart logic
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="store-container">
      {/* Header */}
      <header className="store-header">
        <div className="header-left">
          <i className="fas fa-store-alt store-logo"></i>
          <span className="brand-name">e-HandiCrafts</span>
        </div>

        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search for handmade treasures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="header-right">
          <button className="cart-btn" onClick={() => setCartOpen(!cartOpen)}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Category Filter Pills */}
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content: Product Grid & Cart Sidebar */}
      <div className="main-layout">
        <section className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="discount-tag">{product.discount}</span>
                </div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <div className="price-row">
                    <span className="price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <div className="rating">
                    <span className="stars">
                      {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                  <button className="add-to-cart" onClick={() => addToCart(product)}>
                    <i className="fas fa-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="fas fa-box-open"></i>
              <p>No products found. Try a different search or category.</p>
            </div>
          )}
        </section>

        {/* Cart Sidebar (overlay) */}
        <div className={`cart-sidebar ${cartOpen ? 'open' : ''}`}>
          <div className="cart-header">
            <h3>Shopping Cart ({cartCount})</h3>
            <button className="close-cart" onClick={() => setCartOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">₹{item.price} x {item.quantity}</p>
                    <div className="qty-control">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>₹{cartTotal}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          )}
        </div>
        {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>}
      </div>
    </div>
  );
};

export default ProductStore;