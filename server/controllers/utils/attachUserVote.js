const Vote = require('@models/vote');

const attachUserVote = async (post, userId) => {
  if (!userId) return { ...post.toJSON(), userVote: null };

  const vote = await Vote.findOne({ userId, postId: post._id });
  return {
    ...post.toJSON(),
    userVote: vote ? vote.voteType : null
  };
};

module.exports = attachUserVote;
