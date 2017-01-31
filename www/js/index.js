  $(document).on('ready',function () {
    //vamos a confirmar que la hora del servidor sea igual a la hora de nuestro cliente;
    var fechaDia=new Date();
    var inpHoy = $('#inpHoy');
    var fechaC = inpHoy.val();
    var fechaSplit = fechaC.split('-');
    var fechaCDate=fechaJsConInput(fechaSplit);
    //vamos a poner en nuestra fecha construida las horas, minutos, segundos y milisegundos de nuetra fecha Actual para comparar si la fecha del cliente es igual a a la del servidor
    fechaCDate.setHours(fechaDia.getHours());
    fechaCDate.setMinutes(fechaDia.getMinutes());
    fechaCDate.setSeconds(fechaDia.getSeconds());
    fechaCDate.setMilliseconds(fechaDia.getMilliseconds());
    console.log(fechaDia.valueOf());
    console.log(fechaCDate.valueOf());
    console.log(fechaDia);
    console.log(fechaCDate);
    if (fechaDia.valueOf()!==fechaCDate.valueOf()) {
      window.alert("No concuerda la fecha del cliente con la del servidor revisar su fecha y la del servidor.\n Y VUELVA A RECARGAR LA PÁGINA\n(PRESIONE F5 O CRTL+MAYUS+R)");
      $('#inUsuario').prop('disabled','disabled')
      $('#inContra').prop('disabled','disabled')
      $('#btnIniciarSesion').prop('disabled','disabled')
      return false;
    }
    function fechaJsConInput(fechaSplit) {
      //Aquí hacemos entero el número para quitarle  y lo guardamos en el arreglo de la posición del mes y le restamos uno, porque en javascript el mes de enero empieza en 0
      fechaSplit[1] = parseInt(fechaSplit[1])-1;
      fechaSplit[2] = parseInt(fechaSplit[2]);
      //Aquí construimos la fecha
      var fechaJS= new Date(fechaSplit[0],fechaSplit[1],fechaSplit[2]);
      return fechaJS;
    };
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
    $.post({
      url:'php/login.php',
      data:
      {
        nombreUsuario:usuario,
        contrasenaUsuario:contrasena
      },
      beforeSend:function (x,y) {
        $('#btnIniciarSesion').html("Entrando...").prop('disabled','disabled');
      },
      success:function (data,status) {
        $('#btnIniciarSesion').html("Iniciar Sesión").removeAttr('disabled');
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
          case 'entrenamiento':
            mensajeIngreso();
            window.location.href="php/entrenamiento/";
            break;
          default:
          $('#tipoAlerta').html(data).addClass("alert alert-danger text-center").show().fadeOut(2000);
        }//fin del switch
      }
    });
    return false;
    e.preventDefault();
  });
  function mensajeIngreso() {
    window.alert("Ingresaste Correctamente.\n Presiona la tecla Enter para continuar o dale click en aceptar");
  }


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
});
