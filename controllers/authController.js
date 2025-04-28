const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: 'fail',
      message: error.message
    });
  }
};
