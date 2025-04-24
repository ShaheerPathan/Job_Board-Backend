const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

class AuthService {
  static async login(email, password) {
    if (!email || !password) {
      throw new Error('Please provide email and password');
    }

    const user = await User.findOne({ email });

    // Password check using bcrypt
    const isMatch = user && await bcrypt.compare(password, user.password);
    if (!isMatch) {
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
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = AuthService;
