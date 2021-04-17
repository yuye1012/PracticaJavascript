
function autoEnviar() {
    if (document.querySelector("#nombre").value 
        && document.querySelector("#apellidos").value
        && document.querySelector("#dni").value 
        && document.querySelector("#fecha").value 
        && (document.querySelector("#sexo_h").checked || document.querySelector("#sexo_m").checked) )
        {
            document.getElementById("enviar").click();
        }
}

window.onload = function () {
    var btn_enviar = document.getElementById("enviar");
    btn_enviar.addEventListener("click", function () {
        let dni = document.getElementById("dni");
        let nombre = document.getElementById("nombre");
        let apellidos = document.getElementById("apellidos");
        let fecha = document.getElementById("fecha");
        if (comprobarDNI(dni.value) && comprobarPrimeraLetra(nombre.value) && comprobarPrimeraLetra(apellidos.value)){
            
            var usuario = registrarUsuario(nombre.value, apellidos.value, dni.value, fecha.value);
            console.log(usuario);
            alert("Usuario correcto")
        }

    })

    // autoenviar cuando alguna entrada cambia
    dni.addEventListener("change", function(){
        if (this.value) autoEnviar();
    })

    nombre.addEventListener("change", function(){
        if (this.value) autoEnviar();
    })

    apellidos.addEventListener("change", function(){
        if (this.value) autoEnviar();
    })

    fecha.addEventListener("change", function(){
        if (this.value) autoEnviar();
    })

    let radio_h = document.getElementById("sexo_h");
    radio_h.addEventListener("change", function(){
        if (this.value) autoEnviar();
    })

    let radio_m = document.getElementById("sexo_m");
    radio_m.addEventListener("change", function () {
        if (this.value) autoEnviar();
    })
}

function registrarUsuario(nombre, apellidos, dni, fecha) {

    let fechaFinal;
    if (arguments.length === 4 && fecha) {
        let formatoFecha = /(\d+)\/(\d+)\/(\d+)/;		
		if (formatoFecha.test(fecha)){
            var f = fecha.split("/");
            fechaFinal = new Date(f[2]+"-"+f[1]+"-"+f[0]);  
        }
        
    } 
    else fechaFinal = new Date();
    return {
        "nombre": nombre,
        "apellidos": apellidos,
        "dni": dni,
        "fecha": fechaFinal
    }
}

function validarDNI(numeros, letra) {
    let letras =  ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S',
    'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];

    numeros < 0 || numeros > 99999999 
    ? console.log("numeros erróneo.")
    : letraCorrespondiente = letras[numeros % 23];
    return letraCorrespondiente == letra;
}


function comprobarDNI(dni) {
    let dni_split = dni.split(" ");

    if (dni_split[0].length != 8 || isNaN(dni_split[0]) ){
        alert("Número del DNI no válido");
        return false;
    }

    if ( !isNaN( dni_split[1]) ){
        alert("Letra del DNI no válido");
        return false;
    }

    if (!validarDNI(dni_split[0], dni_split[1].toUpperCase())){
        alert("Letra no corresponde.");
        return false;
    }
    
    return true;
}


function comprobarPrimeraLetra(cadena) {
    let nombres = cadena.split(" ");
    let er = /[A-Z]\w+/
    for (let nom of nombres){
        if (!er.test(nom)) {
            alert(`'${nom}' no empieza por mayúscula.`)
            return false;
        }
    }

    return true;
}


