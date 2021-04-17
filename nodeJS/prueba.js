
// Información del sistema
var os = require('os');

console.log('Sistema operativo: ' + os.platform());
console.log('Versión del OS: ' + os.release());
console.log('Memoria total: ' + os.totalmem() + ' bytes');
console.log('Memoria libre: ' + os.freemem() + ' bytes');



// Crear fichero
var fs = require("fs");
let texto = "Esto es un texto\nY esto es la segunda línea."

// el tercer parámetro es una fucnión que se ejecutará cuando el método termine, si hay error, se crea el objeto error
// al contrario el objeto error será null
fs.writeFile("./nodeJS/texto1.txt", texto, function (error) {
    if (error) console.log(error);
    else console.log("Fichero creado.")
})
console.log("exit.")    // el método writeFile es asíncrono, por lo tanto, se ejecuta primero "exit" y luego "Fichero creado"


// Leer fichero
var fs = require("fs");
fs.readFile("./nodeJS/texto1.txt", leerFichero);
console.log("exit.")

function leerFichero(error, datos) {
    if (error)
        console.log(error);
    else {
        console.log(datos.toString());
    }
}


// Comprobar la existencia de un fichero
var fs = require("fs");
fs.exists("./nodeJS/texto1.txt", function (existe) {
    if (existe) { console.log("existe") }
    else { console.log("no existe") }
});

// consultar el estado (actualizacion del exists())
fs.stat("./nodeJs/texto.txt", function (error, estado) {
    if (error) console.log(error);
    else {
        console.log(estado);
    }
})


