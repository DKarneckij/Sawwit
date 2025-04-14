const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateToken = require('./utils/generateToken');

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;  
  
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    displayName: username.toLowerCase(),
    username,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    const token = generateToken(savedUser._id);
    
    res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })
    .status(201)
    .json(savedUser);
    
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(409).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const loginUser = async (req, res) => {

  const { identifier, password } = req.body

  if (!identifier || !password) {
    return res.status(400).json({error: 'All fields are required'})
  }

  const user = await User.findOne({
    $or:[{username: identifier}, {email: identifier}]
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!user || !passwordCorrect) {
    return res.status(401).json({error: "Invalid credentials for login"})
  }

  const token = generateToken(user._id)

  return res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict'
    })
    .status(200)
    .json({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      karma: user.karma
    });
}

const logoutUser = async (req, res) => {
  res
  .clearCookie('token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: process.env.NODE_ENV === 'production'
  })
  .status(200)
  .json({ message: 'Logged out successfully' });
}

const getMe = async (req, res) => {
  const user = req.user
  res.status(200).json(user);
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getMe
};
