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
  console.log(cuerpoModalTTM);
  var bandListaNumOrd=true;
  var arregloTiempoMuerto=[[],[]];
  var mensajeErrorGenerico='<div class="alert fade in" id="mensajeAlerta"><button type="button" class="close" data-dismiss="alert">&times;</button>';
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
  //Evento que asocia a la tab cuando carga por completo el
  navPill.on('shown.bs.tab',function() {
    var nombreTab=$(this).text();
    switch (nombreTab) {
      case "CAPTURA":
      //vamos a construir la tabla de Lista Número de Ordenes, con el método $.post, en la pestaña de CAPTURA
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
  inpParcial.attr('disabled','');
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
    inpNumEmpAsis.val(cadNumEmpList);
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
        auxNumEmpl=inpNumEmpAsis.val();
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
      console.log(divListNumOrden.children().length);
      console.log(divListNumOrden);
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
        var x=$('<li><span>'+valInpNumEmp.val()+'</span><span>Eliminar</span></li>');
        console.log($(this));
        btnPresionado.prev().prev().prev().append(x);
        optionNumEmp.each(function(index, value) {
          if ($(this).val()==valInpNumEmp.val()) {
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
        })
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
    }
  }//fin de la función liNumParte
  //evento blur de input <input class="form-control inpCLNE" list="inpLisNumParte0" name="inpLisNumParte">
  divListNumOrden.on('focus blur','.inpCLNE',blurListNumParte);
  function blurListNumParte(e) {
    $('[data-toggle="popover"]').popover('destroy');
  }
  $('#tablaCaptura').on('click','.capturaEmpleados',clickCaptura);
  // capturaEmpleados.on('click',clickCaptura);
  function clickCaptura() {
    modCapNumOrd.modal({backdrop: "static"});
    $(this).parent().siblings();
    var capNumOrden=$(this).parent().siblings('.tdCapNumOrd').html();
    $.post('captura.php',{pcapNumOrden:capNumOrden},funCapNumOrde);
  }
  function funCapNumOrde(data,status) {
    var modDatos=$.parseJSON(data);
    $('#modCapNumOrd .modal-body').empty().append(modDatos.Datos);
    // console.log(modDatos.Datos);
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
      $('#tablaCaptura>tbody').empty();
      // console.log(tbody.Datos);
      $('#tablaCaptura>tbody').append(tbody.Datos);
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
  modCapNumOrd.on('click','#capturaC',modalCapturaC);
  function modalCapturaC() {
    // console.log($(this));
    numEmpleadoC=$('.inpNumEmpl').val();
    if (numEmpleadoC.length==0) {
      alert("Por favor ingresa un número de empleado");
      return;
    }
    // console.log(numEmpleadoC);
    modalCaptura.modal({backdrop: "static"});
  }
  //evento del modal #modalCaptura
  $('#modalCaptura').on('shown.bs.modal',cargComplModalCaptura);
  function cargComplModalCaptura() {
    var fechaServidor=$('#hoy').val();
    if (fechaServidor=!fechaCompleta) {
      alert("Verificar fecha");
      return;
    }
    $('#cantidadC').focus().select();
    $('#fechaC').val(fechaCompleta);
    console.log($('#fechaC').val());
    var hora= fecha.getHours(),minutos=fecha.getMinutes(),segundos=fecha.getMinutes();
    if (hora<10) {
      hora="0"+hora;
      minutos="0"+minutos;
      segundos="0"+segundos;
    }
    horaComplet=hora+":"+minutos+":"+segundos;
    if (horaComplet>="07:00"&&horaComplet<"09:00") {
      $('#horaInicioC').val('07:00');
      $('#horaFinalC').val('08:00');
    }
    if (horaComplet>="09:00"&&horaComplet<"10:00") {
      $('#horaInicioC').val('08:00');
      $('#horaFinalC').val('09:00');
    }
    if (horaComplet>="10:00"&&horaComplet<"11:00") {
      $('#horaInicioC').val('09:00');
      $('#horaFinalC').val('10:00');
    }
    if (horaComplet>="11:00"&&horaComplet<"12:00") {
      $('#horaInicioC').val('10:00');
      $('#horaFinalC').val('11:00');
    }
    if (horaComplet>="12:00"&&horaComplet<"13:00") {
      $('#horaInicioC').val('11:00');
      $('#horaFinalC').val('12:00');
    }
    if (horaComplet>="13:00"&&horaComplet<"14:00") {
      $('#horaInicioC').val('12:00');
      $('#horaFinalC').val('13:00');
    }
    if (horaComplet>="14:00"&&horaComplet<"15:00") {
      $('#horaInicioC').val('13:00');
      $('#horaFinalC').val('14:00');
    }
    if (horaComplet>="15:00"&&horaComplet<"15:40") {
      $('#horaInicioC').val('14:00');
      $('#horaFinalC').val('15:00');
    }
    if (horaComplet>="15:40"&&horaComplet<"14:30") {
      $('#horaInicioC').val('15:00');
      $('#horaFinalC').val('16:00');
    }
    var idDetListaNumOrden=$('#'+numEmpleadoC).val();
  }
  //Aquí abrimos el modal cuando hay tiempo muerto
  inpRadioTM.change(function() {
    var valorRadioTT=$(this).val();
    // console.log(valorRadioTT);
    //le quitamos el atributo data-dismiss
    btnTM.removeAttr('data-dismiss');
    if (valorRadioTT=="si") {
      modalTiempoMuerto.modal({backdrop:'static'});
      // var idModalTiempoMuerto=modalTiempoMuerto.attr('id');
      // $('#'+idModalTiempoMuerto+' .modal-body').css('background-color','green');
      // $.post('ttm.php.formCaptura').serialize(),respuestaTiempoM)
    };
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
  modalTiempoMuerto.on('shown.bs.modal',function() {
    inpTiempoMuerto.focus();
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
        default:
        $(e.target).siblings('.inpCantidadTTM').val(0);
      }
    });
    // console.log(dataListTipoTM);
  }
  //evento click al pulsar al boton guardar del modal Tiempo Muerto
  btnTM.on('click',function() {
    var tiempoMuertosDiv=$('#modalTiempoMuerto .modal-body>.divFormTTM');
    tiempoMuertosDiv.each(function(index,element) {
      // console.log("indice: "+index);
      // console.log("elemento: ");
      // console.log($(element));
      var i=$(this).children('.inpTiempoMuerto').val();
      var j=$(this).children('.inpCantidadTTM').val();
      console.log("idTiempoMuerto: "+i+" Cantidad Minutos: "+j);
    });
    $(this).attr('data-dismiss','modal');
    console.log($('#modalTiempoMuerto .modal-body')[0].childNodes.length);
    if ($('#modalTiempoMuerto .modal-body')[0].childNodes.lengt>5) {
      $('#modalTiempoMuerto .modal-body').empty();
      $('#modalTiempoMuerto .modal-body').append(cuerpoModalTTM)
    }
    // console.log($('#modalTiempoMuerto .modal-body')[0].childNodes.length);
    // $(this).removeAttr('data-dismiss');
    // console.log(tiempoMuertosDiv);
  });
  var clon;
  $('#modalTiempoMuerto .modal-body').on('click','#btnAgregarTTM',function() {
    clon=divFormTTM.clone('true');
    clon.children('.inpTiempoMuerto').val("");
    clon.children('.inpCantidadTTM').val("");
    btnAgregarTTM.before(clon);
    clon.children('.inpTiempoMuerto').focus();
  });
  //sección de POST
  $.post('captura.php',{pTabCapNumEmp:tabCapNumEmp},tablaCapNumEmple);

});//fin del ready

//función click de la lista de los número de parte #listaNumParte
function set_item(item) {
  // change input value
  $('#inpNumParte').val(item);
  // hide proposition list
  $('#listaNumParte').hide();
  $('#inpCantReq').focus().select();
}
// (function imprimeHora() {
//   var d= new Date();
//   var horas=d.getHours();
//   var minutos=d.getMinutes();
//   var segundos=d.getSeconds();
//   document.getElementById('spanHora').innerHTML=horas+":"+minutos+":"+segundos;
//   setInterval(imprimeHora,1000);
// })();
