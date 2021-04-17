
// Un cierre (closure) es una función que tiene acceso al ámbito
// principal, incluso después de que la función principal se haya
// cerrado



/*
-  A la variable add se le asigna el valor de retorno de una función de
   invocación automática.
-  La función de invocación automática solo se ejecuta una vez.
-  Establece el contador en cero (0) y devuelve una expresión de función.
-  De esta forma, add se convierte en una función. La parte "maravillosa"
   es que puede acceder al contador en el ámbito principal.
-  Esto se llama cierre (closure) de JavaScript.
-  Permite que una función tenga variables "privadas".
-  El contador está protegido por el alcance de la función anónima y solo
   se puede cambiar con la función de agregar.
*/
var add = (function () {
    var cont = 0;
    return function(x) {
        console.log("valor x = " + x)
        return ++cont;
    }
}) ();      // invocación automática para ejecutar la función interna (return function() {return ++cont;}) 
            // devuelta por la función externa

console.log(add(8))  // 1
console.log(add(9))  // 2
console.log(add(10))  // 3









// HERENCIA
// prototype -> propiedad de una función
// __proto__ -> propiedad de un objeto

function Employee() {
    this.name = "";
    this.dept = "general";
}

function WorkBee() {
    // propiedades locales
    this.proyects = [];
}

// propiedades en prototipo
WorkBee.prototype = new Employee();
WorkBee.prototype.salary = 1000;

/*
La búsqueda de propiedades en la cadena de prototipos comienza en las propiedades locales del
objeto y si no se encuentran localmente, se busca a través de la propiedad __proto__ del objeto.
*/

var wb = new WorkBee();     // wb.__proto__ = WorkBee.prototype = {Employee.prototype, salary: 1000}

console.log(wb.age) // undefined

// se modifica la propiedad prototipo "age" de Employee, como los objetos de WorkBee utiliza a Employee como prototipo,
// a los objetos de WorkBee también les añadirá la propiedad "age", que será buscada y encontrada recursivamente con
// .__proto__.__proto__ (primer proto son aquellas propiedades prototipadas en WorkBee 
// mientras las segundas son las guardadas en Employee)
Employee.prototype.age = 18;

console.log(wb.age) // 18
console.log(wb.__proto__)   // Employee { name: '', dept: 'general', salary: 1000 }
console.log(wb.__proto__.__proto__) // Employee { age: 18 }


console.log(wb instanceof Employee)
console.log(wb instanceof WorkBee)
console.log(wb instanceof Object)
console.log(wb instanceof String)











// Declaración de clase a partir del ECMAScript2015

// Nombrada
class Punto {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Los métodos estáticos son llamados sin instanciar su clase y no pueden ser llamados mediante una
    // instancia de clase.
    static nombre(){
        return "Soy la clase Punto"
    }
}

console.log(Punto.nombre())


// Anónima
var Rectangulo = class {
    constructor(alto, ancho){
        this.alto = alto;
        this.ancho = ancho;
    }

    area(){
        return this.alto * this.ancho;
    }
}

var rec = new Rectangulo(5, 10)
console.log(rec.area());



// herencia basada en clases -> extends
class Figura {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    datos(){
        this.area = this.x * this.y;    // añade la propiedad area
        return "datos 2D = { x: "+ this.x + ", y:" + this.y + " }";  
    }
}

class Cubo extends Figura {
    constructor(x, y, z){
        super(x, y);
        this.z = z;
    }

    datos(){
        return super.datos() + "\ndatos 3D = { z: "+ this.z + "}";
    }
}

var cubo = new Cubo(1, 2, 3);
console.log(cubo.datos());
console.log(cubo.area);