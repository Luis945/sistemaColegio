var mongoose= require('mongoose');
var schema= mongoose.Schema;

let Salones= new schema({
    Grado:{type: schema.Types.ObjectId, ref: 'Grado'},
    Seccion:{type: schema.Types.ObjectId, ref: 'Seccion'},
    Maestro:{type: schema.Types.ObjectId, ref:'Maestro' },
    Alumnos:[{
        id_alumno:{type: schema.Types.ObjectId, ref: 'Alumno'}
    }],
    Materias[{
        id_materia:{type: schema.Types.ObjectId,ref:'Materia'}
    }],
    Ciclo_Escolar:Date,
    created_at: Date,
});


module.exports.Schema=Salones;