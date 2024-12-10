const mongoose = require('mongoose');

const questionPaperSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    fileUrl: { 
        type: String, 
        required: true 
    },
    courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Courses', 
        required: true 
    }
},);

const QuestionPaper = mongoose.model('QuestionPaper', questionPaperSchema);
module.exports = QuestionPaper;
