const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  targetId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  targetType: { 
    type: String, 
    enum: ['Post', 'Comment'], 
    required: true 
  },
  voteType: { 
    type: String, 
    enum: ['upvote', 'downvote'], 
    required: true 
  },
}, { timestamps: true });

// Ensure a user can only vote once per target (Post or Comment)
voteSchema.index({ userId: 1, targetId: 1, targetType: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
