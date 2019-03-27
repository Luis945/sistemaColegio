var express = require('express');
var User= require('../modelos/alumno');
var Alerta= require('../modelos/alertasAlumnos.js');
var router = express.Router();


router.get('/login',function(req,res) {
  if(req.session.isLoggedIn!=undefined){
    if(req.session.isLoggedIn.Tipo=='Alumno'){
      res.redirect('/alumno/dashboard')
    }
    else{
      res.render('alumno',{title:'Sesión de alumnos'});
    }
  }else{
    res.render('alumno',{title:'Sesión de alumnos'});
  }

  });
router.get('/dashboard',function(req,res,next){
  if(req.session.isLoggedIn!=undefined){
    if(req.session.isLoggedIn.Tipo=='Alumno'){
     var anuncios= Alerta.alertaAlumno.find({'Matricula':req.session.isLoggedIn.Data.Matricula,'Estado':'Activo'});
      res.render('dashalumno',{title:'Dashboard',Alumno:req.session.isLoggedIn.Data,anuncios});
    }
    else{
      res.redirect('/alumno/login');
    }
  }else{
    res.redirect('/alumno/login');
  }

  
});
router.post('/verify',function(req,res){
  
  User.Alumno.findOne({Matricula:req.body.Matricula},function(err,alumno){
      if  (req.body.Password==alumno.password){
        req.session.isLoggedIn={Tipo:'Alumno',NombreC:alumno.Nombre+" "+alumno.Apellido_P,Data:alumno};
        res.redirect('/alumno/dashboard');
      }
      else{
        res.redirect('/alumno/login');
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

module.exports = router;