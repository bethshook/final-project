const express = require('express');
const router  = express.Router();
const path = require('path');
const Place     = require('../models/Place');
const List      = require('../models/List')
const User      = require('../models/User')

// post new place
router.post('/list-detail/:id', (req,res,next) => {
    req.body.list = req.params.id
    Place.create(req.body)
    .then(place => {
      return List.findByIdAndUpdate(req.params.id,{$push:{places:place._id}},{new:true} )
        .populate('places')
        .populate('user')
    })
    .then(list=>{
      return res.status(201).json(list)
    })
    .catch(e=>res.json(e))
  });


  //delete place
  // router.delete('/delete-place/:id', (req,res,next) => {
  //   Place.findByIdAndRemove(req.params.id)
  //   .then(place => {
  //     res.status(200).json(phone)
  //   })
  //   .catch(e=>{
  //     res.status(500).json({message:"Something went wrong."})
  //     next(e)
  //   })
  // })

module.exports = router;