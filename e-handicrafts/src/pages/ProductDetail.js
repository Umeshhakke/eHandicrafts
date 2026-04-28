import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import allProducts from '../data/products';
import '../Styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="detail-container">
        <p>Product not found. <Link to="/">Back to shop</Link></p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="detail-container">
      <Link to="/" className="back-link"><i className="fas fa-arrow-left"></i> Back to Shop</Link>
      <div className="product-detail">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span className="reviews">({product.reviews} reviews)</span>
          </div>
          <div className="detail-price">
            <span className="price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount">{product.discount}</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <div className="quantity-control">
            <span>Quantity:</span>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
            <span className="qty-number">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <i className="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;