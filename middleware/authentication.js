const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        // Fetch user from database using the decoded token
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user object to request for further use in routes
        req.user = user;
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { authenticateUser };
