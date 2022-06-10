const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

app.use(express.static(path.join(__dirname,'build')));
app.use(express.static(path.join(__dirname,'staticPages')));

app.get('/*', (req, res) => {
    console.log("tree: ",_getAllFilesFromFolder(__dirname))
    res.sendFile(path.join(__dirname, './staticPages/loginPage/index.html'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
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