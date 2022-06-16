import express from "express";
const auth = require("../build/auth.js")
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));

app.use("/auth",auth);
app.use("/*",(req, res)=>{
    res.send(path.join(__dirname, '../static/pages/login/index.html'));
})

module.exports = app;
