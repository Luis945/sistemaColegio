var express = require('express');
var User= require('../modelos/maestro');
var Alerta= require('../modelos/alertasAlumnos.js').alertaAlumno;
var Alumno= require('../modelos/alumno').Alumno;

var router = express.Router();
  router.get('/login',function(req,res) {
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        res.redirect('/maestro/dashboard');
      }
      else{
       res.render('maestro',{title:'Sesión de maestros'})
      }
    }else{

      res.render('maestro',{title:'Sesión de maestros'})
    }
  });
  router.get('/dashboard',function(req,res){
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        
     res.render('dashmaestro',{title:'Dashboard',Maestro:req.session.isLoggedIn.Data});
      }
      else{
        res.redirect('/maestro/login');
      }
    }else{
      res.redirect('/maestro/login');
    }
  });
  router.post('/verify',function(req,res){
    
    User.Maestro.findOne({Correo:req.body.Correo},function(err,maestro){
     if  (req.body.Password ==maestro.password){
          req.session.isLoggedIn={Tipo:'Maestro',NombreC:maestro.Nombre+" "+maestro.Apellido_P,Data:maestro};
          res.redirect('/maestro/dashboard');
        }
        else{
          res.redirect('/maestro/login');
        }
        });
  });
  router.post('/logout',function (req,res) {
    req.session.isLoggedIn=undefined;
      res.redirect('/')
  });
  
  //url de las demás que no son del login
  router.get('/alertas',function (req,res){
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        var alumnos,alertas;
        Alerta.find({'Correo':req.session.isLoggedIn.Data.Correo}).exec().then(doc=>{
          alertas=doc;
        Alumno.find().exec().then(doc=>{
          alumnos=doc;

          console.log(alumnos);
         
        res.render('alertasAlumno',{title:'Alertas para alumnos',
        Maestro:req.session.isLoggedIn.Data,
        alertas:alertas,
        alumnos:alumnos});
      });
    });
        
      }
      else{
        res.redirect('/maestro/login');
      }
    }else{
      res.redirect('/maestro/login');
    } 
  });
  router.post('/agregarAlertas',function (req,res) {
    var nueva= new Alerta({
      Matricula:req.body.Alumno,
      Correo:req.body.Correo,
      Titulo:req.body.Titulo,
      Descripcion:req.body.Descripcion,
      created_at:new Date(),
      FechaInicio:req.body.FechaInicio,
      FechaFin:req.body.FechaFin,
      Estado:'Activo'
    });
    nueva.save(function(){
      res.redirect('/maestro/alertas');
    });
  });

module.exports = router;