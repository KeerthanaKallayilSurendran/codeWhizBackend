const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        require: true
    }
})

const categories = mongoose.model("categories", categorySchema)
module.exports = categories