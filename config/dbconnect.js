const mongoose = require('mongoose')

//conect Database:
const dbconnect=()=>{mongoose.connect(process.env.DB_CONNECT,{

    useUnifiedTopology:true,

    useNewUrlParser:true,
}).then(()=>console.log('DB Connected')).catch(err=>console.log(err))};

module.exports = dbconnect;