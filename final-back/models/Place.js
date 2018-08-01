const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    type: String,
    address: String,
    // will there be maps?
    // not sure it's necessary to have lists here
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }]
})

module.exports = mongoose.model('Place', placeSchema)