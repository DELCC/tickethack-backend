var express = require('express');
var router = express.Router();
var moment = require('moment');

const Trip = require('../models/trips');
const Reservation = require('../models/reservations');
// Ajoute une nouvelle réservation sur la page Cart et crée un nouveau document dans la collection reservations
router.post('/:id',(req,res)=>{
    const newReservation = new Reservation({
        trip_id : req.params.id,
        isBooked : true,
        isPurchased : false,
    });

    newReservation.save();
    res.json({ Reservation : newReservation});
});
//Supprime la réservation de la page Cart et dans la collections reservations (id = _id de la collection reservations)
router.delete('/:id',(req,res)=>{
    
    Reservation.deleteOne({_id :req.params.id})
    .then(() => Reservation.find({isBooked : true})
    .populate('trip_id'))
    .then(data => {
        let result = [];
        for (let i = 0; i< data.length; i++){
            result.push({
             _id : data[i]["_id"],
            departure : data[i]['trip_id']['departure'],
            arrival : data[i]['trip_id']['arrival'],
            date : moment(data[i]['trip_id']['date']).format('HH:mm'),
            price : data[i]['trip_id']['price'],
    });
        
}
res.json({reservations : result});
    })
});



// Affiche les réservations

router.get("/isBooked", (req,res) => {
    Reservation.find({isBooked : true})
    .populate('trip_id')
    .then(data =>{
        let result = [];
        for (let i = 0; i< data.length; i++){
            result.push({
             _id : data[i]["_id"],
            departure : data[i]['trip_id']['departure'],
            arrival : data[i]['trip_id']['arrival'],
            date : moment(data[i]['trip_id']['date']).format('HH:mm'),
            price : data[i]['trip_id']['price'],
    });
        
}
res.json({reservations : result});
})});


//Valide la réservation
router.put("/:id", (req,res)=>{
    Reservation.updateOne({ _id: req.params.id }, { isBooked : false,
        isPurchased : true,}).then(() => {
        res.json({result : "Purchase Done !"});
});
});

//Affiche les réservations payées
router.get("/isPurchased", (req,res) => {
    Reservation.find({isPurchased : true})
    .populate('trip_id')
    .then(data =>{
        let result = [];
        for (let i = 0; i<data.length; i++){
            result.push({
             _id : data[i]["_id"],
            departure : data[i]['trip_id']['departure'],
            arrival : data[i]['trip_id']['arrival'],
            date : moment(data[i]['trip_id']['date']).format('HH:mm'),
            fromNow :  moment(data[i]['trip_id']['date']).fromNow(),
            price : data[i]['trip_id']['price'],
    });
        
}
        res.json({purchased : result});
})});

//Affiche la somme du panier

router.get('/totalCart', (req,res)=>{
    Reservation.find({isBooked : true})
    .populate('trip_id')
    .then(data => {
        let total = 0;
        for (let i = 0; i<data.length; i++){
            total += data[i]['trip_id']['price'];
        }
        res.json({total : total});
    });
});


module.exports = router;