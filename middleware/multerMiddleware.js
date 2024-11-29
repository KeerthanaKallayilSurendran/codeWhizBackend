// import multer 
const multer = require('multer')
// create storage space for stroring file using diskStorage method
const storage = multer.diskStorage({
    destination: (req,res,callback)=>{
        // define the source of storing the uploding file
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        // to change the file using this callback function
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})

//created a multer instance using the storage
const multerMiddleware = multer({
    storage
})

// export the middleware
module.exports = multerMiddleware