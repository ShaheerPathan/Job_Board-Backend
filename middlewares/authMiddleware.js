const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (role) => async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new AppError('Access denied. No token provided.', 401));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || (role && user.role !== role)) {
      return next(new AppError('Unauthorized', 403));
    }

    req.user = user;
    next();
  } catch (err) {
    next(new AppError('Invalid token', 400));
  }
};

module.exports = auth;
