var express = require('express');
var router = express.Router();

const Reservation = require('../models/reservations');

router.post('/:id',(req,res)=>{
    const newReservation = new Reservation({
        trip_id : req.params.id,
        status : {
            isBooked : true,
            isPurchased : false,
            },
    });

    newReservation.save();
    res.json({ Reservation : newReservation});
});

router.delete('/:id',(req,res)=>{
    
    Reservation.deleteOne({_id :ObjectID(req.params.id)})
});



module.exports = router;