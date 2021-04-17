// module HTTP
var http = require('http');
// module for parsing URLs
var url = require('url');
// module for analysing parameters POST
var querystring = require('querystring');
// module File System
var fs = require('fs');
// module MYSQL
var mysql = require('mysql');
// public folder
const PUBLIC_HTML = './nodeJS/public'

var conexion = mysql.createConnection('mysql://yu:123@localhost:3306/pruebadaweb')

conexion.connect(function (error) {
	if (error)
		console.log('Problemas de conexion con mysql');
	else {
		var sql = "CREATE TABLE IF NOT EXISTS usuarios (nombre VARCHAR(255), clave VARCHAR(255), correo VARCHAR(255))";
		conexion.query(sql, function (error, resultado) {
			if (error) console.log(error);
			console.log(resultado);
		})
	}
});
//var conexion = mysql.createConnection({
//	host : 'localhost:3306',
//	user : 'yu',
//	password : '123',
//	database : 'pruebadaweb'
//});

var servidor = http.createServer(function (peticion, respuesta) {

	var objetourl = url.parse(peticion.url)
	console.log('path completo del recurso y parámetros:' + objetourl.path)
	console.log('solo el path y nombre del recurso :' + objetourl.pathname)
	console.log('parámetros del recurso :' + objetourl.query)

	// respuesta.writeHead(200, {
	// 'Content-Type' : 'text/html'
	// })
	//
	// respuesta.write('<!doctype html><html><head></head>')
	// respuesta.write('<body><h1>Hola Mundo</h1></body></html>')
	//
	// respuesta.end();

	// si es la ruta raíz se redirige al fichero index.html
	var ruta = PUBLIC_HTML + objetourl.pathname;
	if (ruta == PUBLIC_HTML + '/')
		ruta = PUBLIC_HTML + '/index.html';
	procesarPeticion(peticion, respuesta, ruta);
});

servidor.listen(8080);
console.log('Servidor web iniciado');


function procesarPeticion(peticion, respuesta, ruta) {
	if (ruta.endsWith('favicon.ico'))
		return;

	switch (ruta) {
		case PUBLIC_HTML + '/recuperardatos': {
			conexion.query(
				'select nombre, clave, correo from usuarios',
				function (error, filas) {
					if (error) {
						console.log(error); return;
					}
					for (let fila of filas) {
						respuesta.write(fila.nombre + ':' + fila.clave + '->' + fila.correo)
					}
					respuesta.end()
				});
			break;
		}
		case PUBLIC_HTML + '/test_mysql': {
			test_mysql(peticion, respuesta)
			break;
		}
		default: {
			try {
				respuesta.writeHead(200, {
					'Content-Type': 'text/html'
				})
				respuesta.write(fs.readFileSync(ruta))
				
			} catch (err) {
				respuesta.writeHead(404, {'Content-Type': 'text/html'});
				respuesta.write("<h1>Page Not Found</h1>")
				console.error(err)
			} finally{
				respuesta.end();
			}

		}
	}
}

function procesarFormulario(peticion, respuesta) {

	/* Para los métodos GET, los parámetros van en 'path/nomre=yu&clave=888'
	var nombre = url.parse(peticion.url, true).query.nombre;
	var clave = url.parse(peticion.url, true).query.clave;
	var correo = url.parse(peticion.url, true).query.correo;
	console.log(nombre)
	console.log(correo)

	var datosregistro = { nombre: nombre, clave: clave, correo: correo };
	*/

	var parametros = '';
	var datosregistro;
	peticion.on('data', function (datosParciales) {
		parametros += datosParciales;
	});

	peticion.on('end', function () {
		datosregistro = querystring.parse(parametros);	// querystring convierte los parámetros en un obj
		console.log(datosregistro)

		conexion.query(
			'insert into usuarios set ?',
			datosregistro,
			function (error, resultado) {
				if (error) {
					console.log(error);
					return;
				}
			});

		conexion.query(
			`select nombre, clave, correo from usuarios where correo='${datosregistro.correo}'`,
			function (error, filas) {
				if (error) {
					console.log(error); return;
				}
				for (let fila of filas) {
					respuesta.write(fila.nombre + ':' + fila.clave + '->' + fila.correo + "<br>")
				}
				respuesta.end()
			});

	})

	//respuesta.write(nombre + " -> " + clave)
	//respuesta.end()
}



function test_mysql(peticion, respuesta) {

	var datosregistro = { nombre: 'Javier', clave: 'MiClave', correo: 'fjavier@um.es' };

	conexion.query(
		'insert into usuarios set ?',
		datosregistro,
		function (error, resultado) {
			if (error) {
				console.log(error);
				return;
			}
		});

	conexion.query(
		'select nombre, clave, correo from usuarios',
		function (error, filas) {
			if (error) {
				console.log(error); return;
			}
			for (let fila of filas) {
				respuesta.write(fila.nombre + ':' + fila.clave + '->' + fila.correo)
			}
			respuesta.end()
		});
}


