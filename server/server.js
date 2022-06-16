import express from "express";
const auth = require("../build/auth.js")
const app = express();
const path = require('path');

// const dirTree = require("directory-tree");
// const tree = dirTree("./build");
// console.log("tree: ",tree);
// console.log("auth: ",auth)

app.use("/auth",auth);
app.use("/*",(req, res)=>{
    console.log("in all routes");
    res.send("path.join(__dirname, '../static/pages/login/index.html')");
})

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));

module.exports = app;
