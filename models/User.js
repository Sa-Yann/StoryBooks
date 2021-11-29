const mongoose = require('mongoose')

// Creation od a Schema
const UserSchema = new mongoose.Schema({
    // we gonna get certain profile field back when users are gonna authentificate with google
    // one of them is a google id..differentfrom the id that mongoDB gives by default
    googleId: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        typre: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

// We wonna export the model usoing the model class that takes the file name: User..Date
// and Schema name: UserSchema
module.exports = mongoose.model('User', UserSchema)