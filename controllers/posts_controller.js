const Post = require('../models/post')
const Comment = require('../models/comment');



module.exports.create = async function(req, res){
    
    try {
        
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    
// check if its  xhr request 
    if(req.xhr){
        return res.status(200).json({
            data :{
                post : post
            },message:'Post created!'
        });
    }



    return res.redirect('back');
        
    } catch (err) {
        console.log('Error',err);
        return ;
    }   
}

// For deleting post
module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id)
    
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id});
  
// check if its  xhr request 
if(req.xhr){
    return res.status(200).json({
        data :{
            post_id : req.params.id,
        },message:'Post Deleted!'
    });
}

            req.flash('success','Posts and comments deleted:')
                return res.redirect('back')
        }else{
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error',err)
    }
}