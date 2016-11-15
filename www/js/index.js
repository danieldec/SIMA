  $(document).on('ready',function () {
  // creamos esta variable para guardar el nombreUsuario para convertirlo en mayusculas
  var cadenaUsuario="";
  //creamos una variable que hace referencia al input donde se va a colocar el nombre del usuario
  var inputUsuario=$('#inUsuario');
  // console.log("estamos con el js del index");
  //aquí aplicamos tres eventos al input del nombreUsuario para que nos convierta el texto en mayusculas
  inputUsuario.bind('keyup blur focus',function (e) {
     if (e.type=="keyup") {
       cadenaUsuario=$(this).val().toUpperCase();
     }
     if (e.type="blur") {
       cadenaUsuario=$(this).val().toUpperCase();
     }
     if (e.type="focus") {
       cadenaUsuario=$(this).val().toUpperCase();
     }
  })
  //usamos ajax para enviar datos y logearnos a la página.
  $('#loginForm').on('submit',function (e) {
    //aquí le pasamos la cadena a nuestro input ya con las mayusculas
    inputUsuario.val(cadenaUsuario);
    var usuario= inputUsuario.val();
    var contrasena=$('#inContra').val();
    $.post('php/login.php',
    {
      nombreUsuario:usuario,
      contrasenaUsuario:contrasena
    },
      function(data, status) {
        switch (data) {
          case 'admin':
            mensajeIngreso();
            window.location.href="php/admin/";
            break;
          case 'rh':
            mensajeIngreso();
            window.location.href="php/rh/";
            break;
          case 'produccion':
            mensajeIngreso();
            window.location.href="php/produccion/";
            break;
          case 'materiales':
            mensajeIngreso();
            window.location.href="php/materiales/";
            break;
          default:
          $('#tipoAlerta').html(data).addClass("alert alert-danger text-center").show().fadeOut(5000);
        }
      }
    );
    e.preventDefault();
  });
  function mensajeIngreso() {
    window.alert("Ingresaste Correctamente");
  }
});
