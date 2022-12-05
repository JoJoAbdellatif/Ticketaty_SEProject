const express = require('express');
const asyncHandler = require('express-async-handler')
const matches = require('../models/matches')
const matchRoute = express.Router();
const axios = require('axios')
const URLUpdateMatch = 'http://localhost:5000/api/match/'

//Get all matches
matchRoute.get('/',asyncHandler(async(req,res)=>{
    const matches = await matches.findAll()

    res.status(200)
    res.send(matches)
    
}))

//Get match by id
matchRoute.get('/:id',asyncHandler(async(req,res)=>{
    const matchExist = await matches.findById({_id:req.params.id});

    if(!matchExist){
        res.status(401);
        throw new Error('Match does not exist');
    }
    res.status(200).json(matchExist);
   
}))

//Create New Match
matchRoute.post('/addMatch',asyncHandler(async(req,res)=>{
    const {MatchNumber,RoundNumber,DateUtc,Location
        ,StadiumCapacity,HomeTeam,AwayTeam,Group,HomeTeamScore,AwayTeamScore} = req.body;

    const createMatch = await matches.create({MatchNumber,RoundNumber,DateUtc,Location
        ,StadiumCapacity,HomeTeam,AwayTeam,Group,HomeTeamScore,AwayTeamScore});

    res.json(createMatch);


}))

// Update match 
matchRoute.patch('/update/:id',asyncHandler(async(req,res)=>{
    const matchExist = await matches.findOne({ _id:req.params.id});

    const {StadiumCapacity,HomeTeamScore,AwayTeamScore} = req.body;

    if(!matchExist){
        res.status(401);
        throw new Error('Match does not exist');
    }
    else{
        matches.updateOne({_id: req.params.id},{StadiumCapacity,HomeTeamScore,AwayTeamScore})
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({error:'Could not update the document'})
        })
    }

}))