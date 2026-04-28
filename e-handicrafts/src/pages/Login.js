import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";   // Link added
import "../Styles/Login.css";
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded credentials (replace with real auth later)
  const VALID_EMAIL = "user@handicraft.com";
  const VALID_PASSWORD = "handmade123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      {/* LEFT SIDE – rotating diamond images */}
      <div className="left">
        <div className="diamond-container">
          <img src={image1} className="diamond d1" alt="img1" />
          <img src={image2} className="diamond d2" alt="img2" />
          <img src={image3} className="diamond d3" alt="img3" />
          <img src={image4} className="diamond d4" alt="img4" />
        </div>
      </div>

      {/* RIGHT SIDE – login form */}
      <div className="right">
        <div className="login-box glass">
          <div className="logo">🪔 eHandicrafts</div>

          <h2>Welcome Back</h2>
          <p>Login to your account</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          {/* Registration link */}
          <p style={{ marginTop: '20px', fontSize: '0.85rem' }}>
            Don't have an account?{" "}
            <Link to="/role" style={{ color: '#c8902a', fontWeight: 600, textDecoration: 'none' }}>
              Register
            </Link>
          </p>

          {/* optional hint (remove later) */}
          <p style={{ fontSize: '0.75rem', marginTop: '8px', opacity: 0.7 }}>
            Demo: {VALID_EMAIL} / {VALID_PASSWORD}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;