const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
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