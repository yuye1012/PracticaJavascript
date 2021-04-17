
/*

una promesa es un objeto que es retornado inmediatamente tras una llamada asíncrona a 
una función y que representa el posible valor (promesa) que se obtendrá de la llamada.

Para crear una prosema, se da 2 parámetros, resolve y reject. El primero para finilizar
la prosema correctamente mientras la segunda para cuando falla la promesa con un error.

Estados de un objeto Promise:
-  pending: Estado inicial, no terminada exitosamente ni rechazada.
-  fulfilled: operación exitosa.
-  rejected: operación fallida.
-  settled: Promise ha sido exitosa o fallida, pero no está pendiente


States of XmlHttpRequest:

0 	UNSENT:             代理被创建，但尚未调用 open() 方法。
1 	OPENED 	open():     方法已经被调用。
2 	HEADERS_RECEIVED:   send() 方法已经被调用，并且头部和状态已经可获得。
3 	LOADING: 	        下载中； responseText 属性已经包含部分数据。
4 	DONE:            	下载操作已完成。

*/


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function cargar(url) {
    return new Promise(
        function (resolve, reject) {
            var xrh = new XMLHttpRequest();
            xrh.open('GET', url, true); // definir parámetros para la pedición

            /*  los métodos onreadystatechange() y onload() tienen la misma funcionalidad
            request.onreadystatechange = () => {    // acciones para cuando se ha terminado la pedición
                if (request.readyState == 4) {
                    if(request.status == 200)
                        console.log("respuesta recibida: " + request.responseText);
                    else
                        console.log("Error loading page\n");
                }
            };
            */

           xrh.onload = () => {     // acciónes para trata los datos recibidos en respuesta
                if (xrh.status == 200){
                    console.log("respuesta recibida: " + xrh.responseText);
                    resolve(xrh.response)
                }
                else {
                    reject(Error("Error: No se ha podido cargar el resultado, código del error -> "+ xrh.statusText));
                } 
            }

            xrh.onerror= () => {
                reject(Error("Error de conexión"));
            }

            // enviar la pedición
            xrh.send(null)
            console.log("pedición enviada")
        }
    )
}

cargar('https://jsonplaceholder.typicode.com/todos/1');



const fetch = require("node-fetch");

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))




/*
    async se usa siempre para una función y siempre devuelve una Promise.
    await se usa siempre dentro de una función declarada con async para esperar hasta que una operación se termina.
*/

var funcion = async () => {
    let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!")
        , 3000);
    });
    console.log(await promise)
};

funcion()


// expresión regular
var er = /^hola$/
var s = "ssss";
console.log(er.test("hola"));
console.log(er.test("abcholaabc"))