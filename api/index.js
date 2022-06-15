const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')
const dirTree = require("directory-tree");
app.set('views', __dirname + '../build');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const readFileSync = require('fs');

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));


const waitSomeTime =(watiTimeMillisec)=>{
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), watiTimeMillisec);
    });
}

app.get('/api/isClientAuth', isLoggedIn, async (req, res) => {
    console.log("in api/validate route")
    // TODO login + authentication logic
    let isAuthenticated = true;
    await waitSomeTime(1000).then()
    if(!isAuthenticated){
        res.status(401);
    } else{

        res.render(path.join(__dirname, '../build/index.html')); 
    }

});

app.get('/*', (req, res) => {
    console.log("in all route");
    const tree = dirTree("./");
    console.log("tree: ", tree)
    const file = path.join(process.cwd(), 'src', 'test.json');
    const stringified = readFileSync(file, 'utf8');
    console.log("file: ",file)
    console.log("stringified: ", stringified)
    if(true){
        res.sendFile(path.join(__dirname, '../static/pages/login/index.html'));
    } else{
        res.sendFile(path.join(__dirname, '../build/index.html')); 
    }
    
});

app.listen(port, ()=>{
    console.log(`Server now listening at htttp://localhost:${port}`);
})

// router.use('^/$', serverRenderer);
// router.use('*', serverRenderer);

module.exports = app;