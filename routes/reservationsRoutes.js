const express = require('express');
const asyncHandler = require('express-async-handler')
const reservation = require('../models/reservations')
const reservationRoute = express.Router();
const axios = require('axios')


// Get all tickets
reservationRoute.get('/',asyncHandler(async(req,res)=>{
    const reservation = await reservation.findAll()

    res.status(200)
    res.send(reservation)
    
}))

//Get ticket by id
reservationRoute.get('/:id',asyncHandler(async(req,res)=>{
    const reservationExist = await reservation.findById({_id:req.params.id});

    if(!reservationExist){
        res.status(401);
        throw new Error('Reservation does not exist');
    }
    res.status(200).json(reservationExist);
   
}))

// Delete ticket
reservationRoute.delete('/:id',asyncHandler(async (req, res) => {
    try {
      const reservationExist = await reservation.findByIdAndDelete(req.params.id);
      res.status(200);
      res.send(reservationExist);
    } catch (error) {
      res.status(500);
      throw new Error('Server Error');
    }
  })
);

//Create ticket

reservationRoute.post('/addReservation',asyncHandler(async(req,res)=>{
    const {First_Name,Last_Name,MatchId,Email,Seat_Number,Paid} = req.body;

    const createReservation = await reservation.create({First_Name,Last_Name,MatchId,Email,Seat_Number,Paid});

    res.json(createReservation);


}))

//Update paid status

reservationRoute.patch('/updatePaid/:id',asyncHandler(async(req,res)=>{
    const reservationExists = await reservation.findOne({_id: req.params.id})
    const updates = req.body;

    if(!reservationExists){
        res.send("The Reservation Does Not Exists");

    }
    else{
        reservation.updateOne({_id: req.params.id},{$set:updates})
        .then(result => {
            res.status(200).json(result)
            
        })
        .catch(err => {
            res.status(500).json({error:'Could not update the document'})
        })
    }
    
}))