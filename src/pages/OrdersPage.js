import React, { useState } from 'react';
import axios from 'axios';
import CustomModal from '../components/CustomModal';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]); // Local state for orders
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [formData, setFormData] = useState({
    customer: '',
    product: '',
    quantity: '',
    date: '',
  });

  const handleModalOpen = () => {
    setFormData({ customer: '', product: '', quantity: '', date: '' }); // Reset form
    setShowModal(true); // Open modal
  };

  const handleModalClose = () => {
    setFormData({ customer: '', product: '', quantity: '', date: '' }); // Reset form
    setShowModal(false); // Close modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data
  };

  const handleSaveOrder = async () => {
    // Simple form validation
    if (!formData.customer || !formData.product || !formData.quantity || !formData.date) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:5000/api/orders', formData);
      setOrders([...orders, response.data]); // Update orders in local state
      handleModalClose(); // Close modal
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save the order. Please try again.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders</h2>
      <button className="btn btn-primary mb-3" onClick={handleModalOpen}>
        Add New Order
      </button>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.customer}</td>
                  <td>{order.product}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Modal for adding orders */}
      <CustomModal show={showModal} handleClose={handleModalClose} title="Add New Order">
        <form>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product</label>
            <input
              type="text"
              className="form-control"
              name="product"
              value={formData.product}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary me-2" type="button" onClick={handleModalClose}>
              Close
            </button>
            <button className="btn btn-primary" type="button" onClick={handleSaveOrder}>
              Save Order
            </button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default OrdersPage;
