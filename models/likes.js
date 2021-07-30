const mongoose = require('mongoose');



const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId
    },
    likeable :{
        type:mongoose.Types.ObjectId,
        required: true,
        refPath:'onModel'
    },
    // this field is used to define the type of the liked object since its dynamic
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;