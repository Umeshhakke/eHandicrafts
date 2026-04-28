import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../Styles/Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [step, setStep] = useState(1);

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [orderId, setOrderId] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script once (CDN)
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  // Empty cart guard
  if (cartItems.length === 0 && step !== 4) {
    return (
      <div className="checkout-empty">
        <i className="fas fa-shopping-bag"></i>
        <h2>Your cart is empty</h2>
        <Link to="/dashboard" className="back-to-shop">← Back to Shop</Link>
      </div>
    );
  }

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // --- Razorpay Payment Handler ---
  const handleRazorpayPayment = () => {
    if (!razorpayLoaded || !window.Razorpay) {
      alert('Payment gateway is loading. Please wait.');
      return;
    }

    // Use your Razorpay test Key ID (safe for frontend)
    const KEY_ID = 'rzp_test_SUDK0DrM8Ygnv4';  // <-- REPLACE WITH YOUR TEST KEY ID

    const options = {
      key: KEY_ID,
      amount: cartTotal * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'e-HandiCrafts',
      description: 'Handmade Treasures Order',
      image: 'https://your-logo.png', // optional
      handler: function (response) {
        // Payment success
        const generatedOrderId = 'ORD-' + Math.floor(Math.random() * 1000000);
        setOrderId(generatedOrderId);
        setStep(4);
        clearCart();
      },
      prefill: {
        name: address.fullName,
        email: '', // add if you have it
        contact: address.phone,
      },
      notes: {
        address: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
      },
      theme: {
        color: '#c8902a', // your gold
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function (response) {
      alert('Payment failed. Please try again.');
      console.error(response.error);
    });
    razorpay.open();
  };

  return (
    <div className="checkout-container">
      {/* Progress bar unchanged */}
      <div className="checkout-progress">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Order Summary</span>
        </div>
        <div className="progress-line"></div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Address</span>
        </div>
        <div className="progress-line"></div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Payment</span>
        </div>
        <div className="progress-line"></div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>
          <span className="step-number">4</span>
          <span className="step-label">Confirmation</span>
        </div>
      </div>

      <div className="checkout-content">
        {step === 1 && (
          <div className="checkout-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="item-price">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="price-summary">
              <div className="row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
              <div className="row"><span>Shipping</span><span>Free</span></div>
              <div className="row total"><span>Total</span><span>₹{cartTotal}</span></div>
            </div>
            <button className="checkout-btn-primary" onClick={nextStep}>Continue to Address</button>
          </div>
        )}

        {step === 2 && (
          <div className="checkout-section">
            <h2>Delivery Address</h2>
            <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} required />
              </div>
              <div className="form-group">
                <label>Street Address *</label>
                <input type="text" name="street" value={address.street} onChange={handleAddressChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={address.city} onChange={handleAddressChange} required />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input type="text" name="state" value={address.state} onChange={handleAddressChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Zip Code *</label>
                  <input type="text" name="zip" value={address.zip} onChange={handleAddressChange} required />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" name="phone" value={address.phone} onChange={handleAddressChange} required />
                </div>
              </div>
              <div className="btn-group">
                <button type="button" className="btn-secondary" onClick={prevStep}>Back</button>
                <button type="submit" className="checkout-btn-primary">Continue to Payment</button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="checkout-section">
            <h2>Payment</h2>
            <p className="payment-summary">Total Amount: <strong>₹{cartTotal}</strong></p>
            <button
              className="checkout-btn-primary razorpay-btn"
              onClick={handleRazorpayPayment}
              disabled={!razorpayLoaded}
            >
              <i className="fas fa-lock"></i> Pay with Razorpay
            </button>
            <div className="btn-group" style={{ marginTop: '16px' }}>
              <button className="btn-secondary" onClick={prevStep}>Back</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="checkout-section confirmation">
            <div className="confirmation-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order ID is <strong>{orderId}</strong></p>
            <p>A confirmation email will be sent to your registered email.</p>
            <div className="order-recap">
              <h3>Delivery Address</h3>
              <p>{address.fullName}, {address.street}, {address.city}, {address.state} {address.zip}</p>
              <p>Phone: {address.phone}</p>
            </div>
            <Link to="/dashboard" className="checkout-btn-primary">Continue Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;