const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/jwt.utils');

const login = async (req, res) => {
    try {
        // For testing - replace with actual user authentication
        const testUser = {
            id: 1,
            email: 'test@example.com',
            role: 'admin'
        };

        const token = generateToken(testUser);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { login };