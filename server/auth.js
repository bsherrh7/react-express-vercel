import React from "react";
import express from "express";
import * as ReactDOMServer from 'react-dom/server';
// import  App  from "./App";
const path = require('path');
const dirTree = require("directory-tree");
const router = express.Router();

router.get('*',(req,res)=>{
    const tree = dirTree("./");
    console.log("tree: ",tree);
    console.log("in auth !!");
    res.sendFile(path.join(__dirname, '../static/pages/login/index.html'));
})

router.get('/1', async (req, res) => {

    // const app = ReactDOMServer.renderToString(<App />);
    // const html = `
    //     <html lang="en">
    //     <head>
    //         <link rel="stylesheet" href="app.css">
    //         <script src="app.js" async defer></script>
    //     </head>
    //     <body>
    //         <div id="root">${app}</div>
    //     </body>
    //     </html>
    // `
    // const waitSomeTime =(watiTimeMillisec)=>{
    //     return new Promise((resolve) => {
    //         setTimeout(() => resolve(true), watiTimeMillisec);
    //     });
    // }
    // await waitSomeTime(4000)
    res.send("html");
});

module.exports = router