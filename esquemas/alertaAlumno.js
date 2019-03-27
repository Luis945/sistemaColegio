var mongoose= require('mongoose');
var schema= mongoose.Schema;

var AlertaAlumno= new schema({
    alumno:{ type: schema.Types.ObjectId, ref: 'Alumno' },
    maestro:{ type: schema.Types.ObjectId, ref: 'Maestro'},
    Titulo:String,
    Descripcion:String,
    created_at:Date,
    FechaInicio:Date,
    FechaFin:Date,
    Estado:String
    
});
module.exports.Schema=AlertaAlumno;