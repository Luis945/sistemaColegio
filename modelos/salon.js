var mongoose= require('mongoose');
var Schema= require('../esquemas/salones').Schema;
mongoose.connect("mongodb://localhost:27017/colegio",{ useNewUrlParser: true })

var Salon=mongoose.model('Salon',Schema);

module.exports.Salon=Salon;