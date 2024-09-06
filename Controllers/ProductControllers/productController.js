const ProductModel = require('../../Model/ProductModel'); // Adjust the path as necessary

// Product Creating Controller
const createProduct = async (req, res) => {
    const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        images,
        thumbnail,
        category,
        brand,
        tags,
        sku,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        returnPolicy,
        minimumOrderQuantity,
        meta,
        reviews,
        sellerId, // Assume sellerId is passed for testing
        role // Assume role is passed for testing
    } = req.body;

    try {
        // Validate required fields
        if (!title || !description || !price || !stock || !images || !thumbnail) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

        // Check if the user is authorized to create a product
        if (role !== 'ADMIN' && role !== 'SELLER') {
            return res.status(403).json({ message: 'Access denied. You are not authorized to create a product.' });
        }

        // Create a new product
        const newProduct = new ProductModel({
            title,
            description,
            price,
            discountPercentage,
            rating,
            stock,
            images,
            thumbnail,
            category,
            brand,
            tags,
            sku,
            weight,
            dimensions,
            warrantyInformation,
            shippingInformation,
            availabilityStatus,
            returnPolicy,
            minimumOrderQuantity,
            meta,
            reviews,
            sellerId: role === 'SELLER' ? sellerId : undefined // Only set sellerId if user is a seller
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
    const { sellerId, role } = req.body; // Get sellerId and role from request body

    try {
        // Validate required fields
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product to check if it exists
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate and cast sellerId if it's provided
        if (sellerId) {
            if (!mongoose.Types.ObjectId.isValid(sellerId)) {
                return res.status(400).json({ message: 'Invalid Seller ID format' });
            }
        }

        // Check if sellerId and role are provided
        if (typeof role === 'undefined') {
            return res.status(400).json({ message: 'Role is required' });
        }

        // Ensure sellerId and role are of the expected type
        if (sellerId && typeof sellerId !== 'string') {
            return res.status(400).json({ message: 'Seller ID must be a string' });
        }
        if (typeof role !== 'string') {
            return res.status(400).json({ message: 'Role must be a string' });
        }

        // Check if the user is authorized to update the product
        // Handle case where product.sellerId might be undefined
        if (role !== 'ADMIN' && (product.sellerId && product.sellerId.toString() !== sellerId)) {
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
    const { sellerId, role } = req.body; // Get sellerId and role from request body

    try {
        // Validate required fields
        if (!id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product to check if it exists
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if role is provided
        if (!role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        // Check if the user is authorized to delete the product
        if (role === 'ADMIN') {
            // Admin can delete any product
            await ProductModel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } else if (role === 'SELLER') {
            // Seller can only delete their own products
            if (!sellerId) {
                return res.status(400).json({ message: 'Seller ID is required for SELLER role' });
            }

            if (product.sellerId.toString() !== sellerId.toString()) {
                return res.status(403).json({ message: 'Access denied. You are not authorized to delete this product.' });
            }

            await ProductModel.findByIdAndDelete(id);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } else {
            return res.status(403).json({ message: 'Access denied. Invalid role.' });
        }
    } catch (error) {
        // Handle any errors
        console.error('Error in deleteProduct:', error);
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