const mongoose  =require('mongoose');
mongoose.pluralize(null);

const matchSchema = new mongoose.Schema({
    MatchNumber:{
        type:Number
    },
    RoundNumber:{
        type:Number
    },
    DateUtc:{
        type:Date
    },
    Location:{
        type:String
    },
    StadiumCapacity:{
        type:Number
    },
    HomeTeam:{
        type:String
    },
    AwayTeam:{
        type:String
    },
    Group:{
        type:String
    },
    HomeTeamScore:{
        type:Number
    },
    AwayTeamScore:{
        type:Number
    }
})

const match = mongoose.model('Match',matchSchema);

module.exports = match;