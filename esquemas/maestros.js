var mongoose= require('mongoose');
var schema= mongoose.Schema;

var Maestro= new schema({
    Nombre:String,
    Apellido_P:String,
    Apellido_M:String,
    RFC:String,
    Estado:String,
    created_at:Date,
    Correo:String,
    password:String,
    Celular:Number,
    Adicional:{
        Tipo_Sangre:String,
        Fecha_Nacimiento:Date,
        Fecha_Ingreso:Date,
        Curp:String
    }
});

module.exports.Schema=Maestro;