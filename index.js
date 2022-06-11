const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

const dirTree = require("directory-tree");

app.use(express.static(path.join('build')));
app.use(express.static(path.join('staticPages')));


app.get('/dashboard', isLoggedIn, (req, res) => {
    console.log("in dashboard routfdsfasfddse")
    console.log("__dirname: ",__dirname)
    const tree = dirTree("../");
    console.log("tree: ", tree)
    res.sendFile(path.join( './build/index.html')); 
});
app.get('/*', (req, res) => {
    console.log("in all routefsfdsfd");
    const tree = dirTree("../");
    console.log("tree: ", tree)
    res.sendFile(path.join( './staticPages/loginPage/index.html'));
});
app.get('/api/login', isLoggedIn, (req, res) => {
    console.log("in api/login route")
    const tree = dirTree("./");
    console.log("tree: ", tree)
    // TODO login + authentication logic
    res.sendFile(path.join( './build/index.html'));
});
app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

module.exports = app;