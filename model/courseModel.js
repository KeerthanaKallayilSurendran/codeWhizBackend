const mongoose = require('mongoose');

// Define Course Schema
const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.String,
        ref: 'categories',
        required: true
    },
    price: {
        type: String,
        required: true
    },
    instructorName: {
        type: String,
        required: true
    },
    courseImg: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    videoClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VideoClass'
    }], 
    questionPapers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionPaper'
    }], 
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }] 
}, { timestamps: true });

const Courses = mongoose.model("Courses", courseSchema);
module.exports = Courses;
