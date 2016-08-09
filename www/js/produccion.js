$(document).on('ready',function() {
  var numOrden=$('#inpNumOrden').val();
  var inpNumOrden=$("#inpNumOrden");
  var inpNumParte=$("#inpNumParte");
  var inpBtnOrdPro=$("#btnOrdPro");
  var formNumOrden=$('#formNumOrden');
  var inpCantReq=$('#inpCantReq');
  var inpParcial=$('#inpParcial');
  var inpFechIni=$('#inpFechIni');
  var inpFechFin=$('#inpFechFin');
  var parNumParte;
  inpParcial.attr('disabled','');
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
  inpNumParte.bind('keyup keydown keypressed blur',function(e) {
    // e.which=38 flecha para abajo
    // e.which=40 flecha para arriba
    // if (e.type=="keydown") {
    //   if (e.which==40) {
    //     console.log($('#listaNumParte>li'));
    //   }
    // }
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
        inpParcial.val(0);
        inpCantReq.val(0).removeAttr('disabled');
      }

    }
    //capturamos la tacla de tab para una condición si es correcto el número de parte
    if (e.which==9) {
      console.log(typeof inpNumParte.val()+" "+inpNumParte.val().length);
      if (inpNumParte.val().length>0) {
        $('#listaNumParte').hide();
        parNumParte=inpNumParte.val();
        console.log(parNumParte);
      }
      //ocultamos la lista cuando presionamos la tecla tab
    //   $.post('numOrden.php',{
    //     pParNumParte:parNumParte
    //   },obtenerParcial
    // )
    }
    if (e.type=="blur") {
      if (inpNumParte.val().length<=0) {
          inpParcial.val(0);
          inpCantReq.val(0).removeAttr('disabled');
      }
    }
  });
  $('#inpCantReq').on('focusin',function(e) {
    parNumParte=inpNumParte.val();
    if ($('ul>li>b').html()==inpNumParte.val()) {
      $('#listaNumParte').hide();
    }
    if (inpNumParte.val().length>0) {
      $.post('numOrden.php',{
        pParNumParte:parNumParte
      },obtenerParcial
    )
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
    console.log(parNumParte);
    if (vCantidadReq<1) {
      window.alert("no has ingresado ninguna CANTIDAD");
      return;
    }
    //console.log(vNumOrden+" "+vNumParte+" "+vCantidadReq+" "+vFechaNumOrden+" "+vNumUsuario);
    var confirmacion= window.confirm("Son correcto los siguientes datos:"+"\n#Parte: "+vNumParte+"\nCantidad: "+vCantidadReq+"\nFecha: "+fechaMostrar);
    if (confirmacion) {
      $.ajax({
        url:'numOrden.php',
        type:'POST',
        data:{pVNumOrden:vNumOrden,pVNumParte:vNumParte,pVCantidadReq:vCantidadReq,pVFechaNumOrden:vFechaNumOrden,pVNumUsuario:vNumUsuario},
        success:function(data) {
          //agregar un mensaje de error, si pasa un error al momento de insertar un número de orden
          $('#mensajeNumOrden').html(data).addClass('alert alert-success text-center').show().fadeOut(5000);
          $.ajax({
            url:'numOrden.php',
            type:'POST',
            data:{pNumOrdenMax:1},
            success:function(data) {
              var numParte=parseInt(data);
              numParte=numParte+1;
              inpNumOrden.val(numParte);
              inpNumParte.val("");
              inpCantReq.val(0);
              inpCantReq.removeAttr('disabled');
              inpParcial.val(0);
              inpNumParte.focus();
            }
          });//muestre el último registro del número de orden
        }
      });
    }else{
      console.log("no hola");
    }

  });
  function obtenerParcial(data,status) {
    console.log(data+" "+status);
    if (!(data==0)) {
      inpFNumOrden.focus();
      var cantidadReq;
      inpParcial.val(data);
      var parcial=inpParcial.val();
      cantidadReq=window.prompt("Ingresa la cantidad");
      canReq=parseInt(cantidadReq);
      console.log(canReq);
      if (cantidadReq===null||isNaN(canReq)||canReq<parcial) {
        console.log(parseInt(cantidadReq) +" "+cantidadReq);
        window.alert("Verifica la cantidad ingresada sea mayor que el parcial o que hayas ingresado un número");
        console.log("ingresa una cantidad");
        return;
      }
      var total=cantidadReq-parcial;
      inpCantReq.val(total);
      inpCantReq.attr('disabled','disabled');
    }else{
    }
  }
  $('#formMosNumOrd').on('submit',function(e) {
    e.preventDefault();
    fechaInicial=inpFechIni.val();
    fechaFinal=inpFechFin.val();
    if (!(fechaInicial<=fechaFinal)) {
      alert("La fecha inicial (DE) debe ser menor a la final(hasta)");
      return;
    }
    console.log("Estamos en el formulario para mostrar los numero de orden"+"\nfecha Inicial: "+fechaInicial+ "\nfecha Final: "+ fechaFinal);
    $.post('numOrden.php',{pFechaInicial:fechaInicial,pFechaFinal:fechaFinal},numOrdenAMostrar);
  });
  function numOrdenAMostrar(data,status) {
    $('#divTablaNumOrden').html(data).show();
    //<-- nos va a permitir modificar la tabla.
    modificarTabla();
  }
  function modificarTabla() {

  }
  $('#btnOcultarNumOrden').on('click',function() {
    $('#divTablaNumOrden').hide();
  });
  //Asignar evento click del botón btnAsistencia
  $('#btnAsistencia').on('click',Asistencia);
  //función del botón de Asistencia
  function Asistencia() {
    var fechAsis=$("#inpFechAsis").val();
    var comentAsis=$('#txtAreCom').val();
    $.post('asistencia.php',{pFechAsis:fechAsis,pComentAsis:comentAsis},postAsistencia)
  };
  //función del $.post Asistencia
  function postAsistencia(data,status) {
    if (data=!"Exito") {

    }
  };
});//fin del ready
//función click de la lista de los número de parte #listaNumParte
function set_item(item) {
  // change input value
  $('#inpNumParte').val(item);
  // hide proposition list
  $('#listaNumParte').hide();
  $('#inpCantReq').focus();
}
