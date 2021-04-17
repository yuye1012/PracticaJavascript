

var net = new Object();
net.READY_STATE_UNINITIALIZED = 0;
net.READY_STATE_LOADING = 1;
net.READY_STATE_LOADED = 2;
net.READY_STATE_INTERACTIVE = 3;
net.READY_STATE_COMPLETE = 4;

// Constructor
net.CargadorContenidos = function (url, funcion, funcionError) {
    this.url = url;
    this.req = null;
    this.onload = funcion;
    this.onerror = funcionError ? funcionError : this.defaultError;
    this.cargaContenidoXML(url);
};

net.CargadorContenidos.prototype = {
    cargaContenidoXML: function (url) {
        if (window.XMLHttpRequest) {
            this.req = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            this.req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (this.req) {
            try {
                var loader = this;
                this.req.onreadystatechange = () => {
                    loader.onReadyState.call(loader);
                };
                this.req.open("GET", url, true);
                this.req.send(null);
            } catch (err) {
                this.onerror.call(this);
            }
        }
    },
    onReadyState: function () {
        var req = this.req;
        var ready = req.readyState;
        if (ready == net.READY_STATE_COMPLETE) {
            var httpStatus = req.status;
            if (httpStatus == 200) {
                this.onload.call(this);
            } else {
                this.onerror.call(this);
            }
        }
    },
    defaultError: function () {
        alert("Se ha producido un error al obtener los datos"
            + "\n\nreadyState:" + this.req.readyState + "\nstatus: "
            + this.req.status + "\nheaders: "
            + this.req.getAllResponseHeaders());
    }
};
