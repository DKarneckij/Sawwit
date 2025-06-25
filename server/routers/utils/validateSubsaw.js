const Subsaw = require('@models/subsaw');

const validateSubsaw = async (req, res, next) => {

  const name = req.params.subsawName.toLowerCase();
  console.log(name);
  
  try {
    const subsaw = await Subsaw.findOne({ name });
    if (!subsaw) {
      return res.status(404).json({ error: `Subsaw not found` });
    }

    req.subsaw = subsaw; // attach it to request for later use
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateSubsaw