const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const passportlm    = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    email: String,
    facebookId: String,
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }],
    savedLists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.plugin(passportlm, {usernameField:'email'})
module.exports = mongoose.model('User', userSchema)