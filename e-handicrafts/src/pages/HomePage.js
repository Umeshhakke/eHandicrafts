import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import allProducts from '../data/products';
import '../ProductStore.css'; // same CSS file

const categories = ['All', 'Home Decor', 'Kitchenware', 'Fashion'];

const HomePage = () => {
  const { addToCart, cartCount, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="store-container">
      {/* Header */}
      <header className="store-header">
        <Link to="/" className="header-left" style={{ textDecoration: 'none', color: 'inherit' }}>
          <i className="fas fa-store-alt store-logo"></i>
          <span className="brand-name">HandmadeHub</span>
        </Link>
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

      {/* Category Pills */}
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

      {/* Product Grid */}
      <div className="main-layout">
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              {/* Clickable area linking to detail page */}
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                    <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                </div>
              </Link>
              {/* Add to Cart button outside the link */}
              <div className="product-info" style={{ paddingTop: 0 }}>
                <button className="add-to-cart" onClick={() => addToCart(product)}>
                  <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <i className="fas fa-box-open"></i>
              <p>No products found. Try a different search or category.</p>
            </div>
          )}
        </section>

        {/* Cart Sidebar */}
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

export default HomePage;