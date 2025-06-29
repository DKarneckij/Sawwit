const Subsaw = require('@models/subsaw');
const User = require('@models/user');

const createSubsaw = async (req, res) => {
  
  const user = req.user
  const displayName = req.body.name

  // Check if subsaw name (normalized lowercase) already exists
  const existing = await Subsaw.findOne({ name: displayName.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'Subsaw name already exists' });
  }
  
  // Create new subsaw and add creator as mod and subscriber
  const newSubsaw = new Subsaw({
    displayName,
    name: displayName.toLowerCase(),
    description: req.body.description,
    moderators: [user._id],
    subscribers: [user._id],
  });

  const savedSubsaw = await newSubsaw.save();

  // Add subsaw to user's list of joined subsaws
  user.subsawsJoined.push(savedSubsaw._id);
  await user.save();

  res.status(201).json({message: "Subsaw created succesfully"})
}

const getSubsaw = async (req, res) => {

  const subsaw = await Subsaw.findById(req.subsaw.id)
    .populate('moderators', 'displayName username');
  
  const isModerator = req.user
    ? subsaw.moderators.some(
        mod => mod._id.toString() === req.user._id.toString()
      )
    : false;


  res.status(200).json({
    _id: subsaw._id.toString(),
    name: subsaw.name,
    displayName: subsaw.displayName,
    description: subsaw.description,
    date_created: subsaw.date_created,
    subscriberCount: subsaw.subscriberCount,
    bannerUrl: subsaw.bannerUrl,
    backgroundUrl: subsaw.backgroundUrl,
    iconUrl: subsaw.iconUrl,
    isModerator,
    moderators: subsaw.moderators.map((mod) => ({
      _id: mod._id.toString(),
      displayName: mod.displayName,
      username: mod.username
    }))
  });
};


const joinSubsaw = async (req, res) => {

  const user = req.user 
  const subsaw = req.subsaw
  
  // Check if user is already subscribed
  const alreadyJoined = user.subsawsJoined.some(_id => _id.equals(subsaw._id));
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
  console.log(user);
  
  // Ensure only moderators can update the subsaw
  if (!subsaw.moderators.includes(user._id)) {
    return res.status(403).json({ error: 'Forbidden: Only moderators can update the subsaw.' });
  }

  // Allowed fields to patch
  const allowedFields = ['description', 'bannerUrl', 'iconUrl', 'backgroundUrl', 'pfpUrl'];
  for (let key of Object.keys(updates)) {
    if (allowedFields.includes(key)) {
      subsaw[key] = updates[key];
    } else {
      return res.status(400).json({ error: `Invalid update field: ${key}` });
    }
  }

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
