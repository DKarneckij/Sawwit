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

  const { name } = req.body;

  const existing = await Subsaw.findOne({ name: name });
  if (existing) {
    return res.status(409).json({ error: 'Subsaw name already exists' });
  }

  const newSubsaw = new Subsaw({
    displayName: name,
    name: name.toLowerCase(),
    description: req.body.description || '',
    moderators: [user],
    date_created: new Date()
  });

  const saved = await newSubsaw.save();

  res.status(201).json(saved);
}

const getSubsaw = async (req, res) => {

  const { name } = req.body;

  const subsaw = await Subsaw.findOne({ name });

  if (!subsaw) {
      return res.status(404).json({ error: 'Subsaw not found' });
  }

  res.status(200).json(subsaw);
};

module.exports = {
  createSubsaw,
  getSubsaw
}
