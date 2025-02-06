const jwt = require("jsonwebtoken");
const User = require("../db/models/users");

// Middleware to verify JWT token and attach user data
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from the request header
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user from the decoded token ID
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if the authenticated user is an admin
const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
