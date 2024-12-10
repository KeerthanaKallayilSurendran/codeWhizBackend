const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
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

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;
