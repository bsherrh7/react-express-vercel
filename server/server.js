import express from "express";
const auth = require("../build/auth")
const app = express();
const path = require('path');

const dirTree = require("directory-tree");
const tree = dirTree("./");
console.log("tree: ",tree);
console.log("auth: ",auth)

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));


app.use("*",auth)