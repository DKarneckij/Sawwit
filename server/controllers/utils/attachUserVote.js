const Vote = require('@models/vote');

/**
 * Attaches the user's vote to any document (Post or Comment)
 * @param {Object} doc - The Mongoose document (post or comment)
 * @param {ObjectId} userId - The current user's ID
 * @param {String} targetType - 'Post' or 'Comment'
 * @returns {Object} The document JSON + userVote field
 */
const attachUserVote = async (doc, userId, targetType) => {
  if (!userId) return { ...doc.toJSON(), userVote: null };

  const vote = await Vote.findOne({ 
    userId, 
    targetId: doc._id, 
    targetType 
  });

  return {
    ...doc.toJSON(),
    userVote: vote ? vote.voteType : null
  };
};

module.exports = attachUserVote;
