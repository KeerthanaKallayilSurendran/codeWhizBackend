const categories = require('../model/categoryModel');
const courses = require('../model/courseModel')



// add Categories
exports.addCategoryController = async(req,res) =>{
    console.log("Inside Add Category Controller");
    const {categoryName} = req.body
    
    try {
        existingCategory = await categories.findOne({categoryName})
        
        if(existingCategory){
            res.status(406).json("Already Existing Category");
        }else{
            const newCategory = new categories({categoryName})
            await newCategory.save()
            res.status(200).json(newCategory)
        }
    } catch (error) {
        res.status(401).json(error);
    }

}

exports.viewCategoryController = async(req,res)=>{
    console.log("Inside view Category Controller");
    try {
        const allCategory = await categories.find()
        res.status(200).json(allCategory)
    } catch (error) {
        res.status(401).json(err)
        
    }
    
}

// add courses
exports.addProjectController = async (req,res)=>{
    console.log("Inside addProject Controller");
    const userId = req.userId
    console.log(userId);
    // console.log(req.body);
    const {courseName,description,category,instructorName,price} = req.body
    const courseImg = req.file.filename
    console.log(courseName,description,category,instructorName,price,courseImg);
    try {
        console.log();
        
        const categoryDoc = await categories.findOne({ categoryName: category });
        if (!categoryDoc) {
            return res.status(404).json("Category not found");
        }
            const categoryId = categoryDoc._id.toString()
        
            const newCourse = new courses({
                courseName,description,category,instructorName,price,courseImg,userId, categoryId
            })
            
            await newCourse.save()
            console.log();
            res.status(200).json(newCourse)
        
    } catch (err) {
        console.log(err);
        
        res.status(401).json(err)
    }

    
}

// user course view
exports.viewUserCourseController = async(req,res)=>{
    console.log("Inside view user project controller");
    const userId = req.userId
    const categoryId = req.params.categoryId
    // console.log(category);
    console.log(categoryId);
    
    
    try {
        const allUserCourse = await courses.find({userId, categoryId})
        res.status(200).json(allUserCourse)
    } catch (error) {
        res.status(401).json(error)
    }
    
}

// Edit Course

exports.editCourseController = async(req, res)=>{
    console.log("Inside editProjectController");
    const id=req.params.id
    const userId=req.userId
    const {courseName,description,category,instructorName,price}=req.body
    const reUploadCourseImg=req.file?req.file.filename:courseImg
    try
    {
        const updateCourse= await courses.findByIdAndUpdate({_id:id},{
            courseName,description,category,instructorName,price,courseImg:reUploadCourseImg,userId
        },{new:true})
        await updateCourse.save()
        res.status(200).json(updateCourse)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}

// delete course
exports.deleteCourseController = async(req,res)=>{
    console.log("Inside delete course controller");
    const {id}=req.params
    try
    {
        const deleteCourse = await courses.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCourse)
    }
    catch(err)
    {
        res.status(401).json(err)
    }
}