
import { useState } from "react";
import "../App.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { name: "Wooden Vase", price: 499, image: "https://picsum.photos/300?1" },
    { name: "Handmade Bag", price: 799, image: "https://picsum.photos/300?2" },
    { name: "Clay Pot", price: 299, image: "https://picsum.photos/300?3" }
  ];

  const addToCart = (p) => {
    const exist = cart.find(i => i.name === p.name);
    if (exist) {
      setCart(cart.map(i =>
        i.name === p.name ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...p, quantity: 1 }]);
    }
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div>

      {/* NAVBAR */}
      <div className="navbar glass">
        <h2>🛍 Shop</h2>
        <div onClick={() => setShowCart(true)}>
          🛒 {cart.length}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="grid">
        {products.map((p, i) => (
          <div className="card glass" key={i}>
            <img src={p.image} alt="" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* CART */}
      {showCart && (
        <div className="cart-panel open">
          <h2>Your Cart</h2>

          {cart.map((item, i) => (
            <p key={i}>
              {item.name} x {item.quantity}
            </p>
          ))}

          <h3>Total ₹{total}</h3>

          <button onClick={() => setShowCart(false)}>Close</button>
        </div>
      )}

    </div>
  );
}
