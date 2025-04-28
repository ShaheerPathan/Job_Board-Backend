const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

const auth = (role) => async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token. User not found.' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ success: false, message: 'Unauthorized. Insufficient permissions.' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth Middleware Error:', err.message);
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = auth;
