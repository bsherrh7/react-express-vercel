import express from "express";
const auth = require("../build/auth.js")
const app = express();
const path = require('path');

const dirTree = require("directory-tree");
const tree = dirTree("./build");
console.log("tree: ",tree);
console.log("auth: ",auth)

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));


app.use("/*",auth)
