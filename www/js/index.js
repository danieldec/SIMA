$(document).on('ready',function () {
  // creamos esta variable para guardar el nombreUsuario para convertirlo en mayusculas
  var cadenaUsuario="";
  console.log("estamos con el js del index");
  //aquí aplicamos tres eventos al input del nombreUsuario para que nos convierta el texto en mayusculas
  $('#inUsuario').bind('keyup blur focus',function (e) {
    if (e.type=="keyup") {
      cadenaUsuario=$(this).val().toUpperCase();
      $(this).val(cadenaUsuario);
    }
    if (e.type="blur") {
      cadenaUsuario=$(this).val().toUpperCase();
      $(this).val(cadenaUsuario);
    }
    if (e.type="focus") {
      cadenaUsuario=$(this).val().toUpperCase();
      $(this).val(cadenaUsuario);
    }
  })
  //usamos ajax para enviar datos y logearnos a la página.
  $('#loginForm').on('submit',function (e) {
    var usuario= $('#inUsuario').val();
    var contrasena=$('#inContra').val();
    console.log(usuario);
    $.post('php/login.php',
    {
      nombreUsuario:usuario,
      contrasenaUsuario:contrasena},
      function(data, status) {
        if (data=="admin") {
          window.alert("Ingresaste Correctamente");
          window.location.href="php/admin/";
        }else{
            $('#tipoAlerta').html(data).addClass("alert alert-danger text-center").show().fadeOut(5000);
        }
      }
    );
    e.preventDefault();
  });
});
