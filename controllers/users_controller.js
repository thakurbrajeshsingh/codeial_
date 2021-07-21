const User = require('../models/user')

module.exports.profile = (req,res)=>{
    return res.render('profile',{
        title:'Profile'
    })
}

// render the signIn page
module.exports.signIn = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Login'
    });
}

// render the signUp page
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codial | Sign Up'
    });
}

// get the signup data
module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log("User Already Registered"); return }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log("User Cannot Be Registered"); return }
                return res.redirect('/users/sign-in')
            })
        }else{ 
            return res.redirect('back'); 
        }
    });
}


// get signIn data
module.exports.createSession = (req,res)=>{
    return res.redirect('/')
}