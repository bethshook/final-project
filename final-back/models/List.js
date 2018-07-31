const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const listSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      //users will be an array though
      users:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    //will be an array
      places: {
        type: Schema.Types.ObjectId,
        ref: 'Place'
    },
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('List', listSchema)