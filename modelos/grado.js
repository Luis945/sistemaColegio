var mongoose= require('mongoose');
var Schema= require('../esquemas/Grado_Seccion');
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

let Grado= mongoose.model('Grado',Schema.Grado);

module.exports.Grado=Grado;