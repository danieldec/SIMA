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
  var tablaReq=$('#tablaReq');
  var horaInicioC=$('#horaInicioC');
  var horaFinalC=$('#horaFinalC');
  var btnBNONP=$('#btnBNONP');
  var inpBNONP=$('#inpBNONP');
  var jqxNotiModCap = $('#jqxNotiModCap');
  var feNOI = $('#feNOI');
  var fecDetAsis = $('#fecDetAsis');
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
  var numOrdenDC;
  //variables enviadas para eliminar un empleado de la lista de número de orden, y guardamos el elemento de donde surgio el evento de elminacion;
  var numOrdenL="";
  var numEmpleadoL="";
  var liNumEmpleado;
  var dataList;
  //variables requerimientos Numero de orden
  var cantR="";
  var parcR="";
  var paPR="";
  var proR="";
  var balR="";
  var parReqNumOrdR="";
  var ig=0;
  //variables Editar captura TM
  var idCapEC='';
  var sumaTMEC='';
  var horaIEC='';
  var horaFEC='';
  var eficienciaEC='';
  var cantidadECVI='';
  var horaIECVI='';
  var horaFECVI='';
  var minTMECVI='';
  var eficienciaECVI='';
  var zInd=$('#modCapNumOrd').css('zIndex');
  divNotificaciones=$('#divNotificaciones');
  var fechaDiaDet=new Date()
  //inicializamos el datepick del plug-in
  // horaInicioC.timeAutocomplete({formatter: '24hr'});
  // horaFinalC.timeAutocomplete({formatter: '24hr'});
  horaInicioC.timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
  horaFinalC.timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
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
      // console.log(e);
      if (cantidad.length>0) {
        capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      }
    }
  })
  //Evento que asocia a la tab cuando carga por completo el
  navPill.on('show.bs.tab shown.bs.tab',function(e) {
    if (e.type=="shown") {
      inpNumOrden.focus().select();
    }
    if (e.type=="show") {
      var nombreTab=$(this).text();
      switch (nombreTab) {
        case "CAPTURA":
        //vamos a construir la tabla de Lista Número de Ordenes, con el método $.post, en la pestaña de CAPTURA
        // console.log(hoy);
        $.post('captura.php',
        {
          pBandListaNumOrd:bandListaNumOrd,
          pHoy:hoy
        },listCapNumOrd);
        break;
        case "NÚMERO DE ORDEN":
        // inpNumOrden.focus();
        break;
        case "ASISTENCIA":
        $("#txtAreCom").focus();
        break;
        case "REQUERIMIENTOS":
        //vamos  a crear la tabla de requerimientos a partir de la información obtenida de la base de datos.
        var fechaHoy=$('#hoy').val();
        var reqNumOrden=true;
        $.post('requerimientos.php',{pFechaHoy:fechaHoy,pReqNumOrden:reqNumOrden},reqNumOrdenPost);
        break;
        default:
      }
    }
  });
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
  console.log(fechaCompleta);
  //hasta aquí se acaba lo de la fecha.
  if (fechaCompleta==!inpFNumOrden.val()) {
    //console.log("revisar la fecha de la computadora");
    inpFNumOrden.val("").attr('disabled','');
    alert("revisar la fecha de la computadora");
  }
  if (numOrden=="0") {
    mensaBD.addClass('alert alert-danger text-center').show().fadeOut(10000);
  }else{
    mensaBD.addClass('alert alert-danger text-center').hide().fadeOut(10000);
  }
  //vamos a realizar el autocomplete
  inpNumParte.autocomplete({
		source:listaNumParteEx,
		minLength:2,
		select:function(event,ui) {
      inpNumParte.val(ui.item.value);
			var nParteSelect=inpNumParte.val();
      inpCantReq.focus().select();
      funObtRate();
		}
	});//fin del autcomplete
	//Aquí termina el método del autocomplete()
	//Aquí empieza el metodo listaEmpleados
	function listaNumParteEx(request,response) {
		$.post({
			url:"php/numParte.php",
			dataType:'json',
			data:{numParte:request.term},
			success:function (data) {
				response(data);
			},
			type:'POST',
      error:errorFuncionABtnEmp
		});
	}//fin de la función listaEmpleados.
  function funObtRate() {
    var nParteSelect=inpNumParte.val();
    $.post({
			url:"php/numParte.php",
			dataType:'json',
			data:{nParteSelect:nParteSelect,np:true},
			success:exitoFunObRate,
			type:'POST',
      error:errorFuncionABtnEmp
		});
  }//fin de la función funObtRate
  function exitoFunObRate(datos,x,y) {
    if (datos.validacion=="exito") {
      var rate = datos.datos;
      $('#rateNumP').val(rate);
    }else if (datos.validacion=="error") {
      divNotificaciones.html(datos.datos);
      jqxNotiModCap.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
      $('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
    }
  }
  //evento relacionado con los input de numpare y requerimiento para traer el dato del rate del numero de parte
  $('#inpNumParte,#inpCantReq').on('blur focusin',evtInpReqNP);
  function evtInpReqNP(e) {
    var rateNP=$('#rateNumP').val();
    var longRateNP=$('#rateNumP').val().length;
    /*if (e.currentTarget.id=="inpNumParte"&&e.type=='blur') {
      console.log("estamos saliendo del input con id inpNumParte con el evento blur");
    }*/
    if ((e.currentTarget.id=='inpCantReq'&&e.type=='focusin')||rateNP==0||longRateNP<2) {
      if ($('#inpNumParte').val()==0||$('#inpNumParte').val().length<2||$('#inpNumParte').val().length>10) {
        if ($('#rateNumP').val()!=0&&$('#rateNumP').val().length>1) {
          $('#rateNumP').val('0');
        }
      }
      var nParteSelect=inpNumParte.val();
      $.post({
  			url:"php/numParte.php",
  			dataType:'json',
  			data:{nParteSelect:nParteSelect,np:true},
  			success:exitoFunObRate,
  			type:'POST',
        error:errorFuncionABtnEmp
  		});
    }
  }

  //busqueda de los número de parte en el input NumParte
  /*inpNumParte.on('keyup keydown keypressed blur',function(e) {
    if (e.type=="keyup"&&e.which!=219) {
      cadNumParte=$(this).val().toUpperCase();
      var palabraC=$(this).val();
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
      //console.log(typeof inpNumParte.val()+" "+inpNumParte.val().length);
      if (inpNumParte.val().length>0) {
        $('#listaNumParte').hide();
        parNumParte=inpNumParte.val();
        //console.log(parNumParte);
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
  });//fin delevento keyup keydown keypressed blur del input inpNumParte*/
  /*$('#inpCantReq').on('focusin',function(e) {
    console.log(e);
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

  function obtenerParcial(data,status) {
    //console.log(data+" "+status);
    if (!(data==0)) {
      inpFNumOrden.focus();
      var cantidadReq;
      inpParcial.val(data);
      var parcial=inpParcial.val();
      cantidadReq=window.prompt("Ingresa la cantidad");
      canReq=parseInt(cantidadReq);
      //console.log(canReq);
      if (cantidadReq===null||isNaN(canReq)||canReq<parcial) {
        //console.log(parseInt(cantidadReq) +" "+cantidadReq);
        window.alert("Verifica la cantidad ingresada sea mayor que el parcial o que hayas ingresado un número");
        //console.log("ingresa una cantidad");
        return;
      }
      var total=cantidadReq-parcial;
      inpCantReq.val(total);
      inpCantReq.attr('disabled','disabled');
    }else{
    }
  }//fin de la función obtenerParcial*/
  //formulario para generar número de orden

  formNumOrden.on('submit',function(e) {
    e.preventDefault();
    var vNumOrden=$('#inpNumOrden').val();
    var vNumParte=inpNumParte.val();
    var vCantidadReq=$('#inpCantReq').val();
    var vFechaNumOrden=$('#inpFNumOrden').val();
    var vNumUsuario=$('#inpNumUsuario').val();
    var fechaMostrar=vFechaNumOrden.split('-').reverse().join('-');
    //console.log(parNumParte);
    if (vCantidadReq<1) {
      window.alert("Ingresa el requerimiento del Folio");
      $('#inpCantReq').focus().select();
      return;
    }
    //console.log(vNumOrden+" "+vNumParte+" "+vCantidadReq+" "+vFechaNumOrden+" "+vNumUsuario);
    var confirmacion= window.confirm("Son correcto los siguientes datos:"+"\n#Parte: "+vNumParte+"\nCantidad: "+vCantidadReq+"\nFecha: "+fechaMostrar);
    if (confirmacion) {
      $.ajax({
        url:'numOrden.php',
        type:'POST',
        dataType:'json',
        data:{pVNumOrden:vNumOrden,pVNumParte:vNumParte,pVCantidadReq:vCantidadReq,pVFechaNumOrden:vFechaNumOrden,pVNumUsuario:vNumUsuario},
        success:exitoSubNM
      });
    }
  });//fin del submit formNumOrden
  //vamos a inicializar ventana de la edición de la captura
  $('#venEditNM').jqxWindow({
    height:'100%',
    width:'100%',
    maxWidth:'900px',
    maxHeight:'200px',
    autoOpen:false
  });
  function exitoSubNM(datos,x,y) {
    if (datos.validacion=="exito") {
      divNotificaciones.html(datos.datos);
      $(jqxNotiModCap).jqxNotification({template:'success',autoClose:true,autoCloseDelay:1000});
      $(jqxNotiModCap).jqxNotification('open');
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
          $('#rateNumP').val(0);
          inpNumOrden.focus();
        }
      });//muestre el último registro del número de orden
    }else if (datos.validacion=="error") {
      if (datos.numError==1452) {
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true,width:'300px'});
        $(jqxNotiModCap).jqxNotification('open');
        inpNumParte.focus().select();
      }else{
        $('#tablaEditNM>tbody').html(datos.datosnm);
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true});
        $(jqxNotiModCap).jqxNotification('open');
        $('#venEditNM').jqxWindow('open');
        $('#venEditNM').jqxWindow('focus');
        evtAndFunctEdtCap();
      }
    }
  }
  //eventos y funciones de la edición o eliminación de un número de orden o folioVenCap
  function evtAndFunctEdtCap() {
    $('.divFechRE','#venEditNM').each(function () {
      //asi generamos un fecha con javascript con el formato 2017/01/20/ Año/mes/día/
      var fechaR=$(this).siblings('.fechRaw').val();
      fechaFormateada=fechaJS(fechaR);
      var fechaFD=new Date(fechaFormateada[0],fechaFormateada[1],fechaFormateada[2]);
      $(this).jqxDateTimeInput(
        {
          width: '100px',
          height: '25px',
          culture:'es-ES',
          formatString: "d",
          showFooter:true,
          clearString:'Limpiar',
          todayString:'Hoy',
          disabled:true,
          showWeekNumbers:true
        }).jqxDateTimeInput('setDate',new Date(fechaFD.getFullYear(),fechaFD.getMonth(),fechaFD.getDate()));
    });
  }//fin de la función evtAndFunctEdtCap
  //eventos asociados a la ventana de editar el número de orden o Folio
  $('#venEditNM').on('click','.inpBtnElim',evtClickInpElim);
  function evtClickInpElim(e) {
    var numOrden = $(this).parent().siblings('.idNOE').children('input').val();
    var numParte = $(this).parent().siblings('.idNPE').children('select').val();
    var numReg = $('.idNOE','#venEditNM').length;
    // console.log(numReg);
    //vamos a determinar si cerrar la ventana por si existe más de un número de orden repetido
    $('#venEditNM').data(
      {
        numOrden:numOrden,
        numParte:numParte,
        numReg:numReg
      });
    crearVenConfig();
    $('#conDivVenConf').html("¿Deseas Eliminar este Folio?");
    $('#venConf').css('display','');
    $('#venConf').jqxWindow('open');
  }//fin de la función evtClickInpElim
  //evento del cierre de la ventana
  $('#venConf').on('close',evtCerrVenConf);
  function evtCerrVenConf(e) {
    if (e.args.dialogResult.OK==true) {
      var numOrden = $('#venEditNM').data('numOrden');
      var numParte = $('#venEditNM').data('numParte');
      var numReg = $('#venEditNM').data('numReg');
      $.post(
        {
          url:'numOrdElimEdit.php',
          dataType:'json',
          data:{numOrden:numOrden,numParte:numParte,numReg:numReg},
          success:exitoElimFolio,
          type:'POST',
          error:errorFuncionABtnEmp
        }
      );
    }//fin del if
  }//fin de la función evtCerrVenConf
  function exitoElimFolio(datos,x,y) {
    switch (datos.validacion) {
      case "exito":
        if (datos.numReg>1) {
          var numOrden = $('#venEditNM').data('numOrden');
          var cargVen= true;
          $.post(
            {
              url:'numOrden.php',
              dataType:'json',
              data:{numOrden:numOrden,cargVen:cargVen},
              success:exitoRecVenNO,
              type:'POST',
              error:errorFuncionABtnEmp
            }
          );
        }
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'success',autoClose:true,autoCloseDelay:1000});
        $(jqxNotiModCap).jqxNotification('open');
        $('#venEditNM').jqxWindow('close');
        break;
      case "error":
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true,autoCloseDelay:2500});
        $(jqxNotiModCap).jqxNotification('open');
        break;
      case "errodb":
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true,autoCloseDelay:1000});
        $(jqxNotiModCap).jqxNotification('open');
        break;
      default:
        divNotificaciones.html(datos.datos);
        $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true,autoCloseDelay:1000});
        $(jqxNotiModCap).jqxNotification('open');
    }
  }
  //función recargarVentanaNumOrden
  function exitoRecVenNO(datos,x,y) {
    if (datos.validacion="exito") {
      $('#tablaEditNM>tbody').html(datos.datos);
      $('#venEditNM').jqxWindow('open');
      evtAndFunctEdtCap();
    }else if (datos.validacion="error") {
      divNotificaciones.html(datos.datos);
      $(jqxNotiModCap).jqxNotification({template:'error',autoClose:true,autoCloseDelay:1000});
      $(jqxNotiModCap).jqxNotification('open');
    }
  }
  //función para crear la ventana jqxWindow
  function crearVenConfig() {
    var lenHtmlVenConf=$('#venConf').html().length;
    if (lenHtmlVenConf<=427) {
      $('#venConf').jqxWindow({
        width:200,
        height:100,
        isModal:true,
        okButton:$('#btnOK'),
        cancelButton:$('#btnCAN')
      });
    }
  }
  //función que formatea la fecha en forma de 2017-0-1, porque en javascript el mes de enero empieza en  0 y el día no tiene que llevar un cero a la izquierda. y es llamada en la función evtAndFunctEdtCap
  function fechaJS(fecha) {
    fechaR = fecha.split('-');
    fechaR[1]=parseInt(fechaR[1])-1;
    return fechaR;
  }
  //editar el número de orden o folio cuando tengamos abierta la ventana venEditNM
  //Aquí estaran los método, funciones y variables
  var NumOrdD = "";
  var numParD = "";
  var cantReqD = "";
  var fechaReqDR = "";
  var fechaReqD = "";
  var fRDR="";
  $('#venEditNM').on('click','.inpBtnEdit',evtClickEditNO);
  function evtClickEditNO(e) {
    if ($(this).val()=="Editar") {
      //habilitar los elementos
      $(this).parent().siblings('.idNOE').children('input').removeAttr('disabled');
      $(this).parent().siblings('.idNPE').children('select').removeAttr('disabled');
      $(this).parent().siblings('.cantiE').children('input').removeAttr('disabled');
      $(this).parent().siblings('.fechaReqE').children('.divFechRE').jqxDateTimeInput({disabled:false});
      //número de orden o folio
      NumOrdD = $(this).parent().siblings('.idNOE').children('input').val();
      //número de parte
      numParD = $(this).parent().siblings('.idNPE').children('select').val();
      //cantidad requerimiento
      cantReqD = $(this).parent().siblings('.cantiE').children('input').val();
      //fechas extraida desde el calendario
      fechaReqDR = $(this).parent().siblings('.fechaReqE').children('.divFechRE').jqxDateTimeInput('getDate');
      //fecha formateada YYYY/mm/dd
      fechaReqD = obtenerFecha(fechaReqDR);
      //vamos en milisegundos de la fecha
      fRDR = fechaReqDR.valueOf();
      //cambiamos el nombre del input.
      $(this).val("Guardar");
      console.log(NumOrdD);
      console.log(numParD);
      console.log(cantReqD);
      console.log(fechaReqDR);
      console.log(fechaReqD);
      console.log(fRDR);
    }else if ($(this).val()=="Guardar") {
      //número de orden
      var NumOrdM = $(this).parent().siblings('.idNOE').children('input').val();
      //número de parte
      var numParM = $(this).parent().siblings('.idNPE').children('select').val();
      //cantidad requerimiento
      var cantReqM = $(this).parent().siblings('.cantiE').children('input').val();
      //fecha obtenida del calendario
      var fechaReqMR = $(this).parent().siblings('.fechaReqE').children('.divFechRE').jqxDateTimeInput('getDate');
      //fecha en formato YYYY/mm/dd Años/mes/día
      var fechaReqM = obtenerFecha(fechaReqMR);
      //fecha obtenida en milisegundos
      var fRMR = fechaReqMR.valueOf();
      console.log(NumOrdD);
      console.log(NumOrdM);
      console.log(NumOrdD === NumOrdM);
      console.log(numParD);
      console.log(numParM);
      console.log(numParD === numParM);
      console.log(cantReqD);
      console.log(cantReqM);
      console.log(cantReqD === cantReqM);
      console.log(fRDR);
      console.log(fRMR);
      console.log(fRDR === fRMR);
      if (NumOrdD === NumOrdM && numParD === numParM && cantReqD === cantReqM && fRDR === fRMR) {
        $(this).val("Editar");
        $(this).parent().siblings('.idNOE').children('input').prop('disabled','disabled');
        $(this).parent().siblings('.idNPE').children('select').prop('disabled','disabled');
        $(this).parent().siblings('.cantiE').children('input').prop('disabled','disabled');
        $(this).parent().siblings('.fechaReqE').children('.divFechRE').jqxDateTimeInput({disabled:true});
        console.log("No hacemos nada y cambiamos el valor del input a Editar y desactivamos los input y el calendario");
      }else{
        //vamos a modificar el número de orden o el folio.
        var numUsuDb=$(this).parent().siblings('.idUsuE').text();
        var numUsuLog=$('#inpNumUsuario').val();
        if (NumOrdD !== NumOrdM) {
          console.log("Vamos a editar número de orden");
          console.log(fechaReqM);
          console.log(NumOrdD);
          console.log(NumOrdM);
          console.log(numParD);
          console.log(numParM);
          console.log(cantReqM);
          console.log(numUsuDb);
          console.log(numUsuLog);
          if (numUsuDb!==numUsuLog) {
            console.log("Vamos a enviar el número de usuario");
            $.post(
              {
                url : 'numOrdElimEdit.php',
                type : 'POST',
                data :
                {
                  fechaReqM : fechaReqM,
                  NumOrdD : NumOrdD,
                  NumOrdM : NumOrdM,
                  numParD : numParD,
                  numParM : numParM,
                  cantReqM : cantReqM,
                  numUsuLog : numUsuLog
                },
                dataType : 'json',
                success : exitoEditNumOrd,
                error : errorFuncionABtnEmp
              });
          }else{
            console.log("No vamos a enviar el número de usuario");
            $.post(
              {
                url : 'numOrdElimEdit.php',
                type : 'POST',
                data :
                {
                  fechaReqM : fechaReqM,
                  NumOrdD : NumOrdD,
                  NumOrdM : NumOrdM,
                  numParD : numParD,
                  numParM : numParM,
                  cantReqM : cantReqM
                },
                dataType : 'json',
                success : exitoEditNumOrd,
                error : errorFuncionABtnEmp
              });
          }
        }else{
          console.log(fechaReqM);
          console.log(NumOrdD);
          console.log(NumOrdM);
          console.log(numParD);
          console.log(numParM);
          console.log(cantReqM);
          console.log(numUsuDb);
          console.log(numUsuLog);
          console.log("No Vamos a editar número de orden");
          if (numUsuDb!==numUsuLog) {
            console.log("Vamos a enviar el número de usuario");
            $.post(
              {
                url : 'numOrdElimEdit.php',
                type : 'POST',
                data :
                {
                  fechaReqM : fechaReqM,
                  NumOrdD : NumOrdD,
                  numParD : numParD,
                  numParM : numParM,
                  cantReqM : cantReqM,
                  numUsuLog : numUsuLog
                },
                dataType : 'json',
                success : exitoEditNumOrd,
                error : errorFuncionABtnEmp
              });
          }else{
            console.log("No vamos a enviar el número de usuario");
            $.post(
              {
                url : 'numOrdElimEdit.php',
                type : 'POST',
                data :
                {
                  fechaReqM : fechaReqM,
                  NumOrdD : NumOrdD,
                  numParD : numParD,
                  numParM : numParM,
                  cantReqM : cantReqM
                },
                dataType : 'json',
                success : exitoEditNumOrd,
                error : errorFuncionABtnEmp
              });
          }
        }
      }
    }//fin del else if
  }//fin de la función evtClickEditNO
  //función que obtiene la respuesta al momento de editar el número de orden.
  function exitoEditNumOrd(datos,x,y) {
    if (datos.validacion=="exito") {
      divNotificaciones.html(datos.datos);
      jqxNotiModCap.jqxNotification({template:'success',autoClose:false,autoCloseDelay:1000,width:'100%'});
      $(jqxNotiModCap).jqxNotification('open');
      $('#venEditNM').jqxWindow('close');
    }else if (datos.validacion=="error") {
      divNotificaciones.html(datos.datos);
      jqxNotiModCap.jqxNotification({template:'error',autoClose:false,autoCloseDelay:1000,width:'100%'});
      jqxNotiModCap.jqxNotification('open');
    }
    divNotificaciones.html(datos);
    console.log(datos);
  }
  //evento cuando se crea la ventana para editar o eliminar la captura
  // $('#venEditNM').on('created',evtVenEditNMCreada);
  // function evtVenEditNMCreada(e) {
  //   $(this)
  // }
  $('#formMosNumOrd').on('submit',function(e) {
    e.preventDefault();
    fechaInicial=inpFechIni.val();
    fechaFinal=inpFechFin.val();
    if (!(fechaInicial<=fechaFinal)) {
      alert("La fecha inicial (DE) debe ser menor a la final(hasta)");
      return;
    }
    //console.log("Estamos en el formulario para mostrar los numero de orden"+"\nfecha Inicial: "+fechaInicial+ "\nfecha Final: "+ fechaFinal);
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
    //console.log(fechAsis+" "+comentAsis);
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
      // console.log(data);
      // console.log(divBtnFechAsis.siblings().size());
      $('#txtAreCom').val('')
      return divBtnFechAsis.after(divMensajeExito).siblings('div:last-child').append(mensajeExito);
    }
  }//fin de la función regresaMensaje
  //evento de click en el botón agregar
  //vamos a poner en comentario los eventos keyup blur y focus del input inpNumEmpAsis
  /*inpNumEmpAsis.on('keyup blur focus',mayusNumEmple);
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
    }//fin del switch
  }//fin de los eventos del input inpNumEmpAsis*/
  //vamos agregar el autocomplete de la asistencia
  inpNumEmpAsis.autocomplete({
		source:listaEmpleados,
		minLength:2,
		select:function(event,ui) {
			inpNumEmpAsis.val(ui.item.value);
			cadNumEmpList=inpNumEmpAsis.val();
		}
	});//fin del autcomplete
	//Aquí termina el método del autocomplete()
	//Aquí empieza el metodo listaEmpleados
	function listaEmpleados(request,response) {
		$.post({
			url:"php/empleadoAsis.php",
			dataType:'json',
			data:{empListA:request.term,Emp:true},
			success:function (data) {
				response(data);
			},
			type:'POST',
      error:errorFuncionABtnEmp
		});
	}//fin de la función listaEmpleados.
  //enviamos los datos de la lista a asistencia.php
  formListAsis.on('submit',listaEmpleadosF);
  function listaEmpleadosF(e) {
    e.preventDefault();
    inpNumEmpAsis.val(cadNumEmpList.trim());
    inpFeAsis=$('#inpFeAsis').val();
    inpNumEmp=inpNumEmpAsis.val();
    console.log(inpNumEmp);
    console.log(inpFeAsis);
    // console.log(inpFeAsis + " " + inpNumEmp);
    //este $.post se encuentra en la línea 22 del archivo asistencia.php
    $.post('asistencia.php',
    {
      pInpFeAsis:inpFeAsis,
      pInpNumEmp:inpNumEmp,
      pHoy:hoy
    },postLista);
    function postLista(data,status) {
      // comprobamos que datos nos arrojo el post
      // console.log("datos: "+data+" respuesta: "+status);
      var capError= data.substr(0,1);
      // console.log(capError);
      var banBtnMos=true;
      if (data.substr(1,2)=="YA") {
        if (btnMosLisFecha.html()=="Mostrar Lista Asistencia") {
          if ($('#tablaListaEmpleados').length<=0) {
            //Aquí mostramos la tabla de lista para mostrar el # de operador duplicado
            $.post('asistencia.php',{pHoy:hoy,pBAnBtnMos:banBtnMos},listEmplBtnLisFech);
          }
        }
        divNotificaciones.html("Agregado con Exito");
        jqxNotiModCap.jqxNotification({template:'success',autoClose:true,autoCloseDelay:500}).jqxNotification('open');
        $('#jqxNotificationDefaultContainer-top-right').css({'z-index':9008});
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
      //console.log("dentro de la función busNumEmpTabla");
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
    //console.log(tituloBtn);
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
      "url":"../../json/Spanish.json"
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
    // console.log($('#chMostrarNumParte').prop('checked'));
    var chBoxPropCheck=$('#chMostrarNumParte').prop('checked');
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
  //evento buscar número de parte o número de orden
  inpBNONP.on('keypress',buscarNONPTeclado);
  function buscarNONPTeclado(e) {
    if (e.keyCode==13) {
      btnBNONP.trigger('click');
    }
  }
  btnBNONP.on('click',buscarNONP);
  function buscarNONP() {
    valorABuscar=inpBNONP.val().toUpperCase();
    //console.log(valorABuscar);
    $('.lisNumPart').each(function () {
      var numParte=$("#"+$(this).children('span').prop('id')).html();
      if (numParte==valorABuscar) {
        $(this).show();
        $(this).find('.inpCLNE').focus();
      }
    });
    $('.spanNumOrd').each(function () {
      var x = $(this).html();
      //console.log(x);
      if (x==valorABuscar) {
        //console.log("HL");
        $(this).siblings('.list-group').children('.lisNumPart').show();
        $(this).siblings('.list-group').find('.inpCLNE').focus();
        return false;
      }
    })
  }
  //estamos asignando  el evento click al componente creado en el archivo captura.php en la línea 36 de la función mostrarListaNumOrden
  divListNumOrden.on('click','.inpBtnLisNumEmp',liNumParte);
  function liNumParte(e) {
    var btnPresionado=$(this);
    //console.log(btnPresionado);
    //guardamos el objeto del input
    var valInpNumEmp=$(this).prev().prev();
    //guardamos el número de orden de nuestra lista
    var valNumOrden=$(this).parent().parent().parent().parent().parent().children('span.spanNumOrd').text();
    var optionNumEmp=$(this).prev().children();
    //aquí comprobamos si el input donde vamos a ingresar el número de empleado es diferente de una cadena vacia y vamos a insertar el registro a la base de datos en la tabla
    if (!(valInpNumEmp.val()==="")) {
      $('[data-toggle="popover"]').popover('destroy');
      $.post('captura.php',{pHoy:fechaCompleta,pNumOrd:valNumOrden,pNumEmp:valInpNumEmp.val().toUpperCase()},insertDetListNumOrd);
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
        var x=$('<li><span>'+valInpNumEmp.val().toUpperCase()+'</span><span><a class="elimNumEmp" href="#">Eliminar</a></span></li>');
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
        //console.log($('#menListNumOrdNumOp'));
        var mensaje="<div id='menListNumOrdNumOp'class='alert alert-danger'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>"+data+"</div>";
        if (!($('#menListNumOrdNumOp').length==1)) {
          btnPresionado.after(mensaje);
        }else {
          $('#menListNumOrdNumOp').remove()
          btnPresionado.after(mensaje);
        }
      }
      //console.log(data);
      $('.inpCLNE').focus();
    }
  }//fin de la función liNumParte
  divListNumOrden.on('keydown','.inpCLNE',function(e) {
    if (e.key=="Enter") {
      $('.inpBtnLisNumEmp',divListNumOrden).trigger('click');
    }
  });


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
    //console.log(fecha);
    $.post('captura.php',{pNumEmpleado:numEmpleadoL,pNumOrd:numOrdenL,pF:fecha},funElimNumEmplListNumOrd);
  }
  function funElimNumEmplListNumOrd(data,status) {
    var datosJson=$.parseJSON(data);
    if (datosJson.Validacion=="Exito") {
      var idDataList=liNumEmpleado.parent().siblings('datalist').prop('id');
      dataList=liNumEmpleado.parent().siblings('datalist');
      //console.log(datosJson);
      liNumEmpleado.remove();
      var fecha=hoy;
      $.post('captura.php',{pFecha:fecha,pNumOrdenL:numOrdenL},postElimNumEmpl);
    }
    function postElimNumEmpl(data) {
      //console.log(data);
      var jsonDatos=$.parseJSON(data);
      dataList.html(jsonDatos.optionNumEmpl);
      // dataList.parent().parent().parent().parent().parent() .parent('.list-group-item').children('.spanNumOrd').html(jsonDatos.cantEmplNumOrd);
      // console.log(jsonDatos);
      // console.log(dataList.parent().parent().parent().parent().parent('.list-group-item').children('span.badge').html(jsonDatos.cantEmplNumOrd));
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
    capNumParte=$(this).parent().siblings('.tdCapNumPart').html();
    capNumOrden=$(this).parent().siblings('.tdCapNumOrd').html();
    modCapNumOrd.modal({backdrop: "static",keyboard:false}).data({'numParte':capNumParte,'numOrden':capNumOrden});
    //guardamos el número de parte para extraer el rate
    $.post('captura.php',{pcapNumOrden:capNumOrden},funCapNumOrde);
  }
  function funCapNumOrde(data,status) {
    var modDatos=$.parseJSON(data);
    $('#spanNOMC').html(numOMODCAP);
    $('#spanNPMC').html(numPMODCAP);
    $('#spanNOMC').html($('#spanNOMC').html()+capNumOrden);
    $('#spanNPMC').html($('#spanNPMC').html()+"<span id='spanNPNO'>"+capNumParte+"</span>");
    $('#divColListEmp').empty().append(modDatos.Datos);
    // console.log(modDatos.Datos);
  }
  //vamos a mostrar las capturas de un número de orden con un evento click y en un modal.
  $('#tablaCaptura').on('click','.detalleNumOrden',clickDetalleCap);
  function clickDetalleCap(e) {
    numOrdenDC=$(this).parent().siblings(".tdCapNumOrd").html();
    var numParteDC=$(this).parent().siblings(".tdCapNumPart").html();
    // console.log(numOrdenDC+" "+numParteDC);
    var fechaDCR = fecDetAsis.jqxDateTimeInput('getDate');
    var fechaDC = obtenerFecha(fechaDCR);
    modDetCap.modal({backdrop: "static",keyboard:false});
    $('#spanNO','#modDetCap').html(numOrdenDC);
    $('#spanNP','#modDetCap').html(numParteDC);

    $.post('captura.php',{pNumOrdenDC:numOrdenDC,pfechaDC:fechaDC},postDetCaptura);
  }
  function postDetCaptura(data,status) {
    try {
      var d=$.parseJSON(data);
      // $('#modDetCap tbody').empty();
      $('#tablaDetCap').DataTable().destroy();
      $('#modDetCap tbody').html(d.Datos);
      $('#tablaDetCap').DataTable({
        "language":{
          "url":"../../json/Spanish.json"
        }
      });
      $('#tablaDetCap>div.modal-dialog.modal-lg').css('width',"100%");
      // console.log(data);
    } catch (e) {
      //console.log(e);
      //console.log(data);
    }
  }

  //evento Buton para realizar la captura
  //vamos a construir la tabla de Lista Número de Ordenes, con el método $.post, en la pestaña de CAPTURA
  //$.post('captura.php',{pBandListaNumOrd:bandListaNumOrd,pHoy:hoy,pInicio:true},listCapNumOrd);
  function listCapNumOrd(data,status) {
    //converir los string en datos Json.
    var jsonDatos=$.parseJSON(data);
    // console.log(jsonDatos);
    if (jsonDatos.Validacion=="Error") {
      var dia=jsonDatos.Datos;
      //console.log(dia);
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
          "url":"../../json/Spanish.json"
        }
      });
    }
  }
  //asínamos la API de dataTable
  $('#tablaCaptura').DataTable({
    "language":{
      "url":"../../json/Spanish.json"
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
          // $.post(
          //   'capturaGeneral.php',
          //   {pTabCapNumEmp:
          //     tabCapNumEmp},
          //     tablaCapNumEmple);
          $.post(
            {
              url:'capturaGeneral.php',
              data:
              {
                pTabCapNumEmp:tabCapNumEmp
              },
              type:'POST',
              beforeSend:beforeTablaCapNumEmpl,
              success:tablaCapNumEmple,
              error:errorFuncionABtnEmp
            });
        break;
        case 'Asignar Número de Empleado a Número de Orden':
        break;
      }
    })
  }
  function tablaCapNumEmple(datos,estatus) {
    try {
      // console.log(estatus);
      var tbody=$.parseJSON(datos);
      // console.log(datos);
      if (tbody.Validacion=="Exito") {

        // $('#tableCapNumEmp tbody').empty();
        // $('#tableCapNumEmp').DataTable().destroy();
        $('#tableCapNumEmp>tbody').html(tbody.Datos);
        // $('#tableCapNumEmp').DataTable();
      }
    } catch (e) {
      //console.log(e);
    }
  }//fin de la función tablaCapNumEmple
  function beforeTablaCapNumEmpl() {
    $('#tableCapNumEmp>tbody').html("");
    console.log("Antes de enviar el archivo");
  }
  //evento Boton del modal, Captura por número de orden.
  modCapNumOrd.on('click','#capturaC',modalCapturaC);
  function modalCapturaC() {
    idEmpleado=$('.inpNumEmpl','#modCapNumOrd').val().toUpperCase();
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
      // console.log($(objeto).val()+" "+idEmpleado);
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
  $('#modalCaptura').on('show.bs.modal shown.bs.modal',cargComplModalCaptura);
  function cargComplModalCaptura(e) {
    // console.log(e);
    if (e.type=="show") {
      //aquí quitamos los alertas si de dejaron abierto
      var numAlert=$('#formCaptura',"#modalCaptura").children('div.aCapNumEmp').length;
      if (numAlert>0) {
        $('#formCaptura',"#modalCaptura").children('div.aCapNumEmp').remove();
      }
    }else if (e.type=="shown") {
      horaInicioC.timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
      horaFinalC.timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
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
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      tmC.val('0');
      $('#tm1').prop('checked','checked');
      $('#eficienciaC').val('').css('background-color','#eee');
      if (fechaServidor=!fechaCompleta) {
        alert("Verificar fecha");
        return;
      }
      $('#fechaC').val(fechaCompleta);
      $('#cantidadC','#modalCaptura').focus().select();
      //console.log($('#fechaC').val());

      var hora= fecha.getHours(),minutos=fecha.getMinutes(),segundos=fecha.getSeconds();
      if (hora<10) {
        hora="0"+hora;
      }if (minutos<10) {
        minutos="0"+minutos
      }
      if (segundos<10) {
        segundos="0"+segundos;
      }
      horaCompleta=hora+":"+minutos+":"+segundos;
      var miFecha=new Date();
      miFecha.setHours(hora,minutos,segundos);
      // console.log(miFecha.valueOf());
      // console.log(miFecha.getMinutes());
      // console.log(horaCompleta);
      var idDetListaNumOrden=$('#'+numEmpleadoC).val();
    }
  }//fin de la función cargComplModalCaptura
  //evento teclado del input horaFinalC
  horaFinalC.on('keydown',function(e) {
    // console.log(e.keyCode);
    if (e.keyCode==9) {
      e.preventDefault();
      $('#cantidadC').select();
    }
  });
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
      //console.log("entraste Aquí al radio button de no");
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
    $('.inpAgrNEmpNOrd').focus();
  });
  //evento modal cuando se abre el modal de Tiempo muerto
  modalTiempoMuerto.on('show.bs.modal',function() {
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
    //console.log(divTTM);
    divTTM.each(function(index,elemento) {
      //console.log($(this).attr('class'));
      //console.log(index);
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
    var hIValid=$('#horaInicioC').data('timeAutocomplete').getTime();
    var hFValid=$('#horaFinalC').data('timeAutocomplete').getTime();
    //(hIValid);
    //console.log(hFValid);
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
    horaI.val(hIValid);
    horaF.val(hFValid);
    //console.log("hF"+horaF.val()+"HI"+horaI.val());
    // if (horaI.val().length==5) {
    //   horaI.val($(e.target).find('#horaInicioC').val()+":00");
    // }else if (horaF.val().length==5) {
    //   horaF.val($(e.target).find('#horaFinalC').val()+":00");
    // }
    var datosForm=$(this).serialize();
    //cuando no haya tiempo muerto. no se envia el arregloTiempoMuerto
    if ($('#tm1').prop('checked')) {
      // console.log(datosForm);
      $.post('captura.php',{pIdEmpleado:idEmpleado,pIdDetAsis:idDetAsis,pDatosForm:datosForm},postFormCaptura);
      return false;
    }
    //console.log(datosForm);
    // Aquí enviamos el tiempo muerto al servidor
    $.post('captura.php',{pIdEmpleado:idEmpleado,pIdDetAsis:idDetAsis,pDatosForm:datosForm,pArregloTiempoMuerto:arregloTiempoMuerto},postFormCaptura)
  };
  function postFormCaptura(data,status) {
    try {
      datosJson=$.parseJSON(data);
    } catch (e) {
      $("#formCaptura").append($(divAlertMenCaptura).addClass("alert-danger").html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+'<p class="text-center">Error Inesperado: '+e+'</p>').css({'margin-top':'10px','font-size':'17px'}));
      //console.log(data);
      //console.log(e);
      return false;
    }
    // console.log(datosJson);
    alertasCaptura(datosJson);
  }
  //aquí mostramos los tipos de validación que tenemos al momento de hacer la captura errores de la base de datos, errores que no deberian pasar como caputuras duplicadas
  function alertasCaptura(datosJson) {
    //console.log(datosJson);
    //console.log(datosJson.Validacion);
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
       $("#formCaptura").append($(divAlertMenCaptura).addClass("alert-danger").html('<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+'<p class="text-center">Error Inesperado: '+datosJson.DatosExtra+'</p>').css({'margin-top':'10px','font-size':'15px'}));
      break;
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
  cantidadC.on('keydown focus',function(e) {
    // console.log(e.key);
    // console.log(e.type);
    // la tecla tab es el key='Tab', la tecla derecha ArrowRight
    // console.log(e.key);
    // console.log(e);
    if (e.type=='focus') {
      var valor=$(this).val();
      if (valor.length==0||parseInt(valor)>0) {
        cantModCaptura=$(this).val();
        $.post('captura.php',{capNumParte},calcEficiencia);
      }
    }
    if (e.key=="ArrowRight") {
      cantModCaptura=$(this).val();
      $.post('captura.php',{capNumParte},calcEficiencia);
      // $('#tm1').focus();
    }
    if (e.key=="=") {
      e.preventDefault();
      cantModCaptura=$(this).val();
      $.post('captura.php',{capNumParte},calcEficiencia);
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
    hICaptura=$('#horaInicioC').data('timeAutocomplete').getTime();
    hFCaptura=$('#horaFinalC').data('timeAutocomplete').getTime();
    //console.log(hICaptura+""+hFCaptura);
    horaInicio= new Date();
    horaFinal= new Date();
    hi=horaInicio;
    hf=horaFinal;
    inpHoraInicio=hICaptura.split(':');
    inpHoraFinal=hFCaptura.split(':');
    horaInicio.setHours(inpHoraInicio[0],inpHoraInicio[1],inpHoraInicio[2]);
    horaFinal.setHours(inpHoraFinal[0],inpHoraFinal[1],inpHoraFinal[2]);
    //(horaInicio);
    //console.log(horaFinal);
    if (horaInicio.valueOf()==horaFinal.valueOf()) {
      window.alert("La hora inicio no puede ser igual a la hora final");
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      $('#horaFinalC').focus();
      return false;
    }
    if (horaInicio>=horaFinal) {
      hi.setHours(23,00,00);
      hf.setHours(00,00,00);
      if (!(horaInicio.valueOf()==hi.valueOf()&&horaFinal.valueOf()==hf.valueOf())){
        window.alert("La hora inicio debe ser mayor a la hora final");
        capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
        $('#horaInicioC').focus();
        return false;
      }
    }
    if (cantidad==""||cantidad<0||isNaN(cantidad)) {
      window.alert('Ingresa un número entero o una cantidad en la caja de texto CANTIDAD');
      $('#cantidadC').focus().val(0);
      return false;
    }
    hiMinMili=horaInicio.getMinutes()*60000;
    horaInicioAux=horaInicio.valueOf()-hiMinMili;
    horaInicioAux=horaInicioAux+3600000;
    horaInicioAux= new Date(horaInicioAux);
    if (horaInicio>horaFinal) {
      window.alert("La hora final debe menor a la hora de inicio");
      $('#horaFinalC').focus();
      return false;
    }
    if (horaInicioAux.toTimeString()>=horaFinal.toTimeString()) {
      //console.log("Bien hecho :D");
    }else{
      window.alert("La hora final debe ser igual o menor a esta hora "+horaInicioAux.toLocaleTimeString());
      $("#horaFinalC").focus().select();
      capturarC.addClass('disabled btn-default').prop('disabled','disabled').removeClass('btn-primary');
      $('#horaFinalC').focus();
      return false;
    }
    minNP=((horaFinal-horaInicio)/1000)/60;
    if (minNP>60) {
      window.alert('Ingresa un verifica la hora Final no puedes pasar de la siguiente HORA');
      $('#horaFinalC').focus();
      return false;
    }
    //console.log("Minutos totales: "+ minNP);
    minTrab=minNP-minTM;
    //console.log("Minutos Trabajados: "+ minTrab);
    cantProg=(rateNP/60)*minTrab;
    eficiencia=(cantidad/cantProg)*100;
    eficienciaM=eficiencia.toFixed(2);
    eficiencia=eficienciaM;
    if (eficiencia<=0) {
      $('#eficienciaC').val(eficiencia).css({'background-color':'#fe0e24','color':'white'});
      window.alert("eficiencia no valida");
      $('#cantidadC').focus().val(0);
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
      if (eficiencia>200) {
        window.alert("verificar el tiempo muerto o la cantidad, eficiencia no valida");
        $('#cantidadC').val(0);
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
  function reqNumOrdenPost(data,status,callback) {
    try {
      var datos=$.parseJSON(data);
      $('#tablaReq tbody').empty();
      $('#tablaReq').DataTable().destroy();
      $('#tablaReq tbody').html(datos.Datos);
      $('.cantReq',tablaReq).each(function() {
        cantR=$(this).html();
        parseInt(cantR);
        parcR=$(this).siblings('.parReq').html();
        paPR=cantR-parcR;
        parseInt(paPR);
        proR=$(this).siblings('.cantReaReq').html();
        parseInt(proR);
        balR=paPR-proR;
        parseInt(balR);
        // $(this).html(parseInt(cantR).toLocaleString('en-IN'));
        // $(this).siblings('.paPReq').html(paPR.toLocaleString('en-IN'));
        // $(this).siblings('.balReq').html(balR.toLocaleString('en-IN'));
        $(this).text(cantR);
        $(this).siblings('.paPReq').text(paPR);
        $(this).siblings('.balReq').text(balR);
        // console.log($(this).siblings('.porReq').children('.progress'));
        var porcentaje=((parseInt(parcR)+parseInt(proR))/cantR)*100;
        // console.log(porcentaje);
        // console.log(porcentaje);
        if (porcentaje>100) {
          $(this).siblings('.porReq').children('.progress').css('width',Math.round(100)+"%");
          $(this).siblings('.porReq').children('.progress').children('div').html(Math.round(porcentaje)+"%").removeClass('progress-bar-success').addClass('progress-bar-danger');
        }else if (porcentaje<=100&&porcentaje>95) {
        $(this).siblings('.porReq').children('.progress').css('width',Math.round(porcentaje)+"%");
        $(this).siblings('.porReq').children('.progress').children('div').html(Math.round(porcentaje)+"%");
        }else if (porcentaje<=95) {
        $(this).siblings('.porReq').children('.progress').css('width',Math.round(porcentaje)+"%");
        $(this).siblings('.porReq').children('.progress').children('div').html(Math.round(porcentaje)+"%");
        }
      });
      $('#tablaReq').DataTable({
        "language":{
          "url":"../../json/Spanish.json"
        }
      });
    } catch (e) {
        //console.log(e);
        //(data);
    }
    // console.log(datos);
    // console.log(data);
  }// fin de la función reqNumOrdenPost
  tablaReq.on('dblclick','.parReq',calcularBalance);
  function calcularBalance(e) {
    colorFondo=$(this).css('background-color');
    //console.log(colorFondo);
    $(this).prop('contenteditable','true').css('background-color','rgb(129, 129, 129)').blur(function() {
      // console.log(window.localStorage.getItem(parReqNumOrdR));
      parReqNumOrdR=$(this).siblings('.numOrdReq').html();
      $(this).prop('contenteditable','false').css('background-color','rgb(0,0,0,0)');
      cantR=$(this).siblings('.cantReq').html();
      parcR=$(this).html();
      // console.log(parcR);
      paPR=parseInt(cantR)-parseInt(parcR);
      proR=$(this).siblings('.cantReaReq').html();
      balR=parseInt(paPR)-parseInt(proR);
      $(this).html(parcR);
      $(this).siblings('.paPReq').html(paPR);
      $(this).siblings('.balReq').html(balR);
      // console.log("cantidad req"+ cantR+"parcial"+parcR+"producido"+proR);
      var porcentaje=((parseInt(parcR)+parseInt(proR))/cantR)*100;
      // console.log(parcR+proR);
      $(this).siblings('.porReq').children('.progress').css('width',Math.round(porcentaje)+"%");
      $(this).siblings('.porReq').children('.progress').children('div').html(Math.round(porcentaje)+"%");
      // console.log(cantR);
      $.post('requerimientos.php',{pParReqNumOrdR:parReqNumOrdR,pParcR:parcR},reqParNumOrd);
      // $(this).siblings('.paPReq').html(paPR.toLocaleString('en-IN'));
      // $(this).html(parseInt(parcR).toLocaleString('en-IN'));
      // $(this).siblings('.balReq').html(balR.toLocaleString('en-IN'));
    });
  }
  function reqParNumOrd(data,status) {
    try {
      datos=$.parseJSON(data);
      if (datos.Validacion=="Error") {
        window.alert(datos.Datos);
      }
    } catch (e) {
      //console.log(e);
      //console.log(data);
    }
  }
  //eliminar captura
  $('#modDetCap').on('click','.elimCap',function() {
    var numOrdenEC=numOrdenDC;
    var empleado=$(this).parent().siblings('.numEmpleado').text();
    var fechaEC=$('#hoy').val();
    var idCaptura=$(this).parent().siblings('.idCap').text();
    var respuesta=window.confirm("Deseas eliminar esta captura "+ idCaptura +"número de empleado"+ empleado);
    if (respuesta==true) {
      //console.log("OKEY");
      $.post('captura.php',{pIdCaptura:idCaptura,pNumOrdenEC:numOrdenEC,pFechaEC:fechaEC},respuestaElimCaptura)
    }else{
      // console.log("NOP");
      return false;
    }
  });
  function respuestaElimCaptura(data,status) {
    try {
      /*posibles valores de data.Validacion
      Validacion[errordb,error,exito];
      si la validacion es error el mensaje del error esta en la variable datos.Datos
      si la validacion es errodb el mensaje del error esta en la variable datos.Datos y si el mensaje es exito las variables Datos contiene la tabla actualizada y la variable mensaje, contiene el mensaje de exito;*/
      var datos=$.parseJSON(data);
      switch (datos.Validacion) {
        case "error":
          window.alert(datos.Datos);
          break;
        case "errordb":
          window.alert(datos.Datos);
          break;
        case "exito":
          $('#modDetCap tbody').empty();
          $('#tablaDetCap').DataTable().destroy();
          $('#modDetCap tbody').html(datos.Datos);
          $('#tablaDetCap').DataTable({
            "language":{
              "url":"../../json/Spanish.json"
            }
          });
          $('#tablaDetCap>div.modal-dialog.modal-lg').css('width',"100%");
          window.alert(datos.mensaje);
          break;
        default:
        window.alert("OQUELA QUIEN SABE QUE PASO");
      }
    } catch (e) {
      //console.log(data);
      //console.log(e);
    } finally {

    }
  }//fin de la función respuestaElimCaptura

  $('#modDetCap').on('click','.editCap',abrirModalEditCap);
  function abrirModalEditCap(e) {
    //guardar valores Iniciales
    // var obtDat=true;
    var idCapEdit=$(this).parent().siblings('.idCap').html();
    var idNumEmpl=$(this).parent().siblings('.numEmpleado').html();
    // calcTM(obtDat);
    $('#modEditCap').modal({backdrop:"static",keyboard:false}).data('idCapDat',idCapEdit);
    $.post('captura.php',{pIdCapEdit:idCapEdit,pIdNumEmpl:idNumEmpl},postTabEditCap);
  }
  function postTabEditCap(data,status) {
    try {
      var datos=$.parseJSON(data);
      $('#tablaEditCap tbody').empty();
      $('#tablaEditCap tbody').html(datos.Datos);
      inicioValEditCap();
    } catch (e) {
      //console.log(data);
    }
  }//fin de la funcion postTabEditCap

  //--------funciones, eventos y variables, etc. relacionados con la edición de la captura---------
  //En esta parte de código se formatea los input de las horas y se oculta el div que contiene el tiempo muerto de una captura si es que lo tiene
  function inicioValEditCap() {
    $('#inpHIEC','#modEditCap').timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
    $('#inpHFEC','#modEditCap').timeAutocomplete({formatter: 'ampm',start_hour:7,end_hour:19,increment:'60'});
    $('#divTmEC').prop('hidden','hidden');
    idCapEC=$('#modEditCap').data('idCapDat');
    horaIECVI=$('#inpHIEC').data('timeAutocomplete').getTime();
    horaFECVI=$('#inpHFEC').data('timeAutocomplete').getTime();
    eficienciaECVI=$('.efiEC','#tablaEditCap').html();
    minTMECVI=$('.tmEC','#tablaEditCap').html();
    cantidadECVI=$('#inpCantEC','#tablaEditCap').val();
    //console.log(idCapEC+" "+horaIECVI+" "+horaFECVI+" "+eficienciaECVI+" "+minTMECVI+" "+cantidadECVI);
  }
  //evento click de la tabla donde vamos a modificar el tiempo muerto de la captura, Y VAMOS A CONSTRUIR la tabla por si tiene tiempo muerto o agregar tiempo muerto a la captura. y el input donde esta el tiempo muerto traer las opciones que tenemos en la base de datos.
  $('#modEditCap').on('click','.tmEC',tmEC);
  function tmEC(e) {
    $('.inpTMEC').val("");
    $('.inpMinEC').val(0);
    $('#divTmEC').removeAttr('hidden');
    $.post('captura.php',{pTipoTM:true},dataListTTM2);
    $.post('captura.php',{pIdCapEC:idCapEC},datosTM);
  }
  //función construimos la tabla si se tiene tiempo muerto
  function datosTM(data,status) {
    try {
      datos=$.parseJSON(data);
      // console.log(data);
      table=datos.Datos;
      // console.log(datos.Datos);
      $('.tableTMEC').html(table);
      //esta función podremos usar los datos ya actualizados para actualizar el tm en pantalla
    } catch (e) {
      //console.log(e);
    }
    calcTM();
  }

  $('.tableTMEC').on('click','.eTMEC',elimTMEC);
  function elimTMEC(e) {
  e.preventDefault();
  var idElimTM=$(this).parent().siblings('.idElimTMEC').html();
  var minTMEC=$(this).parent().siblings('.minTMEC').html();
  var elimTM=true;
  // console.log(idElimTM+" "+elimTM+" "+idCapEC+" "+minTMEC);
  $.post('captura.php',{pIdCapE:idCapEC,pElimTM:elimTM,pIdElimTM:idElimTM,pMinTMEC:minTMEC},resultadoELTMEC);
  }
  function resultadoELTMEC(data,status) {
    try {
      //console.log(data);
      var datos=$.parseJSON(data);
      if (datos.Validacion=="Error") {
        window.alert(datos.Datos);
      }else if(datos.Validacion=="Exito"){
        $('.tmEC','#tablaEditCap').val();
        window.alert(datos.Datos);
        $.post('captura.php',{pTipoTM:true},dataListTTM2);
        $.post('captura.php',{pIdCapEC:idCapEC},datosTM);
        $('.btnEC','#tablaEditCap').removeAttr('disabled');
      }
    } catch (e) {
      //console.log(e);
    }
  }
  function dataListTTM2(datos,status) {
    // console.log(datos);
    var dataListTipoTM=$.parseJSON(datos);
    if (dataListTipoTM.Validacion=="Exito") {
      $('#dLTMEC').html(dataListTipoTM.Datos);
    }
    $('.inpTMEC').change(function(e) {
      switch (parseInt(e.target.value)) {
        case 1:
        $(e.target).siblings('.inpMinEC').val(20);
        break;
        case 2:
        $(e.target).siblings('.inpMinEC').val(40);
        break;
        case 3:
        $(e.target).siblings('.inpMinEC').val(5);
        break;
        case 0:
        $(e.target).siblings('.inpMinEC').val('');
        break;
        default:
        $(e.target).siblings('.inpMinEC').val(0);
      }
    });
    // console.log(dataListTipoTM);
  }
  $('#divTmEC').on('click','#btnGuardarEC',function() {
    $('#divTmEC').prop('hidden','hidden');
  });
  $('#btnATMEC').on('click',function(e) {
    var minCap=$('.tmEC','#tablaEditCap').html();
    var idTM=$('.inpTMEC').val();
    var minutosTM=$('.inpMinEC').val();
    //console.log(idTM);
    if (idTM.length<1||(minutosTM.length<1||minutosTM==0)) {
      if (idTM.length<1) {
        $('.inpTMEC').focus();
      }
      if (minutosTM.length<1||minutosTM==0) {
        $('.inpMinEC').focus();
      }
      window.alert('Necesitas llenar los siguientes campos');
      return false;
    }
    var idCap=$('#modEditCap').data('idCapDat');
    // console.log(idTM+" "+minutosTM+" "+idCap);
    $.post('captura.php',{idTM:idTM,minutosTM:minutosTM,idCap:idCap,minCap:minCap},capturaTMEC);
  });
  function capturaTMEC(data,status) {
    try {
      var datos=$.parseJSON(data);
      if (datos.Validacion=="ErrorDB") {
        window.alert(datos.Datos);
      }else if (datos.Validacion=="Exito") {
        $('.inpTMEC').val('');
        $('.inpMinEC').val('');
        $('.btnEC','#tablaEditCap').removeAttr('disabled');
        $.post('captura.php',{pTipoTM:true},dataListTTM2);
        $.post('captura.php',{pIdCapEC:idCapEC},datosTM);
        window.alert(datos.Datos);
      }
    } catch (e) {
      //console.log(e);
    }
  }
  function calcTM(e) {
    var longitudTD=$('#tablaTMEC>tbody>tr','#divTmEC').children('.minTMEC').length;
    // console.log(longitudTD);
    var sumaTM=0;
    if (longitudTD>0) {
      $('#tablaTMEC>tbody>tr','#divTmEC').children('.minTMEC').each(function(index,objeto) {
        mThis=$(objeto).html();
        sumaTM=parseInt(sumaTM)+parseInt(mThis);
      });
      $('.tmEC','#tablaEditCap').html(sumaTM);
      $('.tmCap','#tablaDetCap').each(function(index,objeto) {
        idCap=$(objeto).siblings('.idCap').html();
        if (parseInt(idCapEC)==parseInt(idCap)) {
          $(objeto).html(sumaTM);
        }
      });
    }else if (longitudTD==0) {
      sumaTM=0;
      $('.tmEC','#tablaEditCap').html(sumaTM);
      $('.tmCap','#tablaDetCap').each(function(index,objeto) {
        idCap=$(objeto).siblings('.idCap').html();
        if (parseInt(idCapEC)==parseInt(idCap)) {
          $(objeto).html(sumaTM);
        }
      });
      //vamos a calcular la eficiencia, con los datos obtenidos del tiempo muerto;
    }
    $.post('captura.php',{idCapEC:idCapEC,npCE:true},function(data,status) {
      try {
        //console.log(data);
        var datos=$.parseJSON(data);
        var rateNP=datos.Datos;
        var cantidad=$('#inpCantEC').val()
        horaIEC=$('#inpHIEC').data('timeAutocomplete').getTime();
        horaFEC=$('#inpHFEC').data('timeAutocomplete').getTime();
        // console.log(horaIEC+" "+horaFEC);
        horaIS=horaIEC.split(':');
        horaFS=horaFEC.split(':');
        horaInicioD=new Date();
        horaInicioD.setHours(horaIS[0],horaIS[1],horaIS[2]);
        horaFinalD=new Date();
        horaFinalD.setHours(horaFS[0],horaFS[1],horaFS[2]);
        // console.log(horaInicioD+" "+horaFinalD);
        // conversion a minutos dividiendo entre 1000 y luego entre 60
        var minutos=(horaFinalD-horaInicioD)/1000/60;
        // console.log(minutos);
        if (minutos>60||horaInicioD==horaFinalD) {
          window.alert("No se aceptan estos parametros");
          return false;
        }
        horaISDB=horaIECVI.split(':');
        horaFSDB=horaFECVI.split(':');
        horaInicioDBD=new Date();
        horaInicioDBD.setHours(horaISDB[0],horaISDB[1],horaISDB[2])
        horaFinalDBD=new Date();
        horaFinalDBD.setHours(horaFSDB[0],horaFSDB[1],horaFSDB[2]);

        //console.log(horaInicioDBD-horaInicioD);
        if (horaInicioDBD-horaInicioD>0) {
          window.alert("no se admite esta captura");
          return false;
        }
        if (Math.abs(horaInicioDBD-horaInicioD)>3000000) {
          window.alert("no se admite esta captura");
          return false;
        }
        hiMinMili=horaInicioD.getMinutes()*60000;
        horaInicioAux=horaInicioD.valueOf()-hiMinMili;
        horaInicioAux=horaInicioAux+3600000;
        horaInicioAux= new Date(horaInicioAux);
        if (horaInicioAux.toTimeString()>=horaFinalD.toTimeString()) {
          // window.alert("Bien hecho :D");
        }else{
          window.alert("La hora final debe ser igual o menor a esta hora "+horaInicioAux.toLocaleTimeString());
          return false;
        }
        var minutosTrab=minutos-sumaTM;
        var cantidadProg=(rateNP/60)*minutosTrab;
        var eficiencia=((cantidad/cantidadProg)*100).toFixed(2);
        //console.log(cantidadProg);
        //console.log(eficiencia);
        $('.efiEC','#tablaEditCap').html(eficiencia);
        // console.log(minutos);
        // console.log(minutosTrab);
        // console.log(sumaTM);
      } catch (e) {
        //console.log(e);
      }
    });
  }//aquí termina la función calcTM
  $('#tablaEditCap').on('change','#inpCantEC,#inpHIEC,#inpHFEC',function(e) {
    //console.log(e);
    calcEC();
  });
  function calcEC() {
    $.post('captura.php',{idCapEC:idCapEC,npCE:true},function(data,status) {
      try {
        //console.log(data);
        var datos=$.parseJSON(data);
        var rateNP=datos.Datos;
        var cantidad=$('#inpCantEC','#tablaEditCap').val()
        var sumaTM=$('.tmEC ','#tablaEditCap').html();
        horaIEC=$('#inpHIEC','#tablaEditCap').data('timeAutocomplete').getTime();
        horaFEC=$('#inpHFEC','#tablaEditCap').data('timeAutocomplete').getTime();
        //console.log(horaIEC+" "+horaFEC);
        horaIS=horaIEC.split(':');
        horaFS=horaFEC.split(':');
        horaInicioD=new Date();
        horaInicioD.setHours(horaIS[0],horaIS[1],horaIS[2]);
        horaFinalD=new Date();
        horaFinalD.setHours(horaFS[0],horaFS[1],horaFS[2]);
        // console.log(horaInicioD+" "+horaFinalD);
        // conversion a minutos dividiendo entre 1000 y luego entre 60
        var minutos=(horaFinalD-horaInicioD)/1000/60;
        // console.log(minutos);
        if (minutos>60||horaInicioD==horaFinalD||minutos<=0) {
          window.alert("No se aceptan estos parametros");
          return false;
        }
        horaISDB=horaIECVI.split(':');
        horaFSDB=horaFECVI.split(':');
        horaInicioDBD=new Date();
        horaInicioDBD.setHours(horaISDB[0],horaISDB[1],horaISDB[2])
        horaFinalDBD=new Date();
        horaFinalDBD.setHours(horaFSDB[0],horaFSDB[1],horaFSDB[2]);

        //console.log(horaInicioDBD-horaInicioD);
        if (horaInicioDBD-horaInicioD>0) {
          window.alert("no se admite esta captura");
          return false;
        }
        if (Math.abs(horaInicioDBD-horaInicioD)>3000000) {
          window.alert("no se admite esta captura");
          return false;
        }
        hiMinMili=horaInicioD.getMinutes()*60000;
        horaInicioAux=horaInicioD.valueOf()-hiMinMili;
        horaInicioAux=horaInicioAux+3600000;
        horaInicioAux= new Date(horaInicioAux);
        if (horaInicioAux.toTimeString()>=horaFinalD.toTimeString()) {
          //console.log("Bien hecho :D");
        }else{
          window.alert("La hora final debe ser igual o menor a esta hora "+horaInicioAux.toLocaleTimeString());
          return false;
        }
        var minutosTrab=minutos-sumaTM;
        var cantidadProg=(rateNP/60)*minutosTrab;
        var eficiencia=((cantidad/cantidadProg)*100).toFixed(2);
        //console.log(cantidadProg);
        //console.log(eficiencia);
        $('.efiEC','#tablaEditCap').html(eficiencia);
        // console.log(minutos);
        // console.log(minutosTrab);
        // console.log(sumaTM);
        if (eficiencia<0||eficiencia>200||eficiencia=="inifinity") {
          return false
        }else{
          $('.btnEC').removeAttr('disabled');
        }
      } catch (e) {
        //console.log(e);
      }
    });
  }//fin del metodo calcEC
  $('#tablaEditCap').on('click','.btnEC',funEC);
  function funEC(e) {
    var cantAuxEC,horaIAuxEC,horaFAuxEC,tmMinAuxEC,efiAuxEC;
    $(this).parent().siblings().each(function(indice,objeto) {
      if ($(objeto).children('input').length>0) {
        var idInp=$(this).children('input').prop('id');
        switch (idInp) {
          case 'inpCantEC':
            cantAuxEC=$(this).children('#'+idInp).val();
            break;
          case 'inpHIEC':
            horaIAuxEC=$(this).children('#'+idInp).data('timeAutocomplete').getTime();
            break;
          case 'inpHFEC':
            horaFAuxEC=$(this).children('#'+idInp).data('timeAutocomplete').getTime();
            break;
          default:
        }//fin del switch
      }//fin del if
      if ($(this).prop('class')!="") {
        if ($(this).prop('class')=="tmEC") {
          tmMinAuxEC=$(this).html();
        }else if ($(this).prop('class')=="efiEC") {
          efiAuxEC=$(this).html();
        }
      }//fin del if
    });//fin del each
    if (eficiencia>200) {
      window.alert('No se admite esta eficiencia');
      return false;
    }
    if (cantAuxEC!=cantidadECVI||horaIAuxEC!=horaIECVI||horaFAuxEC!=horaFECVI||tmMinAuxEC!=minTMECVI||efiAuxEC!=eficienciaECVI) {
      $.post('captura.php',{cantAuxEC:cantAuxEC,horaIAuxEC:horaIAuxEC,horaFAuxEC:horaFAuxEC,tmMinAuxEC:tmMinAuxEC,efiAuxEC:efiAuxEC,idCapEC:idCapEC},repuestaEC);
    }
  }//fin función funEC
  function repuestaEC(data,status) {
    try {
      var datos= $.parseJSON(data);
      window.alert(datos.Validacion+" --> "+datos.Datos);
      //console.log(data);
      $('.btnEC').prop('disabled');
    } catch (e) {
      //console.log(e);
      //console.log(data);
    }
  }
  //----------aquí termina todo lo relacionado con la edición de la captura-----------------
  //Aquí se encuentra las funciones eventos relacionados con la sección busqueda empleados o numéros de parte, etc...
  // var idEmplB=$('#idEmplB');
  //
  // idEmplB.autocomplete({
  //   source: function(request,reponse) {
  //     $.ajax({
  //       url:"captura.php",
  //       dataType:"json",
  //       data{q:request.term},
  //       success:function(data){
  //         response(data);
  //       }
  //     })
  //   },
  //   minLength:2,
  //   select:function(event,ui) {
  //     window.alert('Selecciono'+ui.item.label);
  //   }
  // });


  //sección de POST
  // $.post('capturaGeneral.php',{pTabCapNumEmp:tabCapNumEmp},tablaCapNumEmple);
  //esta función sirve para captar todos los errores que tenemos al momento de hacer un ajax.
  $.ajaxSetup({
    error: function( jqXHR, textStatus, errorThrown ) {
      if (jqXHR.status == 0) {
        divNotificaciones.html("No hay conexión con el servidor,por favor espere ó llame al administrador");
        $(jqxNotiModCap).jqxNotification({template:'error'});
        $(jqxNotiModCap).jqxNotification('open');
        $('#jqxNotificationDefaultContainer-top-right').css({'z-index':9010});
        return false;
      } else if (jqXHR.status == 404) {
        alert('Requested page not found [404]');
      } else if (jqXHR.status == 500) {
        alert('Internal Server Error [500].');
      } else if (textStatus === 'parsererror') {
        alert('Requested JSON parse failed.');
      } else if (textStatus === 'timeout') {
        alert('Time out error.');
      } else if (textStatus === 'abort') {
        alert('Ajax request aborted.');
      } else {
        alert('Uncaught Error: ' + jqXHR.responseText);
      }
    }
  });//fin de la función $.ajaxSetup
  $('#jqxNotiModCap').jqxNotification({
    width: 250,
    position: "top-right",
    opacity: 2,
    autoOpen: false,
    autoClose: false,
    template: "error"
    });
    fecDetAsis.jqxDateTimeInput(
  		{
  			width: '150px',
  			height: '25px',
  			culture:'es-ES',
  			formatString: "d",
  			showFooter:true,
  			clearString:'Limpiar',
  			todayString:'Hoy',
  			disabled:false,
  			showWeekNumbers:true
  	}).jqxDateTimeInput('setDate',new Date(fechaDiaDet.getFullYear(),fechaDiaDet.getMonth(),fechaDiaDet.getDate()));

    function obtenerFecha(fechaDia) {
  		this.fechaDia=fechaDia;
  		if (parseInt(this.fechaDia.getMonth())<9) {
  			mes=0+""+(this.fechaDia.getMonth()+1);
  		}else{
  			mes=this.fechaDia.getMonth()+1;
  		}
  		if (parseInt(this.fechaDia.getDate())<10) {
  			dia=0+""+this.fechaDia.getDate();
  		}else{
  			dia=this.fechaDia.getDate();
  		}
  		return this.fechaDia.getFullYear()+"/"+mes+"/"+dia;
  	}//fin de la función obtenerFecha
  //vamos a gregar un evento si hay un error en el AJAX
  function errorFuncionABtnEmp(jqXHR,textStatus,errorThrown) {
		if (jqXHR.status == 0) {
			divNotificaciones.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
			jqxNotiModCap.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		var errorPHP=jqXHR.responseText;
		//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
		divNotificaciones.html(textStatus);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		divNotificaciones.html(errorPHP);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
		divNotificaciones.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
	}//fin de la función errorFuncionABtnEmp
});//fin del la función del ready

//función click de la lista de los número de parte #listaNumParte
// function set_item(item) {
//   // change input value
//   $('#inpNumParte').val(item);
//   // hide proposition list
//   $('#listaNumParte').hide();
//   $('#inpCantReq').focus().select();
// }
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
