const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connection Succesfully");
}).catch(res=>{
    console.log("MongoDB Connection Failed");
    
})