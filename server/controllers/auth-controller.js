const bcrypt = require('bcrypt');
const User = require('../models/user');
const generateToken = require('./utils/generateToken');

const signupUser = async (req, res) => {

  const { username, email, password } = req.body;  

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json({ message: 'Email is already in use.' });
  }

  const temp = username.toLowerCase()
  const usernameExists = await User.findOne({ username:temp });
  if (usernameExists) {
    return res.status(409).json({ message: 'Username is already taken.' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    displayName: username,
    username: username.toLowerCase(),
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
    $or:[{username: identifier.toLowerCase()}, {email: identifier}]
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
    .json(user);
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

  const user = await User.findById(req.user._id)
    .populate({
      path: 'subsawsJoined',
      select: 'displayName name pfpUrl moderators',
    });

  const enrichedSubsaws = user.subsawsJoined.map(sub => ({
    _id: sub._id.toString(),
    name: sub.name,
    displayName: sub.displayName,
    pfpUrl: sub.pfpUrl,
    isModerator: sub.moderators.some(modId =>
      modId.toString() === user._id.toString()
    ),
  }));

  res.status(200).json({
    _id: user._id.toString(),
    displayName: user.displayName,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    karma: user.karma,
    subsawsJoined: enrichedSubsaws,
  });
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getMe
};
