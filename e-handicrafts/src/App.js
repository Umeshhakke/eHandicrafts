import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import Role from './pages/RoleSelect';
import Merchant from './pages/Merchant';
import Splash from './pages/Splash';
import Login from './pages/Login'; // FIX: Capital L
import Profileb from './pages/Profileb';
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<Role />} />
        <Route path="/register-buyer" element={<Register />} />
        <Route path="/register-seller" element={<Merchant />} />
        <Route path="/profileb" element={<Profileb />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
