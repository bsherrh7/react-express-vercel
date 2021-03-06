import React from "react";
import * as ReactDOMServer from 'react-dom/server';
import App from "./AppComponent/App";
  
const auth = async (req,res)=>{
    const isAuth=true;
    console.log("App: ",App)
    if(isAuth){
        console.log("through isAuth")
        const app = ReactDOMServer.renderToString(<App />);
        console.log("through isAuth 2")
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
        res.send(401, 'string');
    }
 }
module.exports = auth