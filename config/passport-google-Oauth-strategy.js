const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: '470999630399-04cp7kjgiak5nhl1duvutj7pjj2moqdi.apps.googleusercontent.com',
    clientSecret: '2Ib484rBLkqsgi0CcM7H2W82',
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }, function (err, user) {
    if(err){
        console.log('Error in google strategy passport',err);
        return;
    }    
        console.log(profile);
        if(user){
        return done(err, user);
      }
      else{
          User.create({
              name:profile.displayName,
              email:profile.emails[0].value,
              password:crypto.randomBytes(20).toString('hex')
          },
          function(err,user){
            if(err){console.log('Error'); return;}
  
        return done(err, user);      
        })
      }
    });
  }
));





module.exports = passport;