// JS simula constructor como en java a través de las funciones

function Factura(idFactura, idCliente) {
  this.idFactura = idFactura; // asigna los valores de cada propiedad del objeto mediante this
  this.idCliente = idCliente;
  this.muestraCliente = function () {   // las funciones se crearán de nuevo para cada objeto creado
    console.log(this.idCliente);
  };
  this.muestraId = function () {
    console.log(this.idFactura);
  };
}
var laFactura = new Factura(3, 7);
console.log(laFactura);

// prototype es un objeto interno de todos los objetos -> se accede como static en java
// todas las propiedades y métodos del prototype se hereden 
Factura.prototype.muestraCliente = function() {
  console.log(this.idCliente);
}
Factura.prototype.muestraId = function() {
  console.log(this.idFactura);
}

laFactura.muestraCliente();
console.log(Factura.prototype)

/*
// Cualquier clase nativa de JavaScript puede ser modificada mediante la propiedad prototype
String.prototype.trim = function() {
  return this.replace("/^\s*|\s*$/g", '');
}
*/

// diferencia entre typeof y instanceof
// typeof -> devuelve el tipo, que puede ser los tipos primitivos o el tipo object
// instanceof -> devuelve true o false del tipo a comprobar
console.log(typeof "") // string
console.log(typeof laFactura) // object
console.log(new String("") instanceof String) // true
console.log(laFactura instanceof String) // false






// Errores

 /*
// Errores core en JavaScript:
-  EvalError: al usar funcion eval()
-  InternalError: error interno en el motor de JavaScript
-  RangeError: error numérico, fuera de rango
-  ReferenceError: derefernciar una referencia ya inválida
-  SyntaxError: error de sintáxis al parsear código en eval()
-  TypeError: variable o parámetro no es de tipo válido
-  URIError: parámetros no válidos a encodeURI() o decodeURI()
*/

function UserException(message) {
   this.message = message;
   this.name = 'UserException';
  }
UserException.prototype.toString = function() {
   return  this.name+" : "+this.message // `${this.name}: "${this.message}"`;
 }

var verificar = (x) => {
  if (x < 0 || x > 10)
    throw RangeError ("valor fuera del rango")
  else
    throw new UserException("valor dentro del rango")
}

try {

  verificar(5)

} catch (error) {   // se ejecuta si produce el error/exception

  // Capturar errores específicos
  if (error instanceof UserException)
    console.error("se ha producido un error -> " + error.toString())
  else 
    console.error("error desconocido")

} finally {  // se ejecuta siempre
  console.log("exit...")
}

