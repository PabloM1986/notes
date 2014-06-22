var express = require("express");
var config = require("./config.json");
var bodyparser = require("body-parser");
var app = express()

app.use(bodyparser.urlencoded());

require('./routes.js')(app, "routes");


var server = app.listen(config.port, function () {
   console.log("Server listening on %d", server.address().port);
});