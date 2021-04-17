var SERVER = "http://localhost:8080/practica3.ajax.server";
var READY_STATE_COMPLETE = 4;
var peticion_http = null;
function inicializa_xhr() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function comprobar() {
    var texto = document.getElementById("texto").value;
    peticion_http = inicializa_xhr();
    if (peticion_http) {
        peticion_http.onreadystatechange = procesaRespuesta;
        peticion_http.open("POST", SERVER +
            "/compruebaDisponibilidadJSON",
            true);
        peticion_http.setRequestHeader("Content-Type",
            "application/x-www-form-urlencoded");
        peticion_http.responseType = 'json';
        peticion_http.send("texto=" + texto + "&nocache=" +
            Math.random());
    }
}

function procesaRespuesta() {
    if (peticion_http.readyState == READY_STATE_COMPLETE) {
        if (peticion_http.status == 200) {
            
            var respuesta_json = peticion_http.response;
            //No necesario pues se indico que respuesta era ‘json’
            //var respuesta =  eval("(" + respuesta_json + ")");
            
            mensaje = "<ul>";
            for (i = 0; i < respuesta_json.alternativas.length; i++) {
                mensaje += "<li><a href=\"#\" onclick=\"selecciona('"
                    + respuesta_json.alternativas[i] + "'); \">"
                    + respuesta_json.alternativas[i] + "<\/a><\/li>";
            }
            mensaje += "<\/ul>";
            document.getElementById("disponibilidad").innerHTML = mensaje;
        }
    }
}

function selecciona(texto) {
    var cuadroTexto = document.getElementById("texto");
    cuadroTexto.value = texto;
}