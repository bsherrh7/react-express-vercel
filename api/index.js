const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

const dirTree = require("directory-tree");

app.use(express.static(path.join(__dirname,'staticPages')));
app.use(express.static(path.join(__dirname,'build')));

app.get('/dashboard', isLoggedIn, (req, res) => {
    console.log("in dashboard route")
    const tree = dirTree("../");
    console.log("tree: ", tree)
    res.sendFile(path.join(__dirname, './build/index.html')); 
});
app.get('/*', (req, res) => {
    console.log("in all route");
    const tree = dirTree("../");
    console.log("tree: ", tree)
    res.sendFile(path.join(__dirname, '../staticPages/loginPage/index.html'));
});
app.get('/api/login', isLoggedIn, (req, res) => {
    console.log("in api/login route")
    const tree = dirTree("../");
    console.log("tree: ", tree)
    // TODO login + authentication logic
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

module.exports = app;