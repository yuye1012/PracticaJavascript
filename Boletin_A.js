
// Ejercicio 1
function funcion1(valor){
    let numero = valor.toString().trim();
    if (isNaN(numero)){
        console.log("El valor introducido no es un número.")
    }
    else {
        let n = parseInt(numero);
        if (n < 2 || n > 10)
            console.log(`El valor introducido: ${numero} está fuera del rango 2-10`);
        else {
            let total = 0, i = 0;
            do {
                i++;
                total+=i;
            } while (i<n)
            console.log(`El resultado1 es: ${total}`)

            total = 0;
            for (let x = 0; x <= n; x++) {
                total += x;
            }
            console.log(`El resultado2 es: ${total}`)
        }
    }
}

funcion1("a")
funcion1("20")
funcion1("5");


// Ejercicio 2
function miFuncion() {
    console.log(miVar);
    if (true) {
        // hay que poner var, porque si no pone nada, 
        // no se convertirá en una variable global estando dentro de la sentencia if sin poner nada
        var miVar = "Probando hoisting";    
    }
        console.log(miVar);
    };
miFuncion()




// Ejercicio 3
function validarDNI(numeros, letra) {
    let letras =  ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S',
    'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    numeros < 0 || numeros > 99999999 
    ? console.log("numeros erróneo.")
    : letraCorrespondiente = letras[numeros % 23];
    return letraCorrespondiente == letra;
}

var dnisValidados = new Array();

function funcion3(teclado) {
    var valores = teclado.split(" ")
    if (!validarDNI(valores[0], valores[1]))
        console.log("DNI no validado");
    else {
        dnisValidados[valores[0]] = valores[1];
        console.log("DNIs validados:");
        for (prop in dnisValidados) {
            console.log(`${prop}: ${dnisValidados[prop]}`)
        }
    }
}

funcion3("12345678 X");
funcion3("12345678 Z");
funcion3("12345678 Y");
funcion3("12345679 S");



// Ejercicio 4
function funcion4(teclado) {
    for (const caracter of teclado) {
        var er = /[0-9a-fA-F]/
        if (!er.test(caracter)){
            console.log(`${caracter} no es hexadecimal`)
            return;
        }
    }
    console.log("Todos son hexadecimales")
}

funcion4("abcd123")
funcion4("abcd123wz")



// Ejercicio 5
function funcion5(obj1, obj2) {

    if (obj1 == obj2)
        return true;
    let cad1 = convertirEnCadenas(obj1);
    let cad2 = convertirEnCadenas(obj2);
    console.log(cad1)
    console.log(cad2)
    return cad1 === cad2;
}

function convertirEnCadenas(obj) {

    let cadena = '';

    for (prop in obj){
        cadena += `\'${prop}\':`

        if (obj[prop] instanceof Object) {
            
            obj[prop] instanceof Array
            ? cadena += `[${obj[prop]}]`
            : cadena += `{${convertirEnCadenas(obj[prop])}}`

        } else {

            typeof obj[prop] == 'string'
            ? cadena += `\'${obj[prop]}\'`
            : cadena += `${obj[prop]}`
        }

        cadena += ','
    }
    return cadena.slice(0, -1);
}

let objeto1 = {
    'prop1' : 'hola',
    'prop2' : 3,
    'prop3' : [1,2],
    'prop4' : {"p1" : 1, "p2" : 2}
}

let objeto2 = {
    'prop1' : 'hola',
    'prop2' : 3,
    'prop3' : [1,2],
    'prop4' : {"p1" : 1, "p2" : 2}
}

let objeto3 = objeto2;

let objeto4 = {
    'prop1' : 'hola',
    'prop2' : 3,
    'prop3' : [1,2],
    'prop4' : {"p1" : 1, "p2" : 4}
}

console.log( funcion5(objeto1, objeto2))
console.log( funcion5(objeto1, objeto3))
console.log( funcion5(objeto1, objeto4))


