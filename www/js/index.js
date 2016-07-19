$(document).on('ready',function () {
  // creamos esta variable para guardar el nombreUsuario para convertirlo en mayusculas
  var cadenaUsuario="";
  console.log("estamos con el js del index");
  $('#inUsuario').on('keyup',function () {
    cadenaUsuario=$(this).val().toUpperCase();
    $(this).val(cadenaUsuario);
  })
  //usamos ajax para enviar datos y logearnos a la página.
  $('#loginForm').on('submit',function (e) {
    var usuario= $('#inUsuario').val();
    var contrasena=$('#inContra').val();
    $.post('php/login.php',
    {
      nombreUsuario:usuario,
      contrasenaUsuario:contrasena},
      function(data, status) {
        alert(data+" " +status);
        $('#tipoAlerta').html(data).addClass("alert alert-danger text-center").show().fadeOut(10000);
      }
    );
    console.log(e.type);
    e.preventDefault();
  })
});
