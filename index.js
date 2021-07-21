const express = require('express');
const Port = 8000;
const expressLayouts = require('express-ejs-layouts');


const app = express();


// use express routes
app.use('/',require('./routes'))

// setting up view ejs
app.set('view engine','ejs');
app.set('views','./views');


app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);










// Server Running  
app.listen(Port,(err)=>{
    if(err){
        console.log('Error || Cannot Connect To Express Server');
    }
    console.log(`Yup Server Running At Port ${Port}`);
});