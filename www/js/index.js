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
          case 'ing':
            mensajeIngreso();
            window.location.href="php/ingenieria/";
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

jQuery.print = function(message, insertionType) {
  if (typeof(message) == 'object') {
    var string = '{<br />',
        values = [],
        counter = 0;
    $.each(message, function(key, value) {
      if (value && value.nodeName) {
        var domnode = '&lt;' + value.nodeName.toLowerCase();
        domnode += value.className ? ' class="' + value.className + '"' : '';
        domnode += value.id ? ' id="' + value.id + '"' : '';
        domnode += '&gt;';
        value = domnode;
      }
      values[counter++] = key + ': ' + value;
    });
    string += values.join(',<br />');
    string += '<br />}';
    message = string;
  }

  var $output = $('#print-output');

  if ($output.length === 0) {
    $output = $('<div id="print-output" />').appendTo('body');
  }

  var $newMessage = $('<div class="print-output-line" />');
  $newMessage.html(message);
  insertionType = insertionType || 'append';
  $output[insertionType]($newMessage);
};
