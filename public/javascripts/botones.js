$(function () {
   $('#abrir').click(function (e) { 
            e.preventDefault();
            $('#ventana').removeClass('animated fadeIn');
            $('#agregarPanel').addClass('animated fadeOut');
        setTimeout(()=>{
            $('#ventana').removeClass('d-none');
            $('#agregarPanel').addClass('d-none');
        }, 500);
    });

});