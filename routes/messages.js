var express = require('express');
var router = express.Router();
var Message = require('../models/message');

//the path is just / since in the end it will be /messages/
//every route set up here invisibly has messages before the /
router.post('/', function(req, res, next){
  var message = new Message({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    venue: req.body.venue,
    address: req.body.address,
    admission: req.body.admission,
    type: req.body.type,
    url: req.body.url
  });
  message.save(function(err, result){
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'Saved Event',
      obj: result
    });
  })
});

router.get('/', function(req, res, next){
  Message.find()
          .exec(function(err, messages){
            if(err) {
              return res.status(500).json({
                title: 'An Error Occurred',
                error: err
              });
            }
            res.status(200).json({
              message: 'Success',
              obj: messages
            });
          });
});

router.patch('/:id', function(req, res, next){
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Event Found',
        error: {message: 'Event not Found'}
      });
    }
    message.title = req.body.title;
    message.description = req.body.description;
    message.date = req.body.date;
    message.time = req.body.time;
    message.venue = req.body.venue;
    message.address = req.body.address;
    message.admission = req.body.admission;
    message.type = req.body.type;
    message.url = req.body.url;
    message.save(function(err, result){
      if(err) {
        return res.status(500).json({
          title: 'An Error Occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated Event',
        obj: result
      });
    });
  });
});

router.delete('/:id', function(req, res, next){
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      return res.status(500).json({
        title: 'An Error Occurred',
        error: err
      });
    }
    if(!message) {
      return res.status(500).json({
        title: 'No Event Found',
        error: {message: 'No Event Found'}
      });
    }
    message.remove(function(err, result){
      if(err) {
        return res.status(500).json({
          title: 'An Error Occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Removed Event',
        obj: result
      });
    });
  });
});

module.exports = router;
