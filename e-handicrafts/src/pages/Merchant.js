import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Merchant.css";

function Merchant() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    email: "",
    password: "",
    phone: "",
    category: "",
    address: "",
    description: "",
    upi: "",
    bank: "",
    card: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save seller data
    localStorage.setItem("seller", JSON.stringify(formData));
    localStorage.setItem("role", "seller");

    alert("Business Registered Successfully!");

    navigate("/seller"); // go to dashboard
  };

  return (
    <div className="merchant-container">
      <div className="merchant-card">

        <h2>Start Your Business</h2>
        <p className="subtitle">
          Join eHandicrafts and sell your handmade products
        </p>

        <form onSubmit={handleSubmit} className="merchant-form">

          {/* Row 1 */}
          <div className="form-row">
            <input
              type="text"
              name="ownerName"
              placeholder="Owner Name"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Business Category"
              value={formData.category}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <textarea
            name="address"
            placeholder="Business Address"
            value={formData.address}
            onChange={handleChange}
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe your products..."
            value={formData.description}
            onChange={handleChange}
          />

          {/* Payment Section */}
          <h4 className="section-title">Payment Details</h4>

          <div className="form-row">
            <input
              type="text"
              name="upi"
              placeholder="UPI ID"
              value={formData.upi}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bank"
              placeholder="Bank Account Number"
              value={formData.bank}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="card"
            placeholder="Card Number"
            value={formData.card}
            onChange={handleChange}
          />

          <button type="submit">Register Business</button>

        </form>
      </div>
    </div>
  );
}

export default Merchant;