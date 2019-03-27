var mongoose= require('mongoose');
var Schema= require('../esquemas/maestros').Schema;
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true });

var Maestro= mongoose.model('Maestro',Schema);

module.exports.Maestro=Maestro;