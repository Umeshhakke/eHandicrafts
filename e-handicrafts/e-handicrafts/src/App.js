import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext';      // new
import Register from './pages/Register';
import Role from './pages/RoleSelect';
import Merchant from './pages/Merchant';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Profileb from './pages/Profileb';
import Dashboard from './pages/ProductStore';
import ProductDetail from './pages/ProductDetail';          // new
import Checkout from './pages/Checkout';                    // new
import Dashboard from './pages/Dashboard';
import SellerPage from "./pages/SellerPage";
import { Navigate } from "react-router-dom";


function App() {
  return (
    <Router>

      <CartProvider>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role" element={<Role />} />
          <Route path="/register-buyer" element={<Register />} />
          <Route path="/register-seller" element={<Merchant />} />
          <Route path="/profileb" element={<Profileb />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
=======
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<Role />} />
        <Route path="/register-buyer" element={<Register />} />
        <Route path="/register-seller" element={<Merchant />} />
        <Route path="/profileb" element={<Profileb />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
  path="/seller"
  element={
    localStorage.getItem("role") === "seller" ? (
      <SellerPage />
    ) : (
      <Navigate to="/" />
    )
  }
/>
      </Routes>

    </Router>
  );
}

export default App;