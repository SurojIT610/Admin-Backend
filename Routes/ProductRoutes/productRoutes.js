const express = require('express');
const {getAllProducts } = require('../../Controllers/ProductControllers/productController'); // Adjust the path as necessary

const router = express.Router();


router.get('/', getAllProducts); // Using get for all products


module.exports = router;