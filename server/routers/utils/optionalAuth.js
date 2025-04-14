const jwt = require('jsonwebtoken');

const optionalAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded; // Attach user if token valid
    } catch (err) {
      console.error('Optional auth failed:', err.message);
      // No throw, just continue as guest
    }
  }

  next();
};

module.exports = optionalAuth;
