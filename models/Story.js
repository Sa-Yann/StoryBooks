const mongoose = require('mongoose')

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: { // so our stories are linked to the proper user by referenceing to the logged in user writting it s story
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})
module.exports =  mongoose.model('Story', StorySchema)