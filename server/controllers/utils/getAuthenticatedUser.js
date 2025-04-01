const User = require('@models/user');

const getAuthenticatedUser = async (req, res) => {
  
  const user = await User.findById(req.token._id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return user;
};

module.exports = getAuthenticatedUser;