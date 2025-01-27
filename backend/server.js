const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy data (replace with database logic as needed)
let products = [];
let orders = [];

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1; // Add a simple ID
    products.push(product);
    res.status(201).json({ message: 'Product added!', product });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const productIndex = products.findIndex((p) => p.id === parseInt(id));

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        res.json({ message: 'Product updated!', product: products[productIndex] });
    } else {
        res.status(404).json({ message: 'Product not found!' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === parseInt(id));

    if (productIndex !== -1) {
        const removedProduct = products.splice(productIndex, 1);
        res.json({ message: 'Product deleted!', product: removedProduct });
    } else {
        res.status(404).json({ message: 'Product not found!' });
    }
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const order = req.body;
    order.id = orders.length + 1; // Add a simple ID
    orders.push(order);
    res.status(201).json({ message: 'Order added!', order });
});

app.put('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const updatedOrder = req.body;
    const orderIndex = orders.findIndex((o) => o.id === parseInt(id));

    if (orderIndex !== -1) {
        orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
        res.json({ message: 'Order updated!', order: orders[orderIndex] });
    } else {
        res.status(404).json({ message: 'Order not found!' });
    }
});

app.delete('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const orderIndex = orders.findIndex((o) => o.id === parseInt(id));

    if (orderIndex !== -1) {
        const removedOrder = orders.splice(orderIndex, 1);
        res.json({ message: 'Order deleted!', order: removedOrder });
    } else {
        res.status(404).json({ message: 'Order not found!' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
