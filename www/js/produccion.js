$(document).on('ready',function() {
  var numOrden=$('#inpNumOrden').val();
  var inpNumOrden=$("#inpNumOrden");
  var inpNumParte=$("#inpNumParte");
  var inpBtnOrdPro=$("#btnOrdPro");
  var formNumOrden=$('#formNumOrden');
  inpNumParte.focus();
  var mensaBD=$('#mensajeBD');
  var inpFNumOrden=$('#inpFNumOrden');
  //vamos a comprobar que las fechas esten correctas en el servidor como en la computadora
  var fecha= new Date();
  var dia=fecha.getDate(),mes=fecha.getMonth()+1,ano=fecha.getFullYear(),fechaCompleta;
  if (dia<10) {
    dia="0"+dia;
  }
  if (mes<10) {
    mes="0"+mes;
  }
  fechaCompleta=ano+"-"+mes+"-"+dia;
  //hasta aquí se acaba lo de la fecha.
  if (fechaCompleta==!inpFNumOrden.val()) {
    console.log("revisar la fecha de la computadora");
    inpFNumOrden.val("").attr('disabled','');
    alert("revisar la fecha de la computadora");
  }
  if (numOrden=="0") {
    mensaBD.addClass('alert alert-danger text-center').show().fadeOut(10000);
  }else{
    mensaBD.addClass('alert alert-danger text-center').hide().fadeOut(10000);
  }
  //busqueda de los número de parte en el input NumParte
  inpNumParte.bind('keyup keydown keypressed',function(e) {
    if (e.type=="keyup"&&e.which!=219) {
      var palabraC=$(this).val();
      //console.log(palabraC);
      if (palabraC.length>0) {
        $.ajax({
          url:'numOrden.php',
          type:'POST',
          data:{pPalabraC:palabraC},
          success:function(data) {
            $('#listaNumParte').show();
            $('#listaNumParte').html(data);
          }
        });
      }else{
        $('#listaNumParte').hide();
      }
    }
    //capturamos la tacla de tab para una condición si es correcto el número de parte
    if (e.which==9) {
    }
  });
  $('#inpCantReq').on('focus',function() {
    if ($('ul>li>b').html()==inpNumParte.val()) {
      $('#listaNumParte').hide();
    }
  });
  //formulario para generar número de parte
  formNumOrden.on('submit',function(e) {
    e.preventDefault();
    var vNumOrden=$('#inpNumOrden').val();
    var vNumParte=inpNumParte.val();
    var vCantidadReq=$('#inpCantReq').val();
    var vFechaNumOrden=$('#inpFNumOrden').val();
    var vNumUsuario=$('#inpNumUsuario').val();
    var fechaMostrar=vFechaNumOrden.split('-').reverse().join('-');
    if (vCantidadReq<1) {
      window.alert("no has ingresado ninguna CANTIDAD");
      return;
    }
    console.log(vNumOrden+" "+vNumParte+" "+vCantidadReq+" "+vFechaNumOrden+" "+vNumUsuario);
    var confirmacion= window.confirm("Son correcto los siguientes datos:"+"\n#Parte: "+vNumParte+"\nCantidad: "+vCantidadReq+"\nFecha: "+fechaMostrar);
    if (confirmacion) {
      $.ajax({
        url:'numOrden.php',
        type:'POST',
        data:{pVNumOrden:vNumOrden,pVNumParte:vNumParte,pVCantidadReq:vCantidadReq,pVFechaNumOrden:vFechaNumOrden,pVNumUsuario:vNumUsuario},
        success:function(data) {
          $('#registroOrden').html(data);
        }
      });
    }else{
      console.log("no hola");
    }

  });

});//fin del ready

//función click de la lista de los número de parte #listaNumParte
function set_item(item) {
// change input value
$('#inpNumParte').val(item);
// hide proposition list
$('#listaNumParte').hide();
$('#inpCantReq').focus();
}
