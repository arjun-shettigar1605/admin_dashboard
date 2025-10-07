const jwt = require("jsonwebtoken");

// Middleware to protect routes that require authentication
exports.protect = (req, res, next) => {
  const token = req.header("x-auth-token"); // Or from 'Authorization: Bearer TOKEN'

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid." });
  }
};

// Middleware to restrict access to Admins only
exports.isAdmin = (req, res, next) => {
  // This middleware must run AFTER the 'protect' middleware
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
