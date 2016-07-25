$(document).on('ready',function() {
  //variables declaradas
  var cadenaNumEmpleado,cadenaNomEmpleado,cadenaApeEmpleado;
  var inputTypeText=$('div>input[type="text"]');
  var inputNumEmpleado=$('input[name="numEmpleado"]');
  var inputNomEmpleado=$('input[name="nombreEmpleado"]');
  var inputApeEmpleado=$('input[name="apellidoEmpleado"]');
  $('.nav-tabs a').on('click',function() {
    $(this).tab('show');
  });
  //convertir cadena de texto en mayusculas del input
  inputTypeText.each(function () {
    $(this).bind('keyup blur focus',function() {
      if ($(this).prop('name')==inputNumEmpleado.prop('name')) {
        cadenaNumEmpleado=$(this).val().toUpperCase();
      }
      if ($(this).prop('name')==inputNomEmpleado.prop('name')) {
        cadenaNomEmpleado=$(this).val().toUpperCase();
      }
      if ($(this).prop('name')==inputApeEmpleado.prop('name')) {
        cadenaApeEmpleado=$(this).val().toUpperCase();
      }
    })
  });


  //insertar usuario a través de ajax
  $('form').on('submit',function (e) {
    inputNumEmpleado.val(cadenaNumEmpleado);
    inputNomEmpleado.val(cadenaNomEmpleado);
    inputApeEmpleado.val(cadenaApeEmpleado)
    var numEmpleado=inputNumEmpleado.val() ;
    var nombreEmpleado=inputNomEmpleado.val();
    var apeEmpleado=inputApeEmpleado.val();
    //console.log(numEmpleado+" " + nombreEmpleado +" "+ apeEmpleado);
    $.post('altasEmpleado.php',
      {
        pnumEmpleado:numEmpleado,
        pnombreEmpleado:nombreEmpleado,
        papeEmpleado:apeEmpleado
      },
      function(data,status) {
        var tipoMensaje=data.charAt(0);
        var mensajeMostrar=data.slice(1,data.length);
        //console.log(tipoMensaje +" : "+ mensajeMostrar);
        var mensaje=$('#formAltaEmpleados');
        var numeroHijos=mensaje.children('div').size();
        if (tipoMensaje=="E") {
          //console.log(mensaje);
          var mensajeHtml='<div class="alert alert-danger alert-dismissible fade in" role="alert"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span haria-hidden="true">&times;</span></button>'+mensajeMostrar+'</div>';
          if (numeroHijos<=3) {
            mensaje.append(mensajeHtml);
          }
          if (numeroHijos>3) {
            $('#formAltaEmpleados>div.alert.alert-danger').remove();
            $('#formAltaEmpleados>div.alert.alert-success').remove();
            mensaje.append(mensajeHtml);
          }
        }
        if (tipoMensaje=="S") {
          var mensajeHtml='<div class="alert alert-success alert-dismissible fade in" role="alert"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span haria-hidden="true">&times;</span></button>'+mensajeMostrar+'</div>';
          if (numeroHijos<=3) {
            mensaje.append(mensajeHtml);
          }
          if (numeroHijos>3) {
            $('#formAltaEmpleados>div.alert.alert-danger').remove();
            $('#formAltaEmpleados>div.alert.alert-success').remove();
            mensaje.append(mensajeHtml);
          }
          inputTypeText.each(function() {
            $(this).val("")
            console.log(this);
          });
        }
      }
    )
    e.preventDefault();
  });
  //empieza el listado de los empleado
  $('#btnListaE').on('click',function () {
    $.post('empleadosME.php',
      {

      }
      ,function (data, status) {
        $('#listaEmpleados').html(data)
      }
    )
  })
})// fin del documento

//recorrer los elemento de un mismo tipo de selector
//$('div>input[type="text"]').each(function (index) {
//   console.log(index+": " +$(this).val());
// })
