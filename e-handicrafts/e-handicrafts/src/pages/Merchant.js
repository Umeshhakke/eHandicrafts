import React, { useState } from 'react';
import '../Styles/Merchant.css';

function SellerRegister() {
  const [form, setForm] = useState({
    ownerName: '',
    email: '',
    password: '',
    businessName: '',
    phone: '',
    address: '',
    category: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="seller-container">
      <div className="seller-card">

        <h1>Start Your Business</h1>
        <p>Join eHandicrafts and sell your handmade products</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
            <input name="businessName" placeholder="Business Name" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input name="category" placeholder="Business Category (e.g. Handicrafts)" onChange={handleChange} />
          </div>

          <textarea 
            name="address" 
            placeholder="Business Address"
            onChange={handleChange}
            rows="2"
          />

          <textarea 
            name="description" 
            placeholder="Describe your products..."
            onChange={handleChange}
            rows="3"
          />

          <button type="submit">Register Business</button>

        </form>
      </div>
    </div>
  );
}

export default SellerRegister;