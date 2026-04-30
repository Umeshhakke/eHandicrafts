import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { CartProvider } from './context/CartContext';

import Register from './pages/Register';
import Role from './pages/RoleSelect';
import Merchant from './pages/Merchant';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Profileb from './pages/Profileb';
import Dashboard from './pages/ProductStore';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import SellerPage from "./pages/SellerPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>

          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/RoleSelect" element={<Role />} />
          <Route path="/register-buyer" element={<Register />} />
          <Route path="/register-seller" element={<Merchant />} />
          <Route path="/profileb" element={<Profileb />} />

          {/* Buyer Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Seller Dashboard (Protected) */}
          <Route path="/seller" element={
              localStorage.getItem("role") === "seller"
                ? <SellerPage />
                : <Navigate to="/login" />
            }
          />

          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;