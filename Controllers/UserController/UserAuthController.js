const UserModel = require("../../Model/UserModel");
const userModel = require("../../Model/UserModel"); // Adjust path as necessary
const bcrypt = require('bcrypt');

const userSignup = async (req, res) => {
    const { fname, lname, email, password, address } = req.body;

    try {
        // Check if the user already exists
        const checkUser = await userModel.findOne({ email });

        if (checkUser) {
            return res.status(400).json({ message: 'User is already registered' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new userModel({
            name: {
                fname: fname,
                lname: lname
            },
            email: email,
            password: hashedPassword,
            address: address
        });

        // Save the new user to the database
        const data = await newUser.save();

        // Respond with the newly created user data
        return res.status(201).json(data);

    } catch (error) {
        console.error(error, 'Error in userSignup controller');
        return res.status(500).json({ message: 'Server error' });
    }
};

const userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            // If user is not found, respond with an error
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords do not match, respond with an error
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If everything is correct, respond with success and user data
        return res.status(200).json({
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name, // Returning the user name object
                address: user.address, // Including address details in the response
                // Optionally include other fields like login, paymentInfo, etc.
            }
        });

    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};




const updateUser = async (req, res) => {
    const userId = req.params.id; // Get the user ID from the request parameters
    const { fname, lname, email, address, password } = req.body;

    try {
        // Find the user to update
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (fname) user.name.fname = fname;
        if (lname) user.name.lname = lname;
        if (email) user.email = email;
        if (address) user.address = address;
        
        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        // Save the updated user data
        const updatedUser = await user.save();

        // Respond with the updated user data
        return res.status(200).json({
            message: 'User updated successfully',
            user: {
                email: updatedUser.email,
                name: updatedUser.name,
                address: updatedUser.address,
            }
        });

    } catch (error) {
        // Handle any errors
        console.error(error, 'Error in updateUser controller');
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { userSignup, userlogin,updateUser };