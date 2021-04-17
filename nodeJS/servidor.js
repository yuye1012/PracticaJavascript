
var http = require("http");
var url = require("url");

var servidor = http.createServer(function (peticion, respuesta) {

    console.log("recibido la petición al url: "+peticion.url);
    var objUrl = url.parse(peticion.url);

    console.log("path completo: "+objUrl.path);
    console.log("path: "+ objUrl.pathname);
    console.log("parámetros: "+objUrl.query);


    respuesta.writeHead(200, {"Content-Type": "text/html"});
    respuesta.write('<doctype html><html><head></head>'+'<body><h1>Hola mundo</h1></body></html>');
    respuesta.end();
})

servidor.listen(8080);
console.log("Server listening in port 8080");