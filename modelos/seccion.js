var mongoose= require('mongoose');
var Schema= require('../esquemas/Grado_Seccion');
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

let Seccion= mongoose.model('Seccion',Schema.Seccion);
module.exports.Seccion=Seccion;
