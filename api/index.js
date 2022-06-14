const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')
const dirTree = require("directory-tree");
const fs = require("fs");
const App = require("../")
const reactDOMServer = require("react-dom/server");

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
            // point to the html file created by CRA's build tool
        const filePath = path.resolve(__dirname,'..', 'build', 'index.html');

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                console.error('err', err);
                return res.status(404).end()
            }

            // render the app as a string
            const html = reactDOMServer.renderToString(<App />);
            console.log("App: ",App)
            console.log("html: ",html)
            // inject the rendered app into our html and send it
            return res.send(
                htmlData.replace(
                    '<div id="root"></div>',
                    `<div id="root">${html}</div>`
                )
            );
        });
        res.render(path.join(__dirname, '../build/index.html')); 
    }

});

app.get('/*', (req, res) => {
    console.log("in all route");
    const tree = dirTree("./");
    console.log("tree: ", tree)
    const logged = false;
    if(logged===false){
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