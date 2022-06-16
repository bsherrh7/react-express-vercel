import express from "express";
const auth = require("../build/auth")
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));


app.use("*",auth)