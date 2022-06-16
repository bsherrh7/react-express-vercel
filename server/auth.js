import React from "react";
import express from "express";
import * as ReactDOMServer from 'react-dom/server';
import  App  from "./AppComponent/App";
const path = require('path');
const dirTree = require("directory-tree");

const tree = dirTree("./");
console.log("treeeee: ",tree);


    const waitSomeTime =(watiTimeMillisec)=>{
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), watiTimeMillisec);
        });
    }
    
const auth = async (req,res)=>{
    const app = ReactDOMServer.renderToString(<App />);
    const html = `
        <html lang="en">
        <head>
            <link rel="stylesheet" href="app.css">
            <script src="app.js" async defer></script>
        </head>
        <body>
            <div id="root">${app}</div>
        </body>
        </html>
    `
    const waitSomeTime =(watiTimeMillisec)=>{
        return new Promise((resolve) => {
            setTimeout(() => resolve(true), watiTimeMillisec);
        });
    }
    await waitSomeTime(4000)
    res.send(html);
 }

// router.get('/1', async (req, res) => {

//     // const app = ReactDOMServer.renderToString(<App />);
//     // const html = `
//     //     <html lang="en">
//     //     <head>
//     //         <link rel="stylesheet" href="app.css">
//     //         <script src="app.js" async defer></script>
//     //     </head>
//     //     <body>
//     //         <div id="root">${app}</div>
//     //     </body>
//     //     </html>
//     // `
//     // const waitSomeTime =(watiTimeMillisec)=>{
//     //     return new Promise((resolve) => {
//     //         setTimeout(() => resolve(true), watiTimeMillisec);
//     //     });
//     // }
//     // await waitSomeTime(4000)
//     res.send("html");
// });
module.exports = auth