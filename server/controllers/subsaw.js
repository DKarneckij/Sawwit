const Subsaw = require('@models/subsaw');
const User = require('@models/user');
const jwt = require('jsonwebtoken');

const createSubsaw = async (req, res) => {
  
  const token = req.cookies.token  

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }  

  let decodedToken;
  
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  const user = await User.findOne({ username: decodedToken.username });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }  

  // Get displayName (typed by user) from input — will be used both for storage & lookup
  const { name } = req.body;

  // Check if subsaw name (normalized lowercase) already exists
  const existing = await Subsaw.findOne({ name: name.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'Subsaw name already exists' });
  }


  // Create new subsaw and add creator as mod and subscriber
  const newSubsaw = new Subsaw({
    displayName: name,
    name: name.toLowerCase(),
    description: req.body.description || '',
    moderators: [user._id],
    subscribers: [user._id],
    subscriberCount: 1
  });
  const savedSubsaw = await newSubsaw.save();

  // Add subsaw to user's list of joined subsaws
  user.subsawsJoined.push(savedSubsaw._id);
  await user.save();
  
  res.status(201).json(savedSubsaw);
}

const getSubsaw = async (req, res) => {  

  const name = req.params.name?.trim().toLowerCase();

  const subsaw = await Subsaw.findOne({ name: name.toLowerCase() });

  if (!subsaw) {
      return res.status(404).json({ error: 'Subsaw not found' });
  }

  res.status(200).json(subsaw);
};

module.exports = {
  createSubsaw,
  getSubsaw
}
