const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.create = function(req,res){

    Post.findById(req.body.post,(err,post)=>{
        if(err){console.log('Error While commenting');return }
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.body._id
            },(err,comment)=>{
                if(err){console.log('Cannot Comment'); return }

                post.comments.push(comment);
                post.save();


                res.redirect('/')
            })
        }
    })





}