var express = require('express');
var router = express.Router();
var moment = require('moment');
const Trip = require('../models/trips');

router.get(`/trips/:departure/:arrival/:date`,(req,res) =>{
   /* req.body.departure = document.querySelector('#').value;
    req.body.arrival = document.querySelector('#').value;
    req.body.date = document.querySelector('#').value;*/


Trip.find({
  departure : req.params.departure, 
  arrival : req.params.arrival,
  date : { $gte: moment(req.params.date).startOf('day').format(), $lte: moment(req.params.date).endOf('day').format() } })
.then(data => {
    res.json({trips : data});
});
});

module.exports = router;
