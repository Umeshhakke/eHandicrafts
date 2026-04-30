import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/RoleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  const handleSelect = (role) => {
    if (role === 'buyer')
    {
      navigate(`/register-buyer?role=${role}`);
    }
    else{
      navigate(`/register-seller?role=${role}`)
    }
  };

  return (
    <div className="role-container">
      <div className="overlay"></div>

      <div className="content">
        <h1>Join eHandicrafts</h1>
        <p>Choose how you want to continue</p>

        <div className="role-cards">

          {/* Buyer Card */}
          <div className="card buyer" onClick={() => handleSelect('buyer')}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png" 
              alt="buyer" 
            />
            <h2>Buyer</h2>
            <p>Discover and purchase unique handmade crafts</p>
          </div>

          {/* Seller Card */}
          <div className="card seller" onClick={() => handleSelect('seller')}>
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2921/2921822.png" 
              alt="seller" 
            />
            <h2>Merchant</h2>
            <p>Start selling your handcrafted products online</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RoleSelect;