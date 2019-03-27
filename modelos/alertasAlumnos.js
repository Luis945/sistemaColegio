var mongoose= require('mongoose');
var Schema= require('../esquemas/alertaAlumno').Schema;
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

var alertaAlumno= mongoose.model('alertaAlumno',Schema);

module.exports.alertaAlumno=alertaAlumno;