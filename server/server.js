import React from "react";
import express from "express";
import * as ReactDOMServer from 'react-dom/server';
// import  App  from "./App";
const path = require('path');
const dirTree = require("directory-tree");
const app = express();

app.use(express.static(path.join(__dirname,'..','static/pages/login')));
app.use(express.static(path.join(__dirname,'..','build')));



app.get("/login",(req,res)=>{
    const tree = dirTree("./");
console.log("tree: ", tree)
  const html =`
  <html>
    <head>
        <link href="https://fonts.cdnfonts.com/css/product-sans" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <link rel="stylesheet" href="login-page.css">
    </head>
    <title>Basetwoo</title>
    <body>
        <div id="container">
            <span id="loading-text">Loading</span>
            <div class="lds-dual-ring"></div>
        </div>
        <script>
            const LOCAL_STORAGE_KEYS ={
                ID_TOKEN: "ID_TOKEN",
            }
            const isClientAuth = () => {
                let id_token = localStorage.getItem(LOCAL_STORAGE_KEYS.ID_TOKEN)
                const url = "/1";
                console.log("url: ",url);
                axios.get(url)
                .then(res => {
                    if(res.status===200){
                        console.log("page", res.data)
                        document.write(res.data);

                    }
                })
                .catch(error => console.error(error));
            };
            isClientAuth();
        </script>
    </body>
</html>`
res.send(html)
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname, '../static/pages/login/index.html'));
})

app.get('/1', async (req, res) => {

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


app.listen(4000,()=>{
    console.log("running on 4000!")
});