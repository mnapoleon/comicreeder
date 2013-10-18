var http = require('http');
var url = require('url');

function start(route, handle) {
  "use strict";
  
  function onRequest(req, resp) {
    console.log("Request received");
    var pathname = url.parse(req.url).pathname;
    
    var postData = "";
    
    req.setEncoding("utf8");

    req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+
      postDataChunk + "'.");
    });

    req.addListener("end", function() {
      route(handle, pathname, req, resp, postData);
    });
  }
  
  http.createServer(onRequest).listen(process.env.PORT);
  console.log("ComicParse started.....");
}

exports.start = start;