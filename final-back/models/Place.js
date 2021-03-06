const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    type: String,
    address: String,
    lat: String,
    long: String,
    img: String,
    // will there be maps?
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
})

module.exports = mongoose.model('Place', placeSchema)