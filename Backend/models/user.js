const mongoose = require('mongoose')
const mongooseUniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
})

userSchema.plugin(mongooseUniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
}) 

module.exports = mongoose.model('User', userSchema)

