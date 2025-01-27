import React from 'react';
import './DashboardPage.css';

const DashboardPage = () => {
  const cards = [
    { title: 'Orders', content: 'View and manage orders.', link: '/orders' },
    { title: 'Products', content: 'View and update product information.', link: '/products' },
    { title: 'Reports', content: 'Access detailed reports and analytics.', link: '/reports' },
    { title: 'Settings', content: 'Configure system settings.', link: '/settings' },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <h2 className="card-title">{card.title}</h2>
            <p className="card-content">{card.content}</p>
            <div className="card-action">
              <a href={card.link}>Go to {card.title}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
