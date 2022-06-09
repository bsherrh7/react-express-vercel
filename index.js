const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')

app.use(express.static('build'))
app.use(express.static(path.join(__dirname,'staticPages')));

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './staticPages/loginPage/index.html'));
});

app.get('/*', isLoggedIn, (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, 'build')});
});

app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

module.exports = app;