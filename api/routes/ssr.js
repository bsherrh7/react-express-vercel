const express = require("express");
const App = require("../../build/App.js")
const React = require("react")
const renderToString = require("react-dom/server");
const hbs = require("handlebars");

const router = express.Router();

router.get("/", async (req, res) => {
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

export default router;