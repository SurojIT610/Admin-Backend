const ProductModel = require('../../Model/ProductModel'); // Adjust the path as necessary

/**
 * Create a new product.
 * @param {Object} req - The request object containing the product details.
 * @param {Object} res - The response object used to send the response.
 */

// Product Creating Controller
const createProduct = async (req, res) => {
    const {
        name,
        description,
        price,
        stock,
        rating,
        imageUrl,
        category,
        brand,
        tags,
        dimensions,
        weight,
        warranty,
        manufacturer,
        supplier,
        sales
    } = req.body;

    try {
        // Validate required fields
        if (!name || !description || !price || !stock || !imageUrl) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Create a new product
        const newProduct = new ProductModel({
            name,
            description,
            price,
            stock,
            rating: rating || 0, // Default to 0 if not provided
            imageUrl,
            category,
            brand,
            tags,
            dimensions,
            weight,
            warranty,
            manufacturer,
            supplier,
            sales
        });

        // Save the new product to the database
        const product = await newProduct.save();

        // Respond with the newly created product data
        return res.status(201).json(product);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};



// product updating controller

const updateProduct = async (req, res) => {
    const { productId } = req.params; // Get product ID from route parameters
    const updateData = req.body; // Get the updated data from request body

    try {
        // Validate required fields
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Assuming you have middleware to check if user is an admin
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Find and update the product
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Check if product was found
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Respond with the updated product data
        return res.status(200).json(updatedProduct);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// get all products

const getAllProducts = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await ProductModel.find();

        // Respond with the list of products
        return res.status(200).json(products);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createProduct,updateProduct,getAllProducts};
