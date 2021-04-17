
// Ejercicio 1
function funcion1(fecha1, fecha2) {
    var f = fecha1.split("/");
    var f1 = new Date(f[2]+"-"+f[1]+"-"+f[0]);      // para la fecha correcta: Date.UTC("yyyy","MM","dd") o new Date("yyyy-MM-dd")
    f = fecha2.split("/");
    var f2 = new Date(Date.UTC( f[2], f[1]-1, f[0]));
    console.log( Math.abs(f1-f2) / (1000 * 60 * 60 * 24))
}

funcion1( "20/03/2021", "01/04/2021")




// Ejercicio 2
function function2(operadores) {
    var operador = operadores.split(" ");
    var expresion = "(1"+operador[0]+"2)";
    var operando = 1;
    for(let i=1; i<operador.length; i++){

        if (operador[i].length > 1)
            throw new WrongFormatException("formato del operador incorrecto -> "+ operador[i])

        expresion = "("+expresion+ operador[i]+operando+")";
        operando === 1 ? operando = 2 : operando = 1;
    }
    return expresion;
}


class WrongFormatException{
    constructor(mensaje){
        this.mensaje = mensaje;
    }
    toString(){
        console.error(this.mensaje)
    }
}

try {
    console.log( eval(function2("+ + * - ++")) )
} catch (error) {
    console.log(error)
    if (error instanceof EvalError || error instanceof SyntaxError) {
        console.error(error.toString())
    }
}




// Ejercicio 3
class User{
    constructor(id, name, passwd, mail, registrationDate){
        this.id = id;
        this.name = name;
        this.passwd = passwd;
        this.mail = mail;
        this.registrationDate = registrationDate;
        this.amigos = []
    }
    isFriendOf(otroUsuario){
        for (let usuario of this.amigos){
            if (usuario.id == otroUsuario.id)
                return true;
        }
        return false;
    }
    addFriend(otroUsuario){
        this.amigos.push(otroUsuario);
    }
}


var u1 = new User(1, "usuario 1", "123", "uno@um.es", "25/03/2021");
var u2 = new User(2, "usuario 2", "123", "dos@um.es", "25/03/2021");
var u3 = new User(3, "usuario 3", "123", "tres@um.es", "25/03/2021");
var u4 = new User(4, "usuario 4", "123", "cuatro@um.es", "25/03/2021");
User.prototype.addFriend.call(u1, u2);
User.prototype.addFriend.call(u1, u3);
User.prototype.addFriend.call(u1, u4);
User.prototype.addFriend.apply(u4, [u1]);

console.log(u2.isFriendOf(u1))

if (u1.isFriendOf(u2) && u1.isFriendOf(u3) && u1.isFriendOf(u4)) 
	console.log("Friends of user1 checked")

if (u4.isFriendOf(u1)) 
	console.log("Friends of user4 checked")