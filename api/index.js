import serverSideRenderer from "./routes/ssr"

const express = require('express');
const app = express();
const port = 3100;
const path = require('path');
const isLoggedIn = require('./isLoggedIn')
const dirTree = require("directory-tree");

app.set('views', __dirname + '../build');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));




const App = require("../build/App.js")
const React = require("react")
const renderToString = require("react-dom/server");
const hbs = require("handlebars");



app.get("/1", async (req, res) => {
  const theHtml = `
  <html>
  <head><title>My First SSR</title></head>
  <body>
  <h1>My First Server Side Render</h1>
  <div id="reactele">{{{reactele}}}</div>
  <script src="/app.js" charset="utf-8"></script>
  <script src="/vendor.js" charset="utf-8"></script>
  </body>
  </html>
  `;

  const hbsTemplate = hbs.compile(theHtml);
  const reactComp = renderToString(<App />);
  const htmlToSend = hbsTemplate({ reactele: reactComp });
  res.send(htmlToSend);
});








const waitSomeTime =(watiTimeMillisec)=>{
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), watiTimeMillisec);
    });
}

app.use("/1", serverSideRenderer);

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
    const tree = dirTree("./build");
    console.log("tree: ", tree)

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