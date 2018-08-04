const express = require('express');
const router  = express.Router();
const path = require('path');
const Place     = require('../models/Place');
const List      = require('../models/List')

//archivos
// const multer = require('multer')
// const uploads = multer({dest: './public/images'})

// post new place (eventually to list)
router.post('/list-detail', (req,res,next) => {
    console.log(req.body)
    Place.create(req.body)
    .then(place => res.json(place))
    .catch(e=>res.json(e))
  });

  // post new list
  router.post('/city-survey', (req,res,next) => {
    console.log(req.body)
    List.create(req.body)
    .then(list => res.json(list))
  })

  // edit existing list
  router.put('/list-detail/:id', (req,res,next) => {
    console.log('editing list on backend')
    List.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(list => {
            return res.status(202).json(list)
        }).catch(err => {
            return res.status(404).json(err);
        });
  })

  //get list
  router.get('/list-detail/:id', (req,res) => {
    List.findById(req.params.id)
    .populate('places')
    .then(list => {
      if (!list) return res.status(404);
      return res.status(200).json(list);
    })
    .catch(err => {
      return res.status(500).json(err);
    })
  })

  module.exports = router;