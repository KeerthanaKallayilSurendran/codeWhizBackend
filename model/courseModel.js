const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        require:true
    },
    description: {
        type: String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    instructorName:{
        type:String,
        require:true
    },
    courseImg:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    }
})

const courses = mongoose.model("courses", courseSchema)
module.exports = courses