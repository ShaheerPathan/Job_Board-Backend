const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtService {
  static signToken(payload, expiresIn = process.env.JWT_EXPIRES_IN) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn
    });
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new AppError('Invalid or expired token', 401);
    }
  }

  static decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (err) {
      throw new AppError('Invalid token', 401);
    }
  }

  static generateAccessToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };
    return this.signToken(payload);

  }
}

module.exports = JwtService;