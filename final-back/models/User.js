const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const passportlm    = require('passport-local-mongoose');

const userSchema = new Schema({
    username: String,
    email: String
},{
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

userSchema.plugin(passportlm, {usernameField:'email'})
module.exports = mongoose.model('User', userSchema)