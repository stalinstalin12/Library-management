const User = require('../db/models/users');
const success_function = require('../utils/response-handler').success_function;
const error_function = require('../utils/response-handler').error_function;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const DEFAULT_USER_TYPE = "67a45e907a5cd482f9c5099b"; // Default user type for new users

// User Registration
exports.createUser = async function (req, res) {
    try {
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, Email, and Password are required" });
        }

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        let hashedPassword = bcrypt.hashSync(password, 10);

        // Create new user with default user type
        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            user_type: new ObjectId(DEFAULT_USER_TYPE), // Assign the default user type
        });

        if (newUser) {
            let response = success_function({
                statusCode: 201,
                message: "User registered successfully",
            });
            return res.status(response.statusCode).send(response);
        } else {
            return res.status(400).json({ message: "User registration failed" });
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



// Get All Users
exports.getAllUsers = async function (req, res) {
    try {
        let usersData = await User.find().select('-password');
        let response = success_function({
            statusCode: 200,
            data: usersData,
            message: "Users fetched successfully",
        });

        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Get Single User
exports.getSingleUser = async function (req, res) {
    try {
        let id = req.params.id;
        let userData = await User.findById(id).select('-password');

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let response = success_function({
            statusCode: 200,
            data: userData,
            message: "User data fetched successfully",
        });

        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Delete User
exports.deleteUser = async function (req, res) {
    try {
        let id = req.params.id;
        let deleteUser = await User.findByIdAndDelete(id);

        if (deleteUser) {
            let response = success_function({
                statusCode: 200,
                message: "User deleted successfully",
            });
            res.status(response.statusCode).send(response);
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// View Logged-in User Profile
exports.viewUserProfile = async function (req, res) {
    try {
        const userId = req.user.id;
        let userData = await User.findById(userId).select('-password');

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let response = success_function({
            statusCode: 200,
            data: userData,
            message: "User profile fetched successfully",
        });

        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Update User Profile
exports.updateUser = async function (req, res) {
    try {
        const userId = req.user.id;
        const { name, email, address } = req.body;
        const updateFields = {};

        if (name) {
            updateFields.name = name;
        }

        if (email) {
            let emailExists = await User.findOne({ email, _id: { $ne: userId } });
            if (emailExists) {
                return res.status(400).json({ message: "Email is already in use" });
            }
            updateFields.email = email;
        }

        if (address) {
            updateFields.address = address.trim();
        }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided to update" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        let response = success_function({
            statusCode: 200,
            data: updatedUser,
            message: "User details updated successfully",
        });

        res.status(response.statusCode).send(response);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
