const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const app= express();
const url = 'mongodb://localhost/MovieDB'
const cors = require("cors");
app.use(cors())

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on("open",()=>{
    console.log("Server Connected")
})

app.use(express.json())

app.use('/',require('./router/user'));

app.listen(5000,()=>{
    console.log("server Started")
})


module.exports = app;

