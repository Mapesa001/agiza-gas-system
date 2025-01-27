const express = require('express');
const router = express.Router();

// Controller (logic for the endpoints can be added later)
router.get('/', (req, res) => {
    res.json({ message: 'Orders route is working!' });
});

// Export the router
module.exports = router;
