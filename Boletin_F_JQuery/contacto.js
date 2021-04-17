
// la función que se ejecutará tras la carga de la página
$(document).ready(
    function () {

        // expresión regular para validar el correo
        var emailreg = /^[a-z]*[@]{1}[a-z]*[\.]{1}[a-z]{2,3}$/;

        $("#enviar").click(function () {

            // borra los elementos seleccionados incluido el texto y los nodos hijos
            $(".error").remove();

            // método val() establece o devuelve el valor de un atributo en el element seleccionado
            if ($(".nombre").val() == "") {

                // focus() dispara el evento focus, que ocurre cuando el element toma el foco
                $(".nombre").focus().after("<span class='error'>Ingrese su nombre</span> ");
                return false;

                // Comprobar que los valores de campo no sean vacíos o inválidos
            } else if ($(".email").val() == "" || !emailreg.test($(".email").val())) {
                $(".email").focus().after("<span class='error'>Ingrese un email correcto</span>");
                return false;

            } else if ($(".asunto").val() == "") {
                $(".asunto").focus().after("<span class='error'>Ingrese un asunto</span>");
                return false;

            } else if ($(".mensaje").val() == "") {
                $(".mensaje").focus().after("<span class='error'>Ingrese un mensaje</span>");
                return false;
            }
        });

        // usar la funcion keyup() para cuando se teclea en algún campo, compruebe si su valor ya es válido
        $(".nombre, .asunto, .mensaje").keyup(function () {
            if ($(this).val() != "") {

                // fadeOut() elimina la opacidad del elemento seleccionado
                $(".error").fadeOut();
                return false;
            }
        });

        $(".email").keyup(
            function () {
                if ($(this).val() != "" && emailreg.test($(this).val())) {
                    $(".error").fadeOut();
                    return false;
                }
            });

        $(".nombre").creaTip("Introduzca su nombre");
        $(".email").creaTip("Introduzca el mail de contacto en formato aa@bb.cc");
        $(".asunto").creaTip("Introduzca el asunto del mensaje");
        $(".mensaje").creaTip("Introduzca el texto del mensaje");
        $(".boton").creaTip("Haga click aqui para validar el formulario");

        $(".contacto").submit(
            function (e) {
                console.log("entrando")
                e.preventDefault();
                $.ajax({
                    url: 'http://localhost:8080/practica3.ajax.server/servletValidaDatos',
                    type: 'POST',
                    async: true,
                    data: crea_query_string(["nombre", "email", "asunto", "mensaje"]),
                    success: function (result, status, xhr) {
                        var resultado = $('<div>' + result + '</div>');
                        $(document.body).append(resultado);
                    },
                    error: function (xhr, status, error) {
                        var resultado = $("<div style='color:red'> ERROR en la validacion AJAX</div>");
                        $(document.body).append(resultado);
                    }
                });
            }
        );
    }
)

$.fn.creaTip = function (textoTip) {

    //metodo each() ejecuta la función para cada elemento invocado al método creaTip()
    this.each(function () {

        var elem = $(this);
        console.log(this)   // this -> elemento del DOM
        console.log(elem)   // $(this) -> objeto JQuery

        var miTip = $('<div class="tip">' + textoTip + '</div>');

        //metodo append() añade al final del elemento seleccionado
        $(document.body).append(miTip);

        //método mouseenter(), dispara el evento mouseenter que ocurre cuando entra el ratón en el elemento
        elem.mouseenter(function (e) {

            //método css() establece propiedades css
            miTip.css("left", e.pageX + 50);    //event.pageX, devuelve la posicion del puntero relativa al extremo izquierdo
            miTip.css("top", e.pageY + 10);     //propiedad event.pageY devuelve la posicion del puntero relativa al extremo superior

            //método show() muestra un elemento oculto a una velocidad de 500ms.
            miTip.show(500).stop(true, true);
        });

        //mouseleave() dispara el evento mouseleave que ocurre cuando el puntero del raton sale del elemento seleccionado
        elem.mouseleave(function () {
            //método hide() oculta un elemento a una velocidad de 500 ms
            miTip.hide(500);
        });
    });

    //return this;
}

function crea_query_string(parametros) {
    resultado = "";
    $.each(parametros, function (idx, param) {
        resultado += param + "=" + encodeURIComponent($('.' +
            param).val()) + "&";
    });
    return resultado + "nocache=" + Math.random();
}

