var mongoose= require('mongoose');
var Schema= require('../esquemas/Grado_Seccion').Schema;
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

let Grado_Sección= mongoose.model('Grado_seccion',Schema);

module.exports.Grado_Sección=Grado_Sección;