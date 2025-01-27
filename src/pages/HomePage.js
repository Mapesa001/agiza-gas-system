import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h2 className="home-header">Welcome to Agiza Gas System</h2>
      <p className="home-content">Manage gas orders and streamline your business.</p>

      <div className="home-buttons">
        <a href="/orders" className="btn">View Orders</a>
        <a href="/products" className="btn">View Products</a>
      </div>
    </div>
  );
};

export default HomePage;
