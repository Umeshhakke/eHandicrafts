import { useEffect, useState } from "react";
import "../Styles/Dashboard.css";
import sellersData from "../data/sellers";

function SellerPage() {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    setSellers(sellersData);
  }, []);

  return (
    <div className="store-container">

      <header className="store-header">
        <h2>Seller Dashboard</h2>
        <p>Total Sellers: {sellers.length}</p>
      </header>

      <div className="product-grid">
        {sellers.map((seller) => (
          <div className="product-card" key={seller.id}>

            <div className="product-image">
              <img src={seller.productImage} alt={seller.productName} />
            </div>

            <div className="product-info">
              <h4>{seller.productName}</h4>
              <p><b>Seller:</b> {seller.sellerName}</p>
              <p><b>Bank:</b> {seller.bankAccount}</p>
              <p><b>Uploaded:</b> {seller.uploadTime}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default SellerPage;