const courses = require('../model/courseModel')

// add courses
exports.addCourseController = async(req, res) =>{
    console.log("inside add course controller");
    const userId = req.userId
    console.log(userId);
    const {courseName, description, category, price, instructorName} = req.body
    console.log(courseImg);
    const courseImg = req.file.filename
    console.log(courseName, description, category, price, instructorName, courseImg);
    try {
        const newCourse = new courses({
            courseName, description, category, price, instructorName, courseImg, userId
        })
        await newCourse.save()
        res.status(200).json(newCourse)
    } catch (error) {
        res.status(401).json(err)
        
    }
    
    
    
}