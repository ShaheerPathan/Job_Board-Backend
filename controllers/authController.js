const AuthService = require('../services/authService');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const result = await AuthService.login(email, password);

    res.status(200).json({
      status: 'success',
      token: result.token,
      data: {
        user: result.user
      }
    });
  } catch (err) {
    let statusCode = 500;
    
    if (err.message === 'Please provide email and password') {
      statusCode = 400;
    } else if (err.message === 'Invalid Credentials') {
      statusCode = 401;
    }

    res.status(statusCode).json({
      status: 'fail',
      message: err.message
    });
  }
};