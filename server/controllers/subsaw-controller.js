const Subsaw = require('@models/subsaw');
const User = require('@models/user');

const createSubsaw = async (req, res) => {

  const user = req.user
  const subsawName = req.body.subsawName  

  // Check if subsaw name (normalized lowercase) already exists
  const existing = await Subsaw.findOne({ subsawName: subsawName.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'Subsaw name already exists' });
  }

  // Create new subsaw and add creator as mod and subscriber
  const newSubsaw = new Subsaw({
    displayName: subsawName,
    subsawName: subsawName.toLowerCase(),
    description: req.body.description || '',
    moderators: [user._id],
    subscribers: [user._id],
  });
  const savedSubsaw = await newSubsaw.save();

  // Add subsaw to user's list of joined subsaws
  user.subsawsJoined.push(savedSubsaw._id);
  await user.save();

  newSubsaw.subscribers.push(user._id);
  await newSubsaw.save();
  
  res.status(201).json(savedSubsaw);
}

const getSubsaw = async (req, res) => {
  const subsaw = req.subsaw;
  const user = req.user;

  const isSubscribed = user
    ? subsaw.subscribers.some(sub => sub.equals(user._id))
    : false;

  const isModerator = user
    ? subsaw.moderators.some(mod => mod.equals(user._id))
    : false;
  
  res.status(200).json({
    id: subsaw._id.toString(),
    subsawName: subsaw.subsawName,
    displayName: subsaw.displayName,
    description: subsaw.description,
    date_created: subsaw.date_created,
    subscriberCount: subsaw.subscriberCount,
    bannerUrl: subsaw.bannerUrl,
    backgroundUrl: subsaw.backgroundUrl,
    pfpUrl: subsaw.pfpUrl,
    isSubscribed,
    isModerator
  });
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

const updateSubsaw = async (req, res) => {
  const subsaw = req.subsaw;
  const user = req.user;
  const updates = req.body;

  // Ensure only moderators can update the subsaw
  if (!subsaw.moderators.includes(user._id)) {
    return res.status(403).json({ error: 'Forbidden: Only moderators can update the subsaw.' });
  }

  // Update allowed fields
  if (updates.description !== undefined) {
    subsaw.description = updates.description;
  }

  // Add other fields as needed
  // e.g., if (updates.bannerUrl !== undefined) { subsaw.bannerUrl = updates.bannerUrl; }

  try {
    const updatedSubsaw = await subsaw.save();
    res.status(200).json(updatedSubsaw);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subsaw.' });
  }
};


module.exports = {
  createSubsaw,
  getSubsaw, 
  joinSubsaw,
  leaveSub,
  updateSubsaw
}
