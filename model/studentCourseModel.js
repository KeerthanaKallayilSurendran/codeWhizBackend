const mongoose = require('mongoose')

const studentCourseModel = new mongoose.Schema({
    courseId: {
        type:String,
        require:true,
    },
    orderId: {
        type: String,
        require:true
    },
    userId: {
        type: String,
        require:true,
    }
})

const studentCourses = mongoose.model("studentCourses", studentCourseModel)
module.exports = studentCourses