module.exports.profile = (req,res)=>{
    return res.end('<h1>Users || Profile Page </h1>');
}

// render the signIn page
module.exports.signIn = (req,res)=>{
    return res.render('user_sign_in',{
        title:'Codeial | Login'
    });
}

// render the signUp page
module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up',{
        title:'Codial | Sign Up'
    });
}

// get the signup data
module.exports.create = (req,res)=>{
// todo later
}


// get signIn data
module.exports.createSession = (req,res)=>{
// todo later
}