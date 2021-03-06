var mongoose= require('mongoose');
var schema= mongoose.Schema;

var Alumno= new schema({
    Matricula:String,
    Nombre:String,
    Apellido_P:String,
    Apellido_M:String,
    Fecha_Nacimiento:Date,
    Fecha_Ingreso:Date,
    Tipo_Sangre:String,
    Curp:String,
    Estado:String,
    generacion:Number,
    created_at:Date,
    password:String,
    datos_escolares:{
        salon:{type:schema.Types.ObjectId, ref:'Salon'}
    }
}); 
module.exports.Schema=Alumno;