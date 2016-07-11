$(document).on('ready', function() {
  //aquí obtenemos los valores de la fecha
  var dt = new Date();
  var hora = dt.getHours();
  var minutos = dt.getMinutes();
  var time = hora + ":" + minutos;

  var dia = dt.getDate();
  //se agrega un uno por que empieza a contar los meses de 0 donde el cero es igual a enero
  var mes = dt.getMonth() + 1;
  var ano = dt.getFullYear();
  if (true) {

  }
  //aquí nosotros debemos agregar un 0 porque cuando obtenemos el mes del 0 al 11 entonces nosotros queremos agregar el valor a input fecha y admite valores de dos digitos
  if (dia < 10 && mes < 10) {
    var fecha = ano + "-0" + mes + "-0" + dia;
  } else {
    var fecha = ano + "-0" + mes + "-" + dia;
  }
  $('input[name="fecha"]').val(fecha);
  $('#inpHoraOrden').val(time);
  $('#cantidadPartes').val("0");
  $("#prueba").on('click', function() {
    console.log(time);
  })
  console.log("Bienvenido :)");
  $("#inpHoraOrden").on('blur', function() {
    var tiempoHora = $(this).val();
    var descomponerHora = tiempoHora.split(":");
    console.log(typeof tiempoHora + descomponerHora);
    var dt = new Date();
    var hora = dt.getHours();
    var minutos = dt.getMinutes();
    var time = hora + ":" + minutos;
    console.log("hora= " +
      hora + " minutos es =" + minutos);
  });
  $("#cantidadPartes").on('blur', function() {
    var cantidad = $(this).val();
    console.log(cantidad)
  })
  $('input[name="fecha"]').on('blur', function() {
    var fecha = $(this).val();
    console.log(fecha);

  });

})
