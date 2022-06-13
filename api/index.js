const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

const dirTree = require("directory-tree");


app.use(express.static(path.join(__dirname,'..','staticPages')));
app.use(express.static(path.join(__dirname,'..','build')));


app.get('/*', (req, res) => {
    console.log("in all route");
    const tree = dirTree("./");
    console.log("tree: ", tree)
    const logged = true;
    if(logged===false){
        res.sendFile(path.join(__dirname, '../staticPages/loginPage/index.html'));
    } else{
        res.sendFile(path.join(__dirname, '../build/index.html'),); 
    }
    
});
app.get('/api/validate', isLoggedIn, (req, res) => {
    console.log("in api/validate route")
    // TODO login + authentication logic
    let isAuthenticated = false;
    if(!isAuthenticated){
        res.status(401);
    } else{
        res.sendFile(path.join(__dirname, '../build/index.html'));
    }
});
app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

module.exports = app;