const Subsaw = require('@models/subsaw');
const User = require('@models/user');

const createSubsaw = async (req, res) => {

  const user = req.user
  const subsawDisplayName = req.body.subsawName

  // Check if subsaw name (normalized lowercase) already exists
  const existing = await Subsaw.findOne({ subsawName: subsawDisplayName.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'Subsaw name already exists' });
  }

  // Create new subsaw and add creator as mod and subscriber
  const newSubsaw = new Subsaw({
    displayName: subsawDisplayName,
    subsawName: subsawDisplayName.toLowerCase(),
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
  const subsaw = req.subsaw
  res.status(200).json(subsaw);
};

const joinSubsaw = async (req, res) => {

  // Find the user
  const user = req.user 
  
  // Find the subsaw
  const subsaw = req.subsaw
  
  // Check if user is already subscribed
  const alreadyJoined = user.subsawsJoined.some(id => id.equals(subsaw._id));
  if (alreadyJoined) {
    return res.status(200).json({ message: 'Already joined' });
  }

  // Add user to subsaw & subsaw to user
  user.subsawsJoined.push(subsaw._id);
  await user.save();

  subsaw.subscribers.push(user._id);
  subsaw.subscriberCount++;
  await subsaw.save();

  // Send response
  res.status(200).json({
  message: 'Joined successfully',
  subsaw: {
    _id: subsaw._id,
    name: subsaw.name
  }
  });
};

const leaveSub = async (req, res) => {
  
  const user = req.user
  const subsaw = req.subsaw

  // See if user is joined
  const isJoined = user.subsawsJoined.some( _id => _id.equals(subsaw._id));
  if (!isJoined) {
    return res.status(400).json({ error: "You are not subscribed to this subsaw"});
  }  

  // Remove the relationship both ways
  user.subsawsJoined.pull(subsaw._id);
  await user.save();

  subsaw.subscribers.pull(user._id);
  subsaw.subscriberCount = subsaw.subscriberCount - 1;
  await subsaw.save();

  // Send res
  return res.status(200).json({ message: 'Left subsaw successfully' });
}

module.exports = {
  createSubsaw,
  getSubsaw, 
  joinSubsaw,
  leaveSub
}
