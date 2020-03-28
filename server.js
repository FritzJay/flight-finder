const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use(
  createProxyMiddleware({
    target: "https://certify.amtrav.com/",
    pathRewrite: {
      "^/cities": "/ws/search/FindLocations"
    },
    changeOrigin: true,
    logLevel: "debug",
    headers: {
      "Content-Type": "application/json"
    }
  })
);

app.listen(3001, function() {
  console.log("CORS-enabled web server listening on port 3001");
});
