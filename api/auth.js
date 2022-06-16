import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import App from "./AppComponent/App";
  
const auth = async (req,res)=>{
    const isAuth=false;
    if(isAuth){
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
    } else{
        res.status(401).json({ msg: 'Must login' });
    }
 }
module.exports = auth