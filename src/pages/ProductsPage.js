import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch existing products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or edit a product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !stock) {
      setMessage('All fields are required!');
      return;
    }

    try {
      if (editMode) {
        // Update an existing product
        const response = await axios.put(`http://localhost:5000/api/products/${editId}`, {
          name,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
        });
        setMessage(response.data.message || 'Product updated successfully!');
      } else {
        // Add a new product
        const response = await axios.post('http://localhost:5000/api/products', {
          name,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
        });
        setMessage(response.data.message || 'Product added successfully!');
      }

      setName('');
      setPrice('');
      setStock('');
      setEditMode(false);
      setEditId(null);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error(editMode ? 'Failed to update product:' : 'Failed to add product:', error);
      setMessage('Failed to process the request. Please try again.');
    }
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMessage(response.data.message || 'Product deleted successfully!');
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error('Failed to delete product:', error);
      setMessage('Failed to delete product. Please try again.');
    }
  };

  // Start editing a product
  const handleEdit = (product) => {
    setEditMode(true);
    setEditId(product.id);
    setName(product.name);
    setPrice(product.price);
    setStock(product.stock);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Add or Edit Product Form */}
      <div className="mb-6 p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Product Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price (KES):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Stock:</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Available Products</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-2 flex justify-between items-center">
                <div>
                  <strong>{product.name}</strong> - Price: KES {product.price} - Stock: {product.stock}
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
