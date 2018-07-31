const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false
      },
      image: {
        type: String, default: ''
      },
      location: {
        type: String,
        required:true
        //need to figure out how this will work
      }
},{
    timestamps:{
        createdAt:'created_at',
        updatedAt:'updated_at'
    }
})

module.exports = mongoose.model('Place', placeSchema)