function route(handle, pathname, req, resp, postData) {
  "use strict";
  if (typeof handle[pathname] === 'function') {
    return handle[pathname](req, resp, postData);
  }
  else {
    console.log("No req handler found for " + pathname);
	resp.writeHead(404, {"Content-Type" : "text/plain"});
	resp.write("404 Not found");
	resp.end();
	}
}

exports.route = route;