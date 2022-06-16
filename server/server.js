import express from "express";
const auth = require("../build/auth")
const app = express();

app.use("*",auth)