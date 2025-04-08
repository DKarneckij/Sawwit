const jwt = require('jsonwebtoken');
const User = require('@models/user');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user; // Attach the full user object to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
