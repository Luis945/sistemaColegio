var express = require('express');
var router = express.Router();
var nuevoM= require('../modelos/maestro').Maestro;

/* Página principal */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Colegio Montes Quieu' });
});
router.get('/nosotros',function (req,res,next) {
  res.render('nosotros',{title:'Acerca de nosotros'});
});
/**
 * Login para alumnos y maestros en sus respectivas rutas
 */
router.get('/ma',function(req,res){
  res.render('agregarmaestro',{title:'ma ma marrano'});
});
router.post('/agregarmaestro',function(req,res){
  var apellidos = req.body.Apellidos.split(" ");
  var nuevo= new nuevoM({
    Nombre:req.body.Nombre,
    Apellido_P:apellidos[0],
    Apellido_M:apellidos[1],
    Estado:'Activo',
    created_at:new Date(),
    Correo:req.body.Correo,
    password:req.body.Password
  });
  nuevo.save(function () {
    res.redirect('/');
    })
})
module.exports = router;
