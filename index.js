const express = require('express');
const Port = 8000;



const app = express();


// use express routes
app.use('/',require('./routes'))

// setting up view ejs
app.set('view engine','ejs');
app.set('views','./views');












// Server Running  
app.listen(Port,(err)=>{
    if(err){
        console.log('Error || Cannot Connect To Express Server');
    }
    console.log(`Yup Server Running At Port ${Port}`);
});