const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');



passport.use(new LocalStrategy({
  usernameField:'email'
},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) { //email(db) : form email
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user || user.password != password ) { return done(null, false); }
        return done(null, user);
      });
    }
  ));



//   serialize User

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  
//   deserialize User
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });