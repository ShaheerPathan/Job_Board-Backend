const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

class AuthService {
  static async login(email, password) {
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      throw new Error('Invalid Credentials');
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = AuthService;