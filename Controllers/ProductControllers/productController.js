const ProductModel = require('../../Model/ProductModel'); // Adjust the path as necessary

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

    const userId = req.user._id; // Get the user ID from the authenticated user
    const userRole = req.user.role; // Get the user's role

    try {
        // Validate required fields
        if (!name || !description || !price || !stock || !imageUrl) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check if the user is authorized to create a product
        if (userRole !== 'ADMIN' && userRole !== 'SELLER') {
            return res.status(403).json({ message: 'Access denied. You are not authorized to create a product.' });
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
            sales,
            sellerId: userRole === 'SELLER' ? userId : undefined // Only set sellerId if user is a seller
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

// Product Updating Controller
const updateProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from route parameters
    const updateData = req.body; // Get the updated data from request body
    const userId = req.user._id; // Get the user ID from the authenticated user
    const userRole = req.user.role; // Get the user's role

    try {
        // Validate required fields
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product to check if it exists and who created it
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the current user is the seller who created the product or an admin
        if (userRole !== 'ADMIN' && product.sellerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to update this product.' });
        }

        // Find and update the product
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // Respond with the updated product data
        return res.status(200).json(updatedProduct);

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Delete Product Controller
const deleteProduct = async (req, res) => {
    const { id } = req.params; // Get product ID from route parameters
    const userId = req.user._id; // Get the user ID from the authenticated user
    const userRole = req.user.role; // Get the user's role

    try {
        // Validate required fields
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product to check if it exists and who created it
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the current user is the seller who created the product or an admin
        if (userRole !== 'ADMIN' && product.sellerId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Access denied. You are not authorized to delete this product.' });
        }

        // Find and delete the product
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        // Respond with a success message
        return res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        // Handle any errors
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get All Products Controller
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

module.exports = { createProduct, updateProduct, deleteProduct, getAllProducts };
