var express = require('express');
var router = express.Router();

const Reservation = require('../models/reservations');
// Ajoute une nouvelle réservation sur la page Cart et crée un nouveau document dans la collection reservations
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
//Supprime la réservation de la page Cart et dans la collections reservations (id = _id de la collection reservations)
router.delete('/:id',(req,res)=>{
    
    Reservation.deleteOne({_id :ObjectID(req.params.id)});
    res.json({result : "Booking Canceled !"});
});

//Valide la réservation

module.exports = router;