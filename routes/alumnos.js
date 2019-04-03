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
      res.render('alumno/alumno',{title:'Sesión de alumnos'});
    }
  }else{
    res.render('alumno/alumno',{title:'Sesión de alumnos'});
  }

  });
router.get('/dashboard',function(req,res,next){
  if(req.session.isLoggedIn!=undefined){
    if(req.session.isLoggedIn.Tipo=='Alumno'){
     Alerta.alertaAlumno.find({'alumno':req.session.isLoggedIn.Data._id,'Estado':'Activo'})
     .populate({path:'maestro',select:'Nombre Apellido_P'}).exec().then(doc=>{

     var anuncios= doc;
     
     res.render('alumno/dashalumno',{title:'Dashboard',Alumno:req.session.isLoggedIn.Data,anuncios});
    
     });
    }
    else{
      res.redirect('/alumno/login');
    }
  }else{
    res.redirect('/alumno/login');
  }

  
});
router.post('/verify',function(req,res){
  
  User.Alumno.findOne({Matricula:req.body.Matricula}).exec().then(alumno=>{
      if  (req.body.Password==alumno.password){
        req.session.isLoggedIn={Tipo:'Alumno',NombreC:alumno.Nombre+" "+alumno.Apellido_P,Data:alumno};
        res.redirect('/alumno/dashboard');
      }
      else{
        res.redirect('/alumno/login');
      }
      }).catch(err => {
        res.status(400).send("unable to save to database");
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