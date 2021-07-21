const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');


// express session-used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');



app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name:'Codeial',
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000*60*100) }
  }))

  
// passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(passport.setAuthenticatedUser);



// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
