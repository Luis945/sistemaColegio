var mongoose= require('mongoose');
var schema= mongoose.Schema;

var AlertaAlumno= new schema({
    Matricula:String,
    Correo:String,
    Titulo:String,
    Descripcion:String,
    created_at:Date,
    FechaInicio:Date,
    FechaFin:Date,
    Estado:String
    
});
module.exports.Schema=AlertaAlumno;