var fs = require("fs");
var request = require("request");
var querystring = require("querystring");
var Kaiseki = require('kaiseki');

var APP_ID = 'uKoPYsEPCuxyfZT3M5lyTytsiyZij0RHCSY1VuZ4';
var REST_API_KEY = 'UJtTnhM2AKYmQTgAYtTeRpbJs9kScfLSY9BJKgsC';

var kaiseki = new Kaiseki(APP_ID, REST_API_KEY);

function start(req, resp, postData) {
    "use strict";
    console.log("req handler 'start' was called.");

    if (req.method === 'GET') {
        var s = fs.createReadStream("./comicEntryForm.html");
        s.on('error',function() {
            resp.writeHead(404);
            resp.end();
        });
        s.once('fd', function() {
          resp.writeHead(200);
        });
        s.pipe(resp);
    }
}

function saveComic(req, resp, postData) {
  console.log("Request handler for 'saveComic' was called.");
  var cName = querystring.parse(postData).comicName;
  var wName = querystring.parse(postData).writerName;
  var issueNo = parseInt(querystring.parse(postData).issueNo);
  var pub = querystring.parse(postData).publisher;
  console.log("PData: " + postData);
  var comic = {
    comicName: cName,
    writer: wName,
    issue: issueNo,
    publisher: pub
  }
  
  console.log(cName + ":" + wName + ":" + issueNo + ":" + pub);
  kaiseki.createObject('Comics', comic,
    function(err, response, body, success) {
      console.log('object created = ', body);
      console.log('object id = ', body.objectId);
      console.log(err);
    });
  resp.writeHead(200, {"Content-Type": "text/plain"});
  resp.write("Comic saved " + querystring.parse(postData).comicName);
  resp.end();
}

exports.start = start;
exports.saveComic = saveComic;