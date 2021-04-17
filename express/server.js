
var express = require("express");

var app = express();

app.get('/', function (peticion, respuesta) {
    respuesta.send("<h1>Hola mundo</h1>");
});

var server = app.listen(8080, function () {
    console.log("Server listening on port 8080");
})