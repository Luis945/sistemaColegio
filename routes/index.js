var express = require('express');
var router = express.Router();
var nuevoM= require('../modelos/maestro').Maestro;
var nuevoG= require('../modelos/grado').Grado;
var nuevoS= require('../modelos/seccion').Seccion;


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
  res.render('administracion/agregarmaestro',{title:'ma ma marrano'});
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
    });
});
router.post('/agregarGrados',(req,res)=>{
  let nuevoGrado= new nuevoG({
    grado: req.body.Numero,
    created_at:new Date(),
  });
  nuevoGrado.save(()=>{
    res.redirect('/maestro/dashboard');
  });
});
router.post('/agregarSeccion',(req,res)=>{
  let nuevaSeccion= new nuevoS({
    seccion:req.body.Seccion,
    created_at:new Date(),
  })
  nuevaSeccion.save(()=>{
    res.redirect('maestro/dashboard');
  });
});
module.exports = router;
