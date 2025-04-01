const Subsaw = require('@models/subsaw');

const getSubsaw = async (req) => {
  console.log(req.params)
  
  const name = req.params?.name?.toLowerCase();

  if (!name) throw new Error('Subsaw name is required');

  const subsaw = await Subsaw.findOne({ name });
  if (!subsaw) throw new Error('Subsaw not found');
  
  return subsaw;
};

module.exports = getSubsaw;
