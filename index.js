const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

app.use(express.static(path.join(__dirname,'build')));
app.use(express.static(path.join(__dirname,'staticPages')));

let isLoggedInCount =0;
app.get('/dashboard', isLoggedIn, (req, res) => {
    if(isLoggedInCount===1){
        res.sendFile(path.join(__dirname, './build/index.html'));
    } else {
        isLoggedInCount++;
        res.redirect('/login');
    }
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './staticPages/loginPage/index.html'));
});

app.get('/api/login', isLoggedIn, (req, res) => {
    // TODO login + authentication logic
    res.redirect('/dashboard');
});

app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

var _getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });

    return results;

};

module.exports = app;