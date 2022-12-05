const mongoose  =require('mongoose');
mongoose.pluralize(null);


const reservationsSchema = new mongoose.Schema({
    First_Name:{
        type:String,
        required:true
    },
    Last_Name:{
        type:String, 
    },
    MatchId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'matches',
        required:true
    },
    Email:{  
        type:String,
        required:true
    },
    Seat_Number:{
        type: String,
        required:true
    },
    Paid:{
        type:Boolean,
        required:true,
        default:false
    }

})

const reservation = mongoose.model('Reservations',reservationsSchema);

module.exports = reservation;