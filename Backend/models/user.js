const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://res.cloudinary.com/dperxfai0/image/upload/v1715459247/assets/default_profile.png'
    },
    karma: {
        type: Number,
        default: 0
    },
    subredditsJoined: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subreddit'
      }]
})

userSchema.plugin(mongooseUniqueValidator)

module.exports = mongoose.model('User', userSchema)

