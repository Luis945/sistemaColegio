var mongoose= require('mongoose');
var schema= mongoose.Schema;

var Grado_Seccion= new schema({
    Grado: {type:schema.Types.ObjectId,ref:'Grado'},
    Seccion: {type:schema.Types.ObjectId,ref:'Seccion'},
    created_at: Date,
    Updated_at:Date,
});

module.exports.Schema=Grado_Seccion;
