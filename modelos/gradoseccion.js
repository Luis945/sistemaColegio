var mongoose= require('mongoose');
var Schema= require('../esquemas/Grado_Seccion');
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

let Grado_Seccion= mongoose.model('Grado_seccion',Schema.Schema);
module.exports.Grado_Sección=Grado_Seccion;
