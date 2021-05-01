// Boletin c

// Ejercicio 1

function validarDNI(numeros, letra) {
    let letras =  ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S',
    'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    numeros < 0 || numeros > 99999999 
    ? console.log("numeros erróneo.")
    : letraCorrespondiente = letras[numeros % 23];
    return letraCorrespondiente == letra;
}

var funcion1 = (function funcion3() {
    var dnisValidados = new Array();

    return function(teclado){
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
})();

funcion1("12345678 X");
funcion1("12345678 Z");
funcion1("12345678 Y");
funcion1("12345679 S");


// Ejercicio 2
function dobleDespuesDosSegundos(x) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x*x)
        }, 2000);
    })
}

async function doblarYSumar(a, b) {
    return await dobleDespuesDosSegundos(a) + await dobleDespuesDosSegundos(b);
}

doblarYSumar(2, 4) 
    .then(valor => {
        console.log(valor)
    })



// Ejercicio 3
class Punto{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Figura{
    constructor(punto){
        this.punto = punto;
    }
}


class Circulo extends Figura{
    constructor(punto, radio){
        super(punto);
        this.radio = radio;
    }
    calcularArea() {
		return Math.PI * this.radio * this.radio
	}
	calcularPerimetro() {
		return 2 * Math.PI * this.radio
	}
}

class Rectangulo extends Figura {
    constructor(verticeInferiorIzquierda, ladoX, ladoY){
        super(verticeInferiorIzquierda);
        this.ladoX = ladoX;
        this.ladoY = ladoY;
    }
    calcularArea() {
		return this.ladoX * this.ladoY;
	}
	calcularPerimetro() {
		return 2 * this.ladoX + 2 * this.ladoY;
	}
}

class Cuadrado extends Rectangulo {
    constructor(verticeInferiorIzquierda, lado){
        super(verticeInferiorIzquierda, lado, lado);
    }
}

var circulo = new Circulo(new Punto(0,0), 10)
console.log(`Circulo ${circulo.calcularArea()} ${circulo.calcularPerimetro()}`);

var rectangulo = new Rectangulo(new Punto(0,0), 6, 4)
console.log(`Rectangulo ${rectangulo.calcularArea()} ${rectangulo.calcularPerimetro()}`);

var cuadrado = new Cuadrado(new Punto(0,0), 5)
console.log(`Cuadrado ${cuadrado.calcularArea()} ${cuadrado.calcularPerimetro()}`);


// Ejercicio 4
var coordenada = /^\(\d{1,3},\d{1,3}\)$/ 
console.log(coordenada.test("(99,999)"))

var hora = /^\d\d:\d\d(:\d\d)?$/
console.log(hora.test("01:02"))

var correo = /^[a-z]*[@]{1}[a-z]*[\.]{1}[a-z]{2,3}$/
console.log( correo.test( "yuye@um.es"))

var dia_semana = new RegExp("^(([Ll]unes|[Mm]artes|[Mm]i[eé]rcoles|[Jj]ueves|[Ss][aá]bado|[Dd]omingo)|[0-6])$", "i")
var dni = new RegExp("^[0-9]{8}[T|R|W|A|G|M|Y|F|P|D|X|B|N|J|Z|S|Q|V|H|L|C|K|E]$")
var numero_hexadecimal = new RegExp("^[0-9A-F]+$")
var usuario_twitter = new RegExp("^@([A-Za-z0-9_]{1,15})$")
var ISBN = new RegExp("^(978|979)[0-9]{9}$")