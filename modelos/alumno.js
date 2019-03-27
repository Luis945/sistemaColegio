var mongoose= require('mongoose');
var Schema= require('../esquemas/alumnos').Schema;
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

var Alumno= mongoose.model('Alumno',Schema);

module.exports.Alumno=Alumno;