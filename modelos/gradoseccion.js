var mongoose= require('mongoose');
var Schema= require('../esquemas/Grado_Seccion');
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

let Grado_Seccion= mongoose.model('Grado_seccion',Schema.Schema);
let Seccion= mongoose.model('Grado_seccion',Schema.Seccion);
let Grado= mongoose.model('Grado_seccion',Schema.Grado);

module.exports.Grado_Sección=Grado_Seccion;
module.exports.Seccion=Seccion;
module.exports.Grado=Grado;