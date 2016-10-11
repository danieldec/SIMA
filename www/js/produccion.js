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
  var formListAsis=$('#formListAsis');
  var inpNumEmpAsis=$('#inpNumEmpAsis');
  var btnMosLisFecha=$('#btnMosLisFecha');
  var menListNumOpe=$('#menListNumOpe');
  var spanNumOrd=$('#spanNumOrd');
  var divListNumOrden=$('#divListNumOrden');
  var btnMosListNumOrden=$('#btnMosListNumOrden');
  var navPill=$('.nav-pills>li>a');
  var btnMosLisEmpl=$('#btnMosLisEmpl');
  var divTablaEmpleados=$('#divTablaEmpleados');
  var capturaEmpleados=$('.capturaEmpleados');
  var uLTabCaptura=$('#uLTabCaptura');
  var modCapNumOrd = $('#modCapNumOrd');
  var capturaC=$('#capturaC');
  var modalCaptura= $('#modalCaptura');
  var inpRadioTM=$("input[name=tm]");
  var modalTiempoMuerto=$('#modalTiempoMuerto');
  var inpTiempoMuerto=$('.inpTiempoMuerto');
  var tTM=$('#tTM');
  var btnTM=$('#btnTM');
  var inpCantidadTTM=$('.inpCantidadTTM');
  var btnAgregarTTM=$('#btnAgregarTTM');
  var divFormTTM=$('.divFormTTM');
  var cuerpoModalTTM=$('#modalTiempoMuerto .modal-body').children();
  var btnEliminarTTM=$('#btnEliminarTTM');
  var formCaptura=$('#formCaptura');
  var tmC=$('#tmC');
  var cantidadC=$('#cantidadC');
  var capturarC=$('#capturarC');
  var fechaC=$('#fechaC');
  var elimNumEmp=$('.elimNumEmp');
  var navTabsuLTabCaptura=$('uLTabCaptura>li>a');
  var modDetCap=$('#modDetCap');
  var bandListaNumOrd=true;
  var arregloTiempoMuerto=[];
  var mensajeErrorGenerico='<div class="alert fade in" id="mensajeAlerta"><button type="button" class="close" data-dismiss="alert">&times;</button>';
  var divAlertMenCaptura='<div class="alert alert-success aCapNumEmp"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong></strong></div>';
  var inpFeAsis="";
  var inpNumEmp="";
  var cadNumParte="";
  var cadNumEmpList="";
  var parNumParte;
  var auxNumEmpl;
  var tabCapNumEmp=true;
  var numEmpleadoC="";
  var idTiempoMuerto="";
  var tiempoMuerto="";
  var clonDivFormTTM=0;
  var sumaMin=0;
  var idEmpleado="";
  var idDetAsis="";
  var capNumParte="";
  var capNumOrden="";
  var eficiencia="";
  var cantProg="";
  var fechaCaptura="";
  var hICaptura="";
  var hFCaptura="";
  var cantidad="";
  var minTM="";
  var numOMODCAP=$('#spanNOMC').html();
  var numPMODCAP=$('#spanNPMC').html();
  var cantModCaptura="";
  //variables enviadas para eliminar un empleado de la lista de número de orden, y guardamos el elemento de donde surgio el evento de elminacion;
  var numOrdenL="";
  var numEmpleadoL="";
  var liNumEmpleado;
  var dataList;
  //este evento se dispara cuando damos foco al input de la cantidad del formulario de la captura, y siempre que tenga el foco seleccionaremos la cantidad que este escrita en ese momento.
  cantidadC.focus(function() {
    $(this).select();
  });
  //deshabilita el botón de captura del formulario captura. cuando cambia el valor de cantidad o pierde el foco el input.f
  cantidadC.on('blur',function(e) {
    if (eficiencia.length=0) {
      return false;
    }
    if (eficiencia<20) {
      cantidad=$(this).val();
      console.log(e);
      if (cantidad.length>0) {
        capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      }
    }
  })
  //Evento que asocia a la tab cuando carga por completo el
  navPill.on('shown.bs.tab',function() {
    var nombreTab=$(this).text();
    switch (nombreTab) {
      case "CAPTURA":
      //vamos a construir la tabla de Lista Número de Ordenes, con el método $.post, en la pestaña de CAPTURA
      console.log(hoy);
      $.post('captura.php',{pBandListaNumOrd:bandListaNumOrd,pHoy:hoy},listCapNumOrd);
        break;
      case "NÚMERO DE ORDEN":
        inpNumParte.focus();
        break;
      case "ASISTENCIA":
      $("#txtAreCom").focus();
      default:
    }
  });
  inpNumParte.focus();
  var mensaBD=$('#mensajeBD');
  var inpFNumOrden=$('#inpFNumOrden');
  var hoy=$('#hoy').val();
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
  //función para mostrar hora con javascript

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
      cadNumParte=$(this).val().toUpperCase();
      var palabraC=$(this).val();
      //console.log(palabraC);
      if (cadNumParte.length>0) {
        $.ajax({
          url:'numOrden.php',
          type:'POST',
          data:{pPalabraC:cadNumParte},
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
    console.log(fechAsis+" "+comentAsis);
    $.post('asistencia.php',{pFechAsis:fechAsis,pComentAsis:comentAsis},postAsistencia)
  };
  //función del $.post Asistencia
  function postAsistencia(data,status) {
    var divBtnFechAsis=$('#divBtnFecha');
    var hermanosDiv=divBtnFechAsis.siblings().size();
    // console.log(data);
    if (hermanosDiv==4) {
        regresaMensaje(data,divBtnFechAsis);
    }
    if (hermanosDiv==5) {
      var idDiv=divBtnFechAsis.siblings('div:last-child').attr('id');
      if (idDiv=="divME"||idDiv=="divMERR") {
        $('#divME').remove()
        $('#divMERR').remove()
      }
      regresaMensaje(data,divBtnFechAsis);
    }
  };
  //función que nos permite aventar un mensaje de alerta si existe o no la fecha registrada
  function regresaMensaje(data,objeto) {
    var divMensajeExito="<div class='alert alert-success col-md-12 text-center' id='divME'></div>";
    var divMensajeError="<div class='alert alert-danger col-md-12 text-center' id='divMERR'></div>";
    var mensajeExito='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+data+' Fecha Registrada</strong>';
    var mensajeError='<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+"Ya existe esta fecha registrada"+'</strong>';
    divBtnFechAsis=objeto;
    if (data!=="Exito") {
      //console.log(divBtnFechAsis.siblings().size());
      $('#txtAreCom').val('');
      return divBtnFechAsis.after(divMensajeError).siblings('div:last-child').html(mensajeError);
    }else{
      console.log(data);
      console.log(divBtnFechAsis.siblings().size());
      $('#txtAreCom').val('')
      return divBtnFechAsis.after(divMensajeExito).siblings('div:last-child').append(mensajeExito);
    }
  }//fin de la función regresaMensaje
  //evento de click en el botón agregar
  inpNumEmpAsis.bind('keyup blur focus',mayusNumEmple);
  //con esta función vamos a convertir las letras en mayusculas
  function mayusNumEmple(e) {
    //console.log(e.type);
    switch (e.type) {
      case "keyup":
      cadNumEmpList=$(this).val().toUpperCase();
        break;
      case "blur":
      cadNumEmpList=$(this).val().toUpperCase();
        break;
      case "focus":
      cadNumEmpList=$(this).val().toUpperCase();
        break;
      default:
    }
  }
  //enviamos los datos de la lista a asistencia.php
  formListAsis.on('submit',listaEmpleados);
  function listaEmpleados(e) {
    e.preventDefault();
    inpNumEmpAsis.val(cadNumEmpList.trim());
    inpFeAsis=$('#inpFeAsis').val();
    inpNumEmp=inpNumEmpAsis.val();
    console.log(inpFeAsis + " " + inpNumEmp);
    //este $.post se encuentra en la línea 22 del archivo asistencia.php
    $.post('asistencia.php',{pInpFeAsis:inpFeAsis,pInpNumEmp:inpNumEmp,pHoy:hoy},postLista);
    function postLista(data,status) {
      // comprobamos que datos nos arrojo el post
      // console.log("datos: "+data+" respuesta: "+status);
      var capError= data.substr(0,1);
      console.log(capError);
      var banBtnMos=true;
      if (data.substr(1,2)=="YA") {
        if (btnMosLisFecha.html()=="Mostrar Lista Asistencia") {
          if ($('#tablaListaEmpleados').length<=0) {
            //Aquí mostramos la tabla de lista para mostrar el # de operador duplicado
            $.post('asistencia.php',{pHoy:hoy,pBAnBtnMos:banBtnMos},listEmplBtnLisFech);
          }
        }
      }
      if (capError=="E") {
        menListNumOpe.addClass('alert alert-danger col-md-12 text-center').html('<span>'+data.substr(1)+'</span>').show().fadeOut(5000);
        //aquí seleccionamos la columna idempleados(columna numero 2) de la tabla tablaListaEmpleados
        auxNumEmpl=inpNumEmpAsis.val().trim();
        $('#tablaListaEmpleados tr>td:nth-of-type(2)').each(busNumEmpTabla);
        inpNumEmpAsis.val("");
        inpNumEmpAsis.focus();
        return;
      }
      btnMosLisFecha.html("Ocultar Lista Asistencia");
      $('#divMosLista').html(data);
      inpNumEmpAsis.val("");
      inpNumEmpAsis.focus();
    }
  }//fin de la función listaEmpleados
  //función buscar empleado tablaListaEmpleados
  function busNumEmpTabla() {
    // console.log("entramos aquí en la línea 296");
    var numEmpTd=$(this).html();
    if ($(this).css('background-color')=="rgb(137, 185, 235)") {
      $(this).css('background-color','white').siblings().css({'background-color':$(this).css('background-color')});
      console.log("dentro de la función busNumEmpTabla");
      return;
    }
    if (numEmpTd==auxNumEmpl) {
      $('#btnMosLisFecha').html("Ocultar Lista Asistencia");
      $('#tablaListaEmpleados').show();
      $(this).css('background-color','rgb(137, 185, 235)').siblings().css({'background-color':$(this).css('background-color')});
      var bgColor=$(this).css('background-color');
    }
  }//fin de la función busNumEmpTabla
  //evento botón btnMosLisFecha
  btnMosLisFecha.on('click',btnMostrarOcultar);
  function btnMostrarOcultar() {
    var banBtnMos=true;
    var tituloBtn=$(this).html();
    console.log(tituloBtn);
    switch (tituloBtn) {
      case 'Mostrar Lista Asistencia':
        $('#tablaListaEmpleados').show();
        $(this).html("Ocultar Lista Asistencia");
        if ($('#tablaListaEmpleados').length<=0) {
          $.post('asistencia.php',{pHoy:hoy,pBAnBtnMos:banBtnMos},listEmplBtnLisFech);
        }
        // $.post('asistencia.php',{pHoy:hoy,pBAnBtnMos:banBtnMos},listEmplBtnLisFech);
        break;
      default:
        $('#tablaListaEmpleados').hide();
        $(this).html('Mostrar Lista Asistencia');
    }//fin del switch
  }//fin de la función btnMostrarOcultar
  function listEmplBtnLisFech(data,status){
    //console.log(data);
    $('#divMosLista').html(data);
    //damos formato a la fecha
    var cadFechaListAsi=$('#fechaListaAsis').html();
    $('#fechaListaAsis').html(cadFechaListAsi.split('-').reverse().join('-'));
    //aquí seleccionamos la columna idempleados(columna numero 2) de la tabla tablaListaEmpleados
    $('#tablaListaEmpleados tr>td:nth-of-type(2)').each(busNumEmpTabla);
  }
  //Aquí asígnamos el plug-in de dataTable
  $('#tableEmplAsis').DataTable({
    "language":{
      "url":"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  });
  //evento del botón con id=btnMosLisEmpl para mostrar la lista de empleados
  btnMosLisEmpl.on('click',tablaEmpleados);
  function tablaEmpleados() {
    var textoBoton=$(this).text();
    if (textoBoton=="Mostrar Lista Empleados") {
      $(this).text("Ocultar Lista Empleados");
      divTablaEmpleados.show();
    }else if(textoBoton=="Ocultar Lista Empleados"){
      divTablaEmpleados.hide();
      $(this).text("Mostrar Lista Empleados");
    }
  }
  function postTablaEmpleados(data,status) {
    $('#tableEmplAsis').html(data);
  }
  //Aquí empieza el código de la pestaña captura.
  btnMosListNumOrden.on('click',btnMosList);
  //función del evento click del buton con id=btnMosListNumOrden
  // console.log(divListNumOrden.html());
  function btnMosList(e) {
    var titButon=$(this).text();
    if (titButon=="Mostrar") {
      // console.log(divListNumOrden.children().length);
      // console.log(divListNumOrden);
      $(this).text("Ocultar");
      var fecha=hoy;
      $.post('captura.php',{pFecha:fecha},postBtnMosList);
    }else{
      // console.log(divListNumOrden.html());
      // console.log(divListNumOrden.children().length);
      $(this).text("Mostrar");
      divListNumOrden.hide();
      $('#chMostrarNumParte').removeAttr('checked');
      $('#divChBoxNumParte').hide();
    }

  }
  function postBtnMosList(data,status) {
    divListNumOrden.html(data);
    $('#divChBoxNumParte').show(100);
    divListNumOrden.show(100);
    // console.log(data);
  }
  //asignar evento al span de la lista que contiene el num orden
  divListNumOrden.on('click mouseover mouseout','.spanNumOrd',funSpanNuOr);
  //nos permite ocultar o mostrar el número de parte de numero de orden
  function funSpanNuOr(e) {
    //obtenemos el tipo de evento.
    var tipoEvento=e.type;
    switch (e.type) {
      case 'click':
        var atriDispLiNuPa=$(this).siblings("ul").children("li").css('display');
        if (atriDispLiNuPa=="none") {
          // console.log(atriDispLiNuPa);
          $(this).siblings('ul').children('li').show();
        }else{
          // console.log(atriDispLiNuPa);
          $(this).siblings('ul').children('li').hide();
        }
        // $(this).next().children('li').css('color','rgb(140, 38, 156)');
        // $(this).next().children('li').append("<p>Lorem ipsum dolor sit.</p>");

        break;
      case 'mouseover':
        break;
      case 'mouseout':
        break;
      default:
    }//fin del switch
  }
  //mostrar y ocultar numPartes
  $('#chMostrarNumParte').on('click',cheMosNumParte);
  function cheMosNumParte() {
      var chBoxPropCheck=$('#chMostrarNumParte').prop('checked')
    if (chBoxPropCheck) {
      $('.lisNumPart').each(function () {
        $(this).show();
      });
    }else{
      $('.lisNumPart').each(function () {
        $(this).hide();
      });
    }
  }//fin de la función numParte
  //estamos asignando  el evento click al componente creado en el archivo captura.php en la línea 36 de la función mostrarListaNumOrden
  divListNumOrden.on('click','.inpBtnLisNumEmp',liNumParte);
  function liNumParte(e) {
    var btnPresionado=$(this);
    console.log(btnPresionado);
    //guardamos el objeto del input
    var valInpNumEmp=$(this).prev().prev();
    //guardamos el número de orden de nuestra lista
    var valNumOrden=$(this).parent().parent().parent().parent().parent().children('span.spanNumOrd').text();
    var optionNumEmp=$(this).prev().children();
    //aquí comprobamos si el input donde vamos a ingresar el número de empleado es diferente de una cadena vacia y vamos a insertar el registro a la base de datos en la tabla
    if (!(valInpNumEmp.val()==="")) {
      $('[data-toggle="popover"]').popover('destroy');
      $.post('captura.php',{pHoy:fechaCompleta,pNumOrd:valNumOrden,pNumEmp:valInpNumEmp.val()},insertDetListNumOrd);
    }else{
      if (!(btnPresionado.attr('data-trigger')==="focus")) {
        btnPresionado.attr({'data-trigger':"focus", 'title':"Alerta",'data-content':"Ingresa un # Empleado"})
        $('[data-toggle="popover"]').popover('show');
      }else{
        $('[data-toggle="popover"]').popover('show');
      }
    }
    function insertDetListNumOrd(data,status) {
      if (data=="Exito") {
        var x=$('<li><span>'+valInpNumEmp.val()+'</span><span><a class="elimNumEmp" href="#">Eliminar</a></span></li>');
        // console.log($(this));
        btnPresionado.prev().prev().prev().append(x);
        optionNumEmp.each(function(index, value) {
          if ($(this).val()==valInpNumEmp.val()) {
            //guardamos el objeto del option que agregamos para utilizarlo en la eliminación
            $(this).remove();
          }
        });
        //si fue exitoso dejamos en blanco el input
        btnPresionado.prev().prev().val("");
        var lengthMenList = $('#menListNumOrdNumOp').length;
        (lengthMenList==1) ? $('#menListNumOrdNumOp').remove():"";
        //buscamos el número de orden de donde agregamos el empleado y lo guardamos en la variable numOrdenBadge.
        var numOrdenBadge=btnPresionado.parent().parent().parent().parent().parent().children("span.spanNumOrd").text();
        var diaHoy=$('#hoy').val();
        //  console.log(numOrdenBadge);
        //vamos a actualizar el badge del número de parte
        $.post('captura.php',{pActBadNumOrdn:"",pNumOrdenBadge:numOrdenBadge,pHoy:diaHoy},function(data,status) {
          btnPresionado.parent().parent().parent().parent().parent().children("span.badge").text(data);
        });
      }else{
        //si ocurrio un error dejamos en blanco el input
        btnPresionado.prev().prev().val("");
        //desplegamos el error ocurrido en un alert
        console.log($('#menListNumOrdNumOp'));
        var mensaje="<div id='menListNumOrdNumOp'class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+data+"</div>";
        if (!($('#menListNumOrdNumOp').length==1)) {
          btnPresionado.after(mensaje);
        }else {
          $('#menListNumOrdNumOp').remove()
          btnPresionado.after(mensaje);
        }
      }
      console.log(data);
      $('.inpCLNE').focus();
    }
  }//fin de la función liNumParte
  //evento blur de input <input class="form-control inpCLNE" list="inpLisNumParte0" name="inpLisNumParte">
  divListNumOrden.on('focus blur','.inpCLNE',blurListNumParte);
  function blurListNumParte(e) {
    $('[data-toggle="popover"]').popover('destroy');
  }
  //evento para eliminar el numero de empleado en la lista de número de orden pestaña "captura" subpestaña "Asignar Número de Empleado a Número de Orden"
  divListNumOrden.on('click','.elimNumEmp',eliminarEmpl);
  function eliminarEmpl(e) {
    e.preventDefault();
    liNumEmpleado=$(this).parent().parent();
    numOrdenL=$(this).parent().parent().parent().parent().parent().parent().parent().parent('.list-group-item').children('.spanNumOrd').html();
    numEmpleadoL=$(this).parent().siblings('span').html();
    var fecha=hoy;
    console.log(fecha);
    $.post('captura.php',{pNumEmpleado:numEmpleadoL,pNumOrd:numOrdenL,pF:fecha},funElimNumEmplListNumOrd);
  }
  function funElimNumEmplListNumOrd(data,status) {
    var datosJson=$.parseJSON(data);
    if (datosJson.Validacion=="Exito") {
      var idDataList=liNumEmpleado.parent().siblings('datalist').prop('id');
      dataList=liNumEmpleado.parent().siblings('datalist');
      console.log(datosJson);
      liNumEmpleado.remove();
      var fecha=hoy;
      $.post('captura.php',{pFecha:fecha,pNumOrdenL:numOrdenL},postElimNumEmpl);
    }
    function postElimNumEmpl(data) {
      console.log(data);
      var jsonDatos=$.parseJSON(data);
      dataList.html(jsonDatos.optionNumEmpl);
      // dataList.parent().parent().parent().parent().parent() .parent('.list-group-item').children('.spanNumOrd').html(jsonDatos.cantEmplNumOrd);
      console.log(jsonDatos);
      console.log(dataList.parent().parent().parent().parent().parent('.list-group-item').children('span.badge').html(jsonDatos.cantEmplNumOrd));
    }
    if (datosJson.Validacion=="ErrorDB") {
      window.alert("Error inesperado favor de contactar al administrador: "+"\n"+datosJson.Datos);
    }
    if (datosJson.Validacion=="ErrorControlado") {
      window.alert(datosJson.Datos);
    }
  }
  $('#tablaCaptura').on('click','.capturaEmpleados',clickCaptura);
  // capturaEmpleados.on('click',clickCaptura);
  function clickCaptura() {
    modCapNumOrd.modal({backdrop: "static",keyboard:false});
    //guardamos el número de parte para extraer el rate
    capNumParte=$(this).parent().siblings('.tdCapNumPart').html();
    capNumOrden=$(this).parent().siblings('.tdCapNumOrd').html();
    $.post('captura.php',{pcapNumOrden:capNumOrden},funCapNumOrde);
  }
  function funCapNumOrde(data,status) {
    var modDatos=$.parseJSON(data);
    $('#spanNOMC').html(numOMODCAP);
    $('#spanNPMC').html(numPMODCAP);
    $('#spanNOMC').html($('#spanNOMC').html()+capNumOrden);
    $('#spanNPMC').html($('#spanNPMC').html()+capNumParte);
    $('#divColListEmp').empty().append(modDatos.Datos);
    // console.log(modDatos.Datos);
  }
  //vamos a mostrar las capturas de un número de orden con un evento click y en un modal.
  $('#tablaCaptura').on('click','.detalleNumOrden',clickDetalleCap);
  function clickDetalleCap(e) {
    var numOrdenDC=$(this).parent().siblings(".tdCapNumOrd").html();
    var numParteDC=$(this).parent().siblings(".tdCapNumPart").html();
    // console.log(numOrdenDC+" "+numParteDC);
    var fechaDC=$('#hoy').val();
    // console.log(fechaDC);
    modDetCap.modal({backdrop: "static",keyboard:false});
    $('#spanNO','#modDetCap').html(numOrdenDC);
    $('#spanNP','#modDetCap').html(numParteDC);

    $.post('captura.php',{pNumOrdenDC:numOrdenDC,pfechaDC:fechaDC},postDetCaptura)
  }
  function postDetCaptura(data,status) {
    try {
      var d=$.parseJSON(data);
      $('#modDetCap tbody').empty();
      $('#tablaDetCap').DataTable().destroy();
      $('#modDetCap tbody').html(d.Datos);
      $('#tablaDetCap').DataTable({
        "language":{
          "url":"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
      });
      $('#tablaDetCap>div.modal-dialog.modal-lg').css('width',"100%");
      console.log(data);
    } catch (e) {
      console.log(e);
      console.log(data);
    }
  }

  //evento Buton para realizar la captura
  //vamos a construir la tabla de Lista Número de Ordenes, con el método $.post, en la pestaña de CAPTURA
  $.post('captura.php',{pBandListaNumOrd:bandListaNumOrd,pHoy:hoy,pInicio:true},listCapNumOrd);
  function listCapNumOrd(data,status) {
    //converir los string en datos Json.
    var jsonDatos=$.parseJSON(data);
    // console.log(jsonDatos);
    if (jsonDatos.Validacion=="Error") {
      var dia=jsonDatos.Datos;
      console.log(dia);
      // console.log($(mensajeErrorGenerico));
      mensajeErrorGenericoAux=$(mensajeErrorGenerico);
      var numHijosMenErr=mensajeErrorGenericoAux[0].childNodes.length
      if (numHijosMenErr==1) {
        mensajeErrorGenericoAux.addClass('alert-danger');
        mensajeErrorGenericoAux.append(dia);
        $('body').append(mensajeErrorGenericoAux);
      }else if (numHijosMenErr==1) {
        mensajeErrorGenericoAux2=$(mensajeErrorGenerico);
        mensajeErrorGenericoAux2.addClass('alert-danger');
        mensajeErrorGenericoAux2.append(dia);
        $('body').append(mensajeErrorGenericoAux2);
      }
      // alert(jsonDatos.Datos)
      // console.log(mensajeErrorGenerico['0'].childNodes.length);
      // console.log(mensajeErrorGenerico);
    }else if (jsonDatos.Validacion=="Exito") {
      var tbody=$.parseJSON(data);
      // console.log(tbody.Datos);
      $('#tablaCaptura').DataTable().destroy();
      $('#tablaCaptura>tbody').empty();
      // console.log(tbody.Datos);
      $('#tablaCaptura>tbody').append(tbody.Datos);
      $('#tablaCaptura').DataTable({
        "language":{
          "url":"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
      });
    }
  }
  //asínamos la API de dataTable
  $('#tablaCaptura').DataTable({
    "language":{
      "url":"http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    }
  });
  //Aquí vamos asignar eventos a las pestañas de la pestaña de CAPTURA cada vez que damos click.
  uLTabCaptura.children('li').each(iteracionUlTabCaptura);
  function iteracionUlTabCaptura() {
    $(this).on('shown.bs.tab',function(e) {
      var titLiA= $(this).children('a').html();
      var tabCapNumEmp=true;
      switch (titLiA) {
        case 'Captura Numero Orden':
        break;
        case 'Captura Numero de Empleado':
        $.post('captura.php',{pTabCapNumEmp:tabCapNumEmp},tablaCapNumEmple);
        break;
        case 'Asignar Número de Empleado a Número de Orden':
        break;
      }
    })
  }
  function tablaCapNumEmple(datos,estatus) {
    var tbody=$.parseJSON(datos);
    // console.log(datos);
    if (tbody.Validacion=="Exito") {
      $('#tableCapNumEmp>tbody').empty();
      $('#tableCapNumEmp>tbody').append(tbody.Datos)
    }
  }
  //evento Boton del modal, Captura por número de orden.
  modCapNumOrd.on('click','#capturaC',modalCapturaC);
  function modalCapturaC() {
    idEmpleado=$('.inpNumEmpl','#modCapNumOrd').val();
    idDetAsis=$('#'+idEmpleado).val();
    // console.log(idEmpleado+" "+idDetAsis);
    numEmpleadoC=$('.inpNumEmpl').val();
    if (numEmpleadoC.length==0) {
      alert("Por favor ingresa un número de empleado");
      $('.inpNumEmpl').focus().select();
      return;
    }
    var encontrado=false;
    $('datalist>option').each(function(indice,objeto) {
      console.log($(objeto).val()+" "+idEmpleado);
      if ($(objeto).val()==idEmpleado) {
        encontrado=true;
      }
    });
    if (!encontrado) {
      window.alert("número de empleado no valido");
      $('.inpNumEmpl').focus().select();
      return;
    }
    $('.inpNumEmpl').val('');
    // console.log(numEmpleadoC);
    modalCaptura.modal({backdrop: "static",keyboard:false});
  }
  //evento del modal cuando se abre por completo #modalCaptura
  $('#modalCaptura').on('shown.bs.modal show.bs.modal',cargComplModalCaptura);
  function cargComplModalCaptura(e) {
    if (e.type="show") {
      //aquí quitamos los alertas si de dejaron abierto
      var numAlert=$('#formCaptura',"#modalCaptura").children('div.aCapNumEmp').length;
      if (numAlert>0) {
        $('#formCaptura',"#modalCaptura").children('div.aCapNumEmp').remove();
      }
    }
    $('#spanNumEmp','#modalCaptura').empty();
    $('#spanNumEmp','#modalCaptura').html("Número de Empleado: "+idEmpleado);
    $('#spanNumEmp','#modalCaptura').css({'font-size':'18px','font-weight':'bold'});
    $('#spanIdDLNOC','#modalCaptura').empty();
    $('#spanIdDLNOC','#modalCaptura').html(" Id precaptura: "+idDetAsis);
    $('#spanIdDLNOC','#modalCaptura').css({'font-size':'18px','font-weight':'bold'});
    $('#spanNumOrdenC','#modalCaptura').empty();
    $('#spanNumOrdenC','#modalCaptura').html(" Número de Orden: "+capNumOrden);
    $('#spanNumOrdenC','#modalCaptura').css({'font-size':'18px','font-weight':'bold'});
    $('#spanNumParteC','#modalCaptura').empty();
    $('#spanNumParteC','#modalCaptura').html(" Número de Parte: "+capNumParte);
    $('#spanNumParteC','#modalCaptura').css({'font-size':'18px','font-weight':'bold'});
    $('input[name=tm]').removeAttr('checked');
    $('#cantidadC').val('0');
    var fechaServidor=$('#hoy').val();
    tmC.val('0');
    $('#tm1').prop('checked','checked');
    $('#eficienciaC').val('').css('background-color','#eee');
    if (fechaServidor=!fechaCompleta) {
      alert("Verificar fecha");
      return;
    }
    $('#cantidadC').focus().select();
    $('#fechaC').val(fechaCompleta);
    console.log($('#fechaC').val());
    var hora= fecha.getHours(),minutos=fecha.getMinutes(),segundos=fecha.getSeconds();
    if (hora<10) {
      hora="0"+hora;
      minutos="0"+minutos;
      segundos="0"+segundos;
    }
    horaComplet=hora+":"+minutos+":"+segundos;
    console.log(horaComplet);
    if (horaComplet>="07:00:00"&&horaComplet<"09:00:00") {
      $('#horaInicioC').val('07:00:00');
      $('#horaFinalC').val('08:00:00');
    }
    if (horaComplet>="09:00:00"&&horaComplet<"10:00:00") {
      $('#horaInicioC').val('08:00:00');
      $('#horaFinalC').val('09:00:00');
    }
    if (horaComplet>="10:00:00"&&horaComplet<"11:00:00") {
      $('#horaInicioC').val('09:00:00');
      $('#horaFinalC').val('10:00:00');
    }
    if (horaComplet>="11:00:00"&&horaComplet<"12:00:00") {
      $('#horaInicioC').val('10:00:00');
      $('#horaFinalC').val('11:00:00');
    }
    if (horaComplet>="12:00:00"&&horaComplet<"13:00:00") {
      $('#horaInicioC').val('11:00:00');
      $('#horaFinalC').val('12:00:00');
    }
    if (horaComplet>="13:00:00"&&horaComplet<"14:00:00") {
      $('#horaInicioC').val('12:00:00');
      $('#horaFinalC').val('13:00:00');
    }
    if (horaComplet>="14:00:00"&&horaComplet<"15:00:00") {
      $('#horaInicioC').val('13:00:00');
      $('#horaFinalC').val('14:00:00');
    }
    if (horaComplet>="15:00:00"&&horaComplet<"15:40:00") {
      $('#horaInicioC').val('14:00:00');
      $('#horaFinalC').val('15:00:00');
    }
    if (horaComplet>="15:40:00"&&horaComplet<"16:30:00") {
      $('#horaInicioC').val('15:00:00');
      $('#horaFinalC').val('16:00:00');
    }
    var idDetListaNumOrden=$('#'+numEmpleadoC).val();
  }
  //se dispara este evento del modal al momento de cerrar la ventana
  $('#modalTiempoMuerto').on('hidden.bs.modal',function(e) {
    // console.log(e);
  });
  //Aquí abrimos el modal cuando hay tiempo muerto
  inpRadioTM.change(function(e) {
    var valorRadioTT=$(this).val();
    //le quitamos el atributo data-dismiss
    if (valorRadioTT=="si") {
      btnTM.removeAttr('data-dismiss');
      modalTiempoMuerto.modal({backdrop:'static'});
      // var idModalTiempoMuerto=modalTiempoMuerto.attr('id');
      // $('#'+idModalTiempoMuerto+' .modal-body').css('background-color','green');
      // $.post('ttm.php.formCaptura').serialize(),respuestaTiempoM);
    }else if (valorRadioTT=="no") {
      console.log("entraste Aquí al radio button de no");
      $('#tmC').val('0');
      arregloTiempoMuerto=[];
      $.post('captura.php',{capNumParte},calcEficiencia);
    }
    // $('#modalTiempoMuerto .modal-body').empty();

    // $('#modalTiempoMuerto .modal-body').append(divFormTTM);
  });
  function respuestaTiempoM(data, status) {
    // console.log(data);
  }
  //evento del modal cuando carga el modal #modCapNumOr
  modCapNumOrd.on('shown.bs.modal',function() {
    //le damos el foco al input .inpNumEmpl.
    $('.inpNumEmpl').focus();
  });
  //evento modal cuando se abre el modal de Tiempo muerto
  modalTiempoMuerto.on('shown.bs.modal',function() {
    inpTiempoMuerto.val('');
    inpCantidadTTM.val('');
    inpTiempoMuerto.focus();
    arregloTiempoMuerto=[];
    sumaMin=0;
    $.post('captura.php',{pTipoTM:true},dataListTTM);
  });
  function dataListTTM(datos,status) {
    var dataListTipoTM=$.parseJSON(datos);
    if (dataListTipoTM.Validacion=="Exito") {
      tTM.empty();
      tTM.append(dataListTipoTM.Datos);
    }
    inpTiempoMuerto.change(function(e) {
      // console.log(e.target.value);
      switch (parseInt(e.target.value)) {
        case 1:
        $(e.target).siblings('.inpCantidadTTM').val(20);
        break;
        case 2:
        $(e.target).siblings('.inpCantidadTTM').val(40);
        break;
        case 3:
        $(e.target).siblings('.inpCantidadTTM').val(5);
        break;
        case 0:
        $(e.target).siblings('.inpCantidadTTM').val('');
        break;
        default:
        $(e.target).siblings('.inpCantidadTTM').val(0);
      }
    });
    // console.log(dataListTipoTM);
  }
  //evento click al pulsar al boton guardar del modal Tiempo Muerto
  btnTM.on('click',function() {
    var cantidadInpTiempoMuerto=$('.inpTiempoMuerto').val();
    var cantidadInpCantidadTTM=$('.inpCantidadTTM').val();
    if (cantidadInpTiempoMuerto==""||cantidadInpCantidadTTM=="") {
      window.alert('No puedes guardar sin antes agregar un tiempo muerto');
      return false;
    }
    var tiempoMuertosDiv=$('#modalTiempoMuerto .modal-body>.divFormTTM');
    tiempoMuertosDiv.each(function(index,element) {
      var i=$(this).children('.inpTiempoMuerto').val();
      var j=$(this).children('.inpCantidadTTM').val();
      arregloTiempoMuerto.push([i,j]);
      // console.log(arregloTiempoMuerto);
      // console.log("idTiempoMuerto: "+i+" Cantidad Minutos: "+j);
      // $.post('captura.php',{capNumParte},calcEficiencia);
    });
    // console.log(arregloTiempoMuerto);
    // console.log($('#modalTiempoMuerto .modal-body')[0].childNodes.length);
    if ($('#modalTiempoMuerto .modal-body')[0].childNodes.length>5) {
      // console.log(cuerpoModalTTM);
      $('#modalTiempoMuerto .modal-body').empty();
      $('#modalTiempoMuerto .modal-body').append(cuerpoModalTTM);
      $('#modalTiempoMuerto .modal-body').children('.inpTiempoMuerto').val('');
      $('#modalTiempoMuerto .modal-body').children('.inpCantidadTTM').val('');
    }
    //Aquí sumamos el total del tiempo muerto
    $.each(arregloTiempoMuerto,function (key,value) {
      // console.log(value.min);
      sumaMin=parseInt(sumaMin)+parseInt(value[1]);
    });
    $('#tmC').val(sumaMin);
    $(this).attr('data-dismiss','modal');
    cantidadC.focus();
    $.post('captura.php',{capNumParte},calcEficiencia);
  });
  //evento del boton cancelar del modal tiempo muerto
  $('#btnCanTTM').on('click',function() {
    //lo que hacemos aquí es que los input tipo radio button queden deseleccionados.
    $('input[name=tm]:checked').removeAttr('checked');
    $('#tm1').prop('checked','checked');
  })
  var clon;
  $('#modalTiempoMuerto .modal-body').on('click','#btnAgregarTTM',function() {
    clon=divFormTTM.clone('true');
    clon.children('.inpTiempoMuerto').val("");
    clon.children('.inpCantidadTTM').val("");
    btnAgregarTTM.before(clon);
    clon.children('.inpTiempoMuerto').focus();
  });

    // if ($(this).parent().children('.divFormTTM').length==1) {
    //   return;
    // }
    modalTiempoMuerto.on('dblclick','.divFormTTM',function() {
    $(this).toggleClass('divSelecionadoElim');
  });
  modalTiempoMuerto.on('click','#btnEliminarTTM',function() {
    var divTTM=$('#modalTiempoMuerto .modal-body>.divFormTTM');
    console.log(divTTM);
    divTTM.each(function(index,elemento) {
      console.log($(this).attr('class'));
      console.log(index);
      if (index==0) {
        $(this).removeClass('divSelecionadoElim');
      }
      if ($(this).attr('class')=='form-group form-inline divFormTTM divSelecionadoElim') {
        $(this).remove();
      }
    })
  });

  formCaptura.on('submit',formularioCaptura);
  function formularioCaptura(e) {
    e.preventDefault();
    var cantValid=$('#cantidadC').val();
    var fechaValid=$('#fechaC').val();
    var hIValid=$('#horaInicioC').val();
    var hFValid=$('#horaFinalC').val();
    if (hFCaptura!=hFValid|| hICaptura!=hIValid||cantValid!=cantidad||fechaValid!=fechaCaptura) {
      window.alert("Vuelve a calcular eficiencia");
      cantidadC.focus().select();
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      return false;
    }
    //se implementa esto para google chrome porque al momento de obtener los datos de la hora de inicio y fin solamente trae las horas y minutos y necesitamos lo segundos también para insertar en la base de datos.
    var horaI,HoraF;
    horaI=$(e.target).find('#horaInicioC');
    horaF=$(e.target).find('#horaFinalC');
    if (horaI.val().length==5) {
      horaI.val($(e.target).find('#horaInicioC').val()+":00");
    }else if (horaF.val().length==5) {
      horaF.val($(e.target).find('#horaFinalC').val()+":00");
    }
    var datosForm=$(this).serialize();
    //cuando no haya tiempo muerto. no se envia el arregloTiempoMuerto
    if ($('#tm1').prop('checked')) {
      console.log(datosForm);
      $.post('captura.php',{pIdEmpleado:idEmpleado,pIdDetAsis:idDetAsis,pDatosForm:datosForm,},postFormCaptura);
      return false;
    }
    console.log(datosForm);
    // Aquí enviamos el tiempo muerto al servidor
    $.post('captura.php',{pIdEmpleado:idEmpleado,pIdDetAsis:idDetAsis,pDatosForm:datosForm,pArregloTiempoMuerto:arregloTiempoMuerto},postFormCaptura)
  };
  function postFormCaptura(data,status) {
    try {
      datosJson=$.parseJSON(data);
    } catch (e) {
      $("#formCaptura").append($(divAlertMenCaptura).addClass("alert-danger").html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+'<p class="text-center">Error Inesperado: '+e+'</p>').css({'margin-top':'10px','font-size':'17px'}));
      console.log(data);
      console.log(e);
      return false;
    }
    // console.log(datosJson);
    alertasCaptura(datosJson);
  }
  //aquí mostramos los tipos de validación que tenemos al momento de hacer la captura errores de la base de datos, errores que no deberian pasar como caputuras duplicadas
  function alertasCaptura(datosJson) {
    console.log(datosJson);
    console.log(datosJson.Validacion);
    switch (datosJson.Validacion) {
      case "ErrorDB":
        $("#formCaptura").append($(divAlertMenCaptura).addClass("alert-danger").html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+'<p class="text-center">Error Inesperado: '+datosJson.Datos+'</p>').css({'margin-top':'10px','font-size':'15px'}));
      break;
      case "Exito":
        var ocultarModal = setTimeout($('#modalCaptura').modal('hide'),5000);
        $("#capturaC").after($(divAlertMenCaptura).addClass("alert-success").html('<p class="text-center"> '+datosJson.Datos+'</p>').css({'margin-top':'10px','font-size':'17px','margin-bottom':"0px"}).fadeIn(500).fadeOut(2500));
        clearTimeout(ocultarModal);
        $('#modCapNumOrd input.inpNumEmpl').focus();
      break;
      case "Advertencia":
        var ocultarModal = setTimeout($('#modalCaptura').modal('hide'),5000);
        $("#capturaC").after($(divAlertMenCaptura).addClass("alert-warning").html('<p class="text-center"> '+'<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>'+datosJson.Datos+'</p>').css({'margin-top':'10px','font-size':'17px','margin-bottom':"0px"}).fadeIn(1000).fadeOut(3000));
        clearTimeout(ocultarModal);
        $('#modCapNumOrd input.inpNumEmpl').focus();
      break;
      case "Error":
      $("#formCaptura").append($(divAlertMenCaptura).addClass("alert-danger").html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+'<p><h4 class="text-center">'+datosJson.Validacion+": "+datosJson.Datos+'</h3></p>').css({'margin-top':'10px','font-size':'15px'}).append("<p class='text-center'>idCaptura: "+datosJson.DatosExtra.idcaptura+" Fecha: "+datosJson.DatosExtra.fecha+" Eficiencia: "+datosJson.DatosExtra.eficiencia+" Hora Inicio: "+datosJson.DatosExtra.hora_inicio+" Hora Final: "+datosJson.DatosExtra.hora_final+" Detalle Lista Número de orden: "+datosJson.DatosExtra.iddetalle_Lista_NumOrdenCap+"</p>"));
      break;
      default:
    }//fin del switch
    // $("#formCaptura").append($(divAlertMenCaptura).html(datosJson.Validacion+datosJson.Datos).show(200).hide(4000));
  }//fin de la función alertasCaptura
  modCapNumOrd.on('keypress','.inpNumEmpl',function(e) {
    if (e.keyCode==13) {
      //aqui lanzamos el trigger como si hubieramos hecho un click en el boton de capturaC del modal captura por número de orden.
      $('#capturaC',modCapNumOrd).trigger('click');
    }
  });
  //al momento de presionar la tecla tap o flecha derecha nos dirija al radio button del tiempo muerto
  cantidadC.on('keydown',function(e) {
    // console.log(e.key);
    // console.log(e.type);
    // la tecla tab es el key='Tab', la tecla derecha ArrowRight
    if (e.key=="ArrowRight") {
      cantModCaptura=$(this).val();
      $.post('captura.php',{capNumParte},calcEficiencia);
      // $('#tm1').focus();
    }
    if (e.key=="Tab") {
      // e.preventDefault();
    }
    if (e.key=="Enter") {

    }
    // console.log(e);
  });
  function calcEficiencia(data,status) {
    //aquí solamente vamos a obtener el rate del número de parte.
    var datos,rateNP,horaInicio,horaFinal,inpHoraInicio,inpHoraFinal, minTrab,minNP;
    datos=$.parseJSON(data);
    rateNP=datos.Datos;
    minTM=$('#tmC').val();
    cantidad=$('#cantidadC').val();
    fechaCaptura=fechaC.val();
    hICaptura=$('#horaInicioC').val();
    hFCaptura=$('#horaFinalC').val();
    horaInicio= new Date();
    horaFinal= new Date();
    hi=horaInicio;
    hf=horaFinal;
    inpHoraInicio=hICaptura.split(':');
    inpHoraFinal=hFCaptura.split(':');
    horaInicio.setHours(inpHoraInicio[0],inpHoraInicio[1],00);
    horaFinal.setHours(inpHoraFinal[0],inpHoraFinal[1],00);
    if (horaInicio.valueOf()==horaFinal.valueOf()) {
      window.alert("La hora inicio no puede ser igual a la hora final");
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      return false;
    }
    if (horaInicio>=horaFinal) {
      hi.setHours(23,00,00);
      hf.setHours(00,00,00);
      if (!(horaInicio.valueOf()==hi.valueOf()&&horaFinal.valueOf()==hf.valueOf())){
        window.alert("La hora inicio debe ser mayor a la hora final");
        capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
        return false;
      }
    }
    if (cantidad==""||cantidad<0||isNaN(cantidad)) {
      window.alert('Ingresa un número entero o una cantidad en la caja de texto CANTIDAD');
      $('#cantidadC').focus();
      return false;
    }
    hiMinMili=horaInicio.getMinutes()*60000;
    horaInicioAux=horaInicio.valueOf()-hiMinMili;
    horaInicioAux=horaInicioAux+3600000;
    horaInicioAux= new Date(horaInicioAux);
    if (horaInicio>horaFinal) {
      window.alert("La hora final debe menor a la hora de inicio");
      return false;
    }
    if (horaInicioAux.toTimeString()>=horaFinal.toTimeString()) {
      console.log("Bien hecho :D");
    }else{
      window.alert("La hora final debe ser igual o menor a esta hora "+horaInicioAux.toLocaleTimeString());
      $("#horaFinalC").focus().select();
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      return false;
    }
    minNP=((horaFinal-horaInicio)/1000)/60;
    if (minNP>60) {
      window.alert('Ingresa un verifica la hora Final no puedes pasar de la siguiente HORA');
      $('#horaFinalC').focus();
      return false;
    }
    console.log("Minutos totales: "+ minNP);
    minTrab=minNP-minTM;
    console.log("Minutos Trabajados: "+ minTrab);
    cantProg=(rateNP/60)*minTrab;
    eficiencia=(cantidad/cantProg)*100;
    eficienciaM=eficiencia.toFixed(2);
    eficiencia=eficienciaM;
    if (eficiencia<=0) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#fe0e24','color':'white'});
      window.alert("eficiencia no valida");
      return false;
    }
    eficienciaColor(eficiencia);
  }
  //esta función cambia de color el input de la eficiencia
  function eficienciaColor(eficiencia) {
    if (eficiencia<85) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#fe0e24','color':'white'});
      capturarC.removeClass("disabled btn-default").removeAttr('disabled').addClass('btn-primary');
    }
    if (eficiencia>=85&&eficiencia<95) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#0500ff','color':'white'});
      capturarC.removeClass('disabled btn-default').removeAttr('disabled').addClass('btn-primary');
    }
    if (eficiencia>=95&&eficiencia<=100) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#4eff06','color':'white'});
      capturarC.removeClass('disabled btn-default').removeAttr('disabled').addClass('btn-primary');
    }
    if (eficiencia>100) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#fe0e24','color':'black'});
      capturarC.removeClass('disabled btn-default').removeAttr('disabled').addClass('btn-primary');
      // window.alert("verificar el tiempo muerto o la cantidad, eficiencia no valida");
      // $('#cantidadC').val("");
      // $('input[name=tm]:checked').removeAttr('checked');
      // $('#tm1').prop('checked','checked');
      // eficiencia=="";
      // cantProg=="";
      // cantidad=="";
      // minTM="";
      // tmC.val(0);
      // capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      if (eficiencia>150) {
        window.alert("verificar el tiempo muerto o la cantidad, eficiencia no valida");
        $('#cantidadC').val("");
        $('input[name=tm]:checked').removeAttr('checked');
        $('#tm1').prop('checked','checked');
        eficiencia=="";
        cantProg=="";
        cantidad=="";
        minTM="";
        tmC.val(0);
        capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      }
    }
  }//fin de la función eficienciaColor
  //funciones de las alertas de la capturas
  //sección de POST
  $.post('captura.php',{pTabCapNumEmp:tabCapNumEmp},tablaCapNumEmple);
});//fin del la función del ready

//función click de la lista de los número de parte #listaNumParte
function set_item(item) {
  // change input value
  $('#inpNumParte').val(item);
  // hide proposition list
  $('#listaNumParte').hide();
  $('#inpCantReq').focus().select();
}
/*Recorrer el arreglo cuando tenemos mas de una fila en la consulta que nos envian desde el servidor
for (var i = 0; i < dat.Datos.length; i++) {
  console.log(dat.Datos[i].cantidad);
}*/
// (function imprimeHora() {
//   var d= new Date();
//   var horas=d.getHours();
//   var minutos=d.getMinutes();
//   var segundos=d.getSeconds();
//   document.getElementById('spanHora').innerHTML=horas+":"+minutos+":"+segundos;
//   setInterval(imprimeHora,1000);
// })();
/*Este ejemplo nos muestra los valores de un arreglo
$.each(arregloTiempoMuerto,function (key,value) {
  console.log(value.min);
  console.log(value.idTTM);
});*/
