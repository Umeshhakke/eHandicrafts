import React, { useEffect, useState } from "react";
import "../Styles/Profile.css";

function ProfilePage() {
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("seller"));
    setSeller(data);
  }, []);

  if (!seller) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-container">

      <h2 className="title">My Profile</h2>

      {/* BASIC INFO */}
      <div className="card">
        <h3>Basic Information</h3>
        <p><b>Owner:</b> {seller.ownerName}</p>
        <p><b>Business:</b> {seller.businessName}</p>
        <p><b>Email:</b> {seller.email}</p>
        <p><b>Phone:</b> {seller.phone}</p>
      </div>

      {/* BUSINESS INFO */}
      <div className="card">
        <h3>Business Details</h3>
        <p><b>Category:</b> {seller.category}</p>
        <p><b>Address:</b> {seller.address}</p>
        <p><b>Description:</b> {seller.description}</p>
      </div>

      {/* PAYMENT INFO */}
      <div className="card">
        <h3>Payment Details</h3>
        <p><b>UPI ID:</b> {seller.upi || "Not Added"}</p>
        <p><b>Bank:</b> ****{seller.bank?.slice(-4) || "XXXX"}</p>
        <p><b>Card:</b> **** **** **** {seller.card?.slice(-4) || "XXXX"}</p>
      </div>

    </div>
  );
}

export default ProfilePage;