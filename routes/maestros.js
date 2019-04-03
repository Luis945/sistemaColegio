var express = require('express');
var User= require('../modelos/maestro');
var Alerta= require('../modelos/alertasAlumnos.js').alertaAlumno;
var Alumno= require('../modelos/alumno').Alumno;
var nuevoG= require('../modelos/grado').Grado;
var nuevoS= require('../modelos/seccion').Seccion;
var nuevoGyS= require('../modelos/gradoseccion').Grado_Sección;

var router = express.Router();

  router.get('/login',function(req,res) {
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        res.redirect('/maestro/dashboard');
      }
      else{
       res.render('maestro/maestro',{title:'Sesión de maestros'})
      }
    }else{

      res.render('maestro/maestro',{title:'Sesión de maestros'})
    }
  });
  router.get('/dashboard',function(req,res){
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        
     res.render('maestro/dashmaestro',{title:'Dashboard',Maestro:req.session.isLoggedIn.Data});
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
  router.get('/logout',function (req,res) {
    if(req.session.isLoggedIn!=undefined){
      req.session.isLoggedIn=undefined;
        res.redirect('/');
      }else{
        res.redirect('/alumno/login');
      }
    });
  
  //url de las demás que no son del login
  router.get('/alertas',function (req,res){
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        var alumnos,alertas;
        Alerta.find({'maestro':req.session.isLoggedIn.Data._id,'Estado':'Activo'})
        .populate({path:'alumno',select:'Nombre Apellido_P'})
        .populate({path:'maestro',select:'Nombre Apellido_P'}).exec().then(doc=>{
          alertas=doc;
        Alumno.find().exec().then(doc=>{
          alumnos=doc;

        res.render('maestro/alertasAlumno',{title:'Alertas para alumnos',
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
      alumno:req.body.Alumno,
      maestro:req.session.isLoggedIn.Data._id,
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
  router.post('/borrarAlerta',function (req,res) {
    Alerta.findByIdAndUpdate(req.body.id,{Estado:'Inactivo'}).exec();
    res.redirect('/maestro/alertas');
  });

    //agregué primero el salon, después agregaré los alumnos al salon
  router.get('/agregarSalon',(req,res)=>{
    if(req.session.isLoggedIn!=undefined){
      if(req.session.isLoggedIn.Tipo=='Maestro'){
        
        res.render('administracion/principal',{title:'Agregar Salones',Maestro:req.session.isLoggedIn.Data});
      
    }else{res.redirect('/maestro/login');}
  }else{res.redirect('/maestro/login');}
  });


module.exports = router;