var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/saveComic"] = requestHandlers.saveComic;

server.start(router.route, handle);