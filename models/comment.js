const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    
    content:{
        type:String,
        required:true
    },
    // comments belongs to user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})


const Comment = mongoose.model('Commment',commentSchema);

module.exports = Comment