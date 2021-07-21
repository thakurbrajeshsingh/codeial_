const express = require('express');
const Port = 8000;



const app = express();


app.listen(Port,(err)=>{
    if(err){
        console.log('Error || Cannot Connect To Express Server');
    }
    console.log(`Yup Server Running At Port ${Port}`);
});