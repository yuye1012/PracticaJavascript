/*
    PRUEBAS PARA JS
*/


// igualdad
// == -> si comparar 2 objetos, se compararán sus referencias, 
//       si se comparan 2 tipos primitivos, realiza la conversión de tipos (si hace falta)
// === -> comparación estricta, sin conversion de tipos
console.log("3" == 3);
console.log("3" === 3);

// los valores: false, 0, "", NaN, null y undefined son falsos
// el resto son verdaderos
if ("" || null || undefined || false || 0 || NaN){
  console.log("v")
} else{
  console.log("f")
}





// USO DEL SWITCH CON UNA CADENA
var cad = "dos";

switch (cad) {
    case "uno":
        console.log("es un uno")
        break;

    case "dos":
        console.log("es un dos")
        break;

    default:
        console.log("nada")
        break;
}





// USO DE FOR..IN, FOR..OF, FOR..EACH
// FOR...IN -> PARA ITERAR LAS PROPIEDADES DE UN OBJETO
var obj = { a: 1, b: 2, c: 3 };
for (const prop in obj) {
  console.log(`obj.${prop} = ${obj[prop]}`);
}

for (const prop in obj) {
  console.log("obj." + prop + "=" + `${obj[prop]}`);
} // Salida: "obj.a = 1" "obj.b = 2" "obj.c = 3"

// USO DE FOR...OF -> PARA ITERAR ELEMENTOS DE UNA COLECCIONES COMO ARRAY O STRING, etc
let iterable = [10, 20, 30];
for (let value of iterable) {
  value += 1; // NO MODIFICA EL VALOR ORIGINAL
  console.log(value);
} // 11 21 31

iterable = "boo";
for (let value of iterable) {
  console.log(value);
} // b o o





// USO DE LAS VARIABLES
// var -> declarar una variable normal
// let -> declarar una variable en uso dentro de un bloque de código
// const -> declarar una constante de sólo lectura en un ámbito de bloque de código
// si a una variable no se le asigna o declarar con un valor usando var o let, automáticamente se crea una variable 
// global con ese identificador y su valor, si colisiona entre el global y el local, coge primero el local

function calculo() {
  var v1 = 1;   // v1 es local
  v2 = v1 + 100; // v2 es global
}

calculo();  // si no se ha ejecutado la función, v2 no está definido
console.log(v2) // salida: 11

v1 = 2;  // v1 global
obj = {
  "p1": "propiedad1"
}

function calculo2() {
  v3 = v1 + 20; // v3 es global
  console.log(v3) // salida: 22
  console.log(obj)
  v1++;
}

console.log(calculo2()) // salida: undefined porque la funcion no devuelve nada
console.log(v1) // salida: 3

function local(){
  _global = 10;
  let _local = 20;
  _global++;
  _local++;
}

local();
console.log(_global); // salida: 11
console.log(_local); // salida: ReferenceError





// HOISTING
// Las variables declaradas por var serán undefined antes de su asignación de un valor
// let y const no pueden hacer eso

(function () {
  console.log(myvar); // ReferenceError

  console.log(x)
  let x = 3;  // ReferenceError
})();

(function () {
  console.log(myvar); // undefined
  var myvar = "local value";
})();

// Para las funciones, se hace hoisting con su declaracion y no su contenido
foo(); // "bar"
function foo() {
  console.log("bar");
}

baz(); // TypeError: baz no es una función
var baz = function () {
  console.log("bar2");
};





// Tipo de datos
// typeof -> para ver el tipo de dato almacenado en la variable
var v1 = "hola mundo";
console.log(typeof(v1));

// numéricos
// Infinity y –Infinity : demasiado grandes y JavaScript no puede manejar
// NaN: Not a number: para comprobar si una variable almacena datos del tipo numéricos o no
var v1 = Infinity;
console.log(typeof(v1)); // number
console.log(isNaN(v1)); // false

// cadenas
var cadena = "" + 3;
console.log(cadena);  // "33"
var c = true;
console.log(c.toString()) // "true"

var suma = parseInt(cadena)+5;
console.log(suma)









// Symbol -> como una funcion hash que crea un identificador unico (aunque tenga la misma entrada)
//           para envolver un dato primitivo (string o integer) inmutable
var sym = Symbol("foo")
console.log(typeof(sym))
console.log(sym === Symbol("foo"))
var sym2 = new Symbol(); // TypeError





// Object -> clase principal del resto de clases
// conversion explícita de los tipos correspondientes
var numero = new Object(5); // numero es de tipo Number
var cadena = new Object("hola mundo");// cadena es de tipo String
var conectado = new Object(false); // conectado es de tipo Boolean





// clase String
var mystring = "Hello, World!";
mystring[0] = 'L' // No produce ningún efecto, en JS, los string son inmutables -> funcion replace
console.log(mystring[0])
// expresiones incrustadas -> () o `${}`
var a = 5;
var b = 10;
console.log("Quince es " + (a + b));
console.log('Quince es '+`${a + b}`);





// clase array
// diferentes creaciones
var array = new Array(); 
var array1 = ["juan", 5, false];
var array2 = new Array(10); 
var array3 = new Array(2, "abc");
// array asociativo -> indexación con cadenas, no ocupa el tamaño total del arrya
var asociativo = new Array();
asociativo["valor1"] = "uno"   // no aumenta el tamaño del array
asociativo[0] = 8;    // aumenta una posicion del array
asociativo[20] = "hello"  // aumenta el tamaño del arrya hasta la posicion 20 (las posiciones del medios son undefined)
asociativo.pop();

console.log(asociativo.valor1)  // salida: uno
console.log(asociativo)  // salida: [ valor1: 'uno' ]
console.log(asociativo.length)  // salida: 21
console.log(asociativo[5])  // salida: undefined

// array que guarda una funcion como un elemnto
asociativo.unaFuncion = function() {
  console.log("el valor del primer elemento del array es: "+this[0])  // usa this para referirse al objeto invocado
}
// invocar la funcion guardada
asociativo.unaFuncion()



// anidacion de objetos-arrays
var Aplicacion = new Object();
Aplicacion.Modulos = new Array();
Aplicacion.Modulos[0] = new Object();
Aplicacion.Modulos[0].titulo = "Lector RSS";
var inicial = new Object();
inicial.estado = 1;
Aplicacion.Modulos[0].objetoInicial = inicial;
console.log(Aplicacion)



// FECHAS
var fecha = new Date(2021,2,15,18,44);
console.log(fecha)  // 2021-04-15T16:44:00.000Z
fecha.setDate(fecha.getDate() + 30);  // sumar 30 días a la fecha
console.log(fecha)  // 2021-05-15T16:44:00.000Z

var options = { 
                weekday: 'long',  // dia de la semana
                year: "numeric", 
                month: "2-digit",
                day: "2-digit", 
                hour: "2-digit",
                minute: "2-digit", 
                hour12: false  // para el formato 24h o 12h con AM-PM
};
var americanDateTime = new Intl.DateTimeFormat("en-us", options);
console.log(americanDateTime.format(fecha)); // Wednesday, 04/14/2021, 18:44





// FUNCION
// uso explícito
var suma = new Function("a","b", "return a + b");
console.log(suma(1,2))


// declaracion 
function suma(a, b) {
  return a + b;
}
var res = suma(2,3);


// función anónima
var func_suma = function (a, b) {
  return a + b;
}
console.log(func_suma(3,5))


// argumentos de una funcion
function func(param) {
  console.log(arguments.length) // número de parámetros dados para ejecutar la función
  console.log(arguments[0])     // primer parámetro dado para ejecutar la función
  console.log(arguments.callee) // función ejecutada
  console.log(arguments.callee.length)  // número de parámetros definidos para ejecutar la función

  arguments.length === 2 ?  
    console.log("fin") :
    arguments.callee("a", "b") // para ejecutar la función invocada -> recursividad
}
func(1, 2, 3)


// recursividad llamando a la funcion
function recursividad(x) {
  console.log(x)
  x === 0 ? console.log("fin") : recursividad(--x);
}
recursividad(2);


// recursividad llamando a la variable
var rec = function recursividad(x) {
  console.log(x)
  x === 0 ? console.log("fin") : rec(--x);
}
rec(2)


// funcion eval()
var x = 2, y = 4;
console.log(eval("x + y"));
// Llamada directa, utiliza el ámbito local, el resultado es 6
var geval = eval;
console.log(geval("x + y"));
// Llamada indirecta, utiliza el ámbito global, através de ReferenceError por que `x` es indefinida


// funciones apply() y call() -> ejecuta una función como un método de un objeto
function func(x) {
  console.log(arguments)

  for (let a in arguments)
    this.numero += arguments[a]
    
  return this.numero;
}
var obj = {
  numero: 0
}
console.log(func.call(obj, 4))  // call() pasa como parámetro el objeto invocado y los parámetros
console.log(func.apply(obj, [1, 2 ,3])) // apply() hace lo mismo pero los parámetros son un array



// anidación de funciones, las funciones internas pueden acceder a las variables/parámetros 
// de la función contenedora, pero no al revés
function A(x) {
  console.log("método A recibe: "+ x)

  function B(y) {
    console.log("método B recibe: "+ y)

    function C(z) {
      console.log("método C recibe: " + z)
      console.log("total: "+ (x + y + z));
    }

    C(3);
  }

  B(2);
}

A(1); 





// funciones flechas
var f = () => {
  console.log("función flecha")
}
f()

var array = ["a", "bb", "ccc"];
var a2 = array.map(function (s) {
return s.length;
});
var a3 = array.map((s) => s.length);
console.log(a3)


function Person() {
  this.age = 0;

  // setInterval() es una función que tiene como parámetro 
  // un manejador (en este caso aumenta age y imprimirlo) 
  // y un timeout (1s) para volver a ejecutar

  setInterval(() => {     
    this.age++;
    console.log(this.age)
  }, 1000);
}
var p = new Person();





// parámetros/argumentos indefinidos
function multiplicar(mult, ...valores) {
  return valores.map(valor => valor * mult);
}
console.log(multiplicar(2, 1, 2, 3))





// Array y programación funcional
var array = [10, 20, 300, 400];

array.forEach(e => console.log(e)); // 10, 20, 300, 400
const result = array.filter(e => e > 20); // result = [ 300, 400 ]
const found = array.find(e => e > 10 ) // found = 20 (sólamente devuelve el primer elemento encontrado)

var array = [1, 2, 3]
console.log( array.map(e => e * 2)) // [2, 4, 6]

var fa = [[1,1], [2,2], [3,3]]
console.log( fa.flat(1))  // [ 1, 1, 2, 2, 3, 3 ]


