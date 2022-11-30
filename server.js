const express = require('express');
const userRoutes = require('./routes/userRoutes');
const dotenv= require('dotenv');
const match = require('./routes/matchesRoutes');
const reservation = require('./routes/reservationsRoutes');


const app = express();
dotenv.config();
require('./config/dbconnect')();

app.use(express.json());


app.use('/api/match',match)
app.use('/api/reservation',reservation)


const PORT = process.env.PORT||8000;

app.listen(PORT,(req , res)=>{
    console.log(`Server is Up and Running ${PORT}`);
});