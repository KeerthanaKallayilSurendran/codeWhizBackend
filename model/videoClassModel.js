const mongoose = require('mongoose');

const videoClassSchema = new mongoose.Schema({
    classTitle: { 
        type: String, 
        required: true 
    },
    thumbnailUrl: { 
        type: String, 
        required: true 
    },
    
    videoLink: { 
        type: String, 
        required: true 
    },
    courseId: {
        type: String,
        required: true
    }
});

const VideoClasses = mongoose.model('VideoClasses', videoClassSchema);
module.exports = VideoClasses;
