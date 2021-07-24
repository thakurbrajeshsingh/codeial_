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
const MongoDBStore = require('connect-mongodb-session')(session);
const sassMiddleware = require('node-sass-middleware');
// for splash notifcation
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');



// SASS Middle ware
app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix:'/css'  // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));





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


// mongo store  is used store session cookie in db


app.use(session({
    name:'Codeial',
    secret: 'blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge:(1000*60*100) },

        store :new MongoDBStore({
          mongooseConnection: 'mongodb://localhost/codeial_db',
          autoRemove : 'disabled'
        },
        (err,)=>{
          console.log(err || 'Connect MongoDb setup ok');
        }
        )
  }))

  
// passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(passport.setAuthenticatedUser);

// for displaying flash message
  app.use(flash());
  app.use(customMiddleware.setFlash);

// use express router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
