
var SERVER = "http://localhost:8080/practica3.ajax.server";
var READY_STATE_COMPLETE = 4;
var peticion_http = null;

function inicializa_xhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function crea_query_string(parametros) {
    resultado = "";
    for (i = 0; i < parametros.length; i++) {
        resultado += parametros[i] + "=" +
            encodeURIComponent(document.getElementById(parametros[i]).value) + "&";
    }
    return resultado + "nocache=" + Math.random();
}


function valida() {
    peticion_http = inicializa_xhr();
    if (peticion_http) {
        peticion_http.onreadystatechange = procesaRespuesta;
        peticion_http.open("POST", SERVER + "/servletValidaDatos", true);
        peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var query_string = crea_query_string(["fecha_nacimiento",
            "codigo_postal", "telefono"]);
        peticion_http.send(query_string);
    }
}

function procesaRespuesta() {
    if (peticion_http.readyState == READY_STATE_COMPLETE) {
        if (peticion_http.status == 200) {
            document.getElementById("respuesta").innerHTML = peticion_http.responseText;
        }
    }
}