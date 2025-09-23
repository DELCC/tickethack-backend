var express = require('express');
var router = express.Router();
var moment = require('moment');
const Trip = require('../models/trips');

router.get('/trips',(req,res) =>{
   /* req.body.departure = document.querySelector('#').value;
    req.body.arrival = document.querySelector('#').value;
    req.body.date = document.querySelector('#').value;*/


Trip.find({
  departure : req.body.departure, 
  arrival : req.body.arrival,
  date : { $gte: moment(req.body.date).startOf('day').format(), $lte: moment(req.body.date).endOf('day').format() } })
.then(data => {
    res.json({trips : data});
});
});

module.exports = router;
