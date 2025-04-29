const Vote = require('@models/vote');

/**
 * Attaches the user's vote to any document (Post or Comment)
 * @param {Object} doc - The Mongoose document or plain object (post or comment)
 * @param {ObjectId} userId - The current user's ID
 * @param {String} targetType - 'Post' or 'Comment'
 * @returns {Object} The document JSON + userVote field
 */
const attachUserVote = async (doc, userId, targetType) => {
  if (!doc) throw new Error('attachUserVote: missing document');

  // Handle if doc is already a plain object vs Mongoose document
  const plainDoc = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };

  if (!userId) {
    return { ...plainDoc, userVote: null };
  }

  const vote = await Vote.findOne({
    userId,
    targetId: plainDoc._id,
    targetType,
  });

  return {
    ...plainDoc,
    userVote: vote ? vote.voteType : null,
  };
};

module.exports = attachUserVote;
