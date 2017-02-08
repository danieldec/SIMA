$(document).on('ready',principal);
function principal() {
  // Inicializamos variables de nuestros objetos de jquery
  var formEfiPorEmp = $('#formEfiPorEmp');
  var feNOI = $('#feNOI');
  var feNOF = $('#feNOF');
  var ulTabConsulta = $('#ulTabConsulta');
  var selectEmp = $('#selectEmp');
  var inpTypeRad= $('input[name=tipoBusE]');
  var inpEmpABus = $('#inpEmpABus');
  var jqxNoti = $('#jqxNoti');
  var divNotificaciones = $('#divNotificaciones');
  var itemSelectList = false;
  var venDetCap = $('#venDetCap');
  var tablaDetCap = $('#tablaDetCap');
  //variables relacionado con el reporte de eficiencia
  var divFechaI = $('#divFechaI');
  var divFechaF = $('#divFechaF');
  //evento ul para realizar una acción al momento de cambiar de pestañas, posibles eventos showb.bs.tab
  ulTabConsulta.children('li').children('a[data-toggle="tab"]').on('show.bs.tab shown.bs.tab',evtShowTab);
  //función que va a recibir el evento de tab
  function evtShowTab(e) {
    if (e.type=="show") {
      switch (e.target.innerText) {
        case "Reporte eficiencia":

        break;
        case "Eficiencia por empleado":
          //si necesitamos resetear los valores del radiobutton y del select
          $('#pOpEmp').prop('hidden','hidden');
          inpTypeRad.removeAttr('checked');
          $('#inpEmpABus').val("").prop('disabled','disabled');
          break;
        default:
      }
    }
    if (e.type=="shown") {
      switch (e.target.innerText) {
        case "Reporte eficiencia":
        break;
        case "Eficiencia por empleado":
        $('#feNOI').find('input').focus()
        break;
        default:
      }
    }
  }
  //iniciamos la libreria de DateTimeInput de jqwidget
  feNOI.jqxDateTimeInput(
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
    });
  //iniciamos la libreria de DateTimeInput de jqwidget
  feNOF.jqxDateTimeInput(
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
    });
  //evento change del radio button para que me muestre los número de empleado o el nombre
  inpTypeRad.on('change',evtChangeSelect);
  function evtChangeSelect(e) {
    var contenidoInput = $('#inpEmpABus').val().length ? $('#inpEmpABus').val("") : "";
    var atributoHiddenInput = $('#pOpEmp').prop('hidden') ? $('#pOpEmp').removeAttr('hidden') : "";
    var disabledInpABus = $('#inpEmpABus').prop('disabled') ? $('#inpEmpABus').removeAttr('disabled') : "";
    $('#inpEmpABus').focus();
    //si selecciono el radio del nombre del empleado
    if (e.target.value === $('#nomEmpB').val()) {
      $('#inpEmpABus').prop('placeholder','Nombre Empleado')
    }//fin del if
    //si seleccionamos el radio del numero del empleado
    else if (e.target.value === $('#numEmpB').val()) {
      $('#inpEmpABus').prop('placeholder','número empleado')
    }//fin del elseif
  }//fin la función evtChangeSelect
  //vamos a darle el foco al input de la fecha inicio y tambien agregamos el required que obliga agregar una fecha por si el usuario elimina los datos de los input
  $('#feNOI').find('input').focus().prop({'required':'required',tabindex:4,placeholder:'Ingresa fecha inicial'});
  $('#feNOI>div').children('div').prop('tabindex','5');
  $('#feNOF').find('input').prop({'required':'required',tabindex:6,placeholder:"Ingresa fecha final"});
  $('#feNOF>div').children('div').prop('tabindex','7');
  $('#feNOI>div,#feNOF>div').children('div').on('keydown focusin focusout',function (e) {
    switch (e.type) {
      case "focusin":
        $(this).css({'background-color':'rgb(209,209,209)'});
        break;
      case "focusout":
      $(this).css({'background-color':'rgb(239,239,239)'});
        break;
      case "keydown":
        e.key == "Enter" ? $(this).trigger('mousedown') : "";
        break;
    }
  });
  //creamos el evento de submit de nuestro formulario formEfiPorEmp
  inpEmpABus.autocomplete(
    {
      source:funListEmp,
      minLength:2,
      select:function (event,ui) {
        $('#inpEmpABus').val(ui.value);
        itemSelectList = true;
        var idEmp = $('#inpEmpABus').val();
        $('#inpEmpABus').data({'idEmpSelect':idEmp});
      },
      focus:function (event,ui) {
        $('#inpEmpABus').val(ui.value);
      }
    }
  ).autocomplete("instance")._renderItem = function (ul, item) {
    if (item.value!==item.label) {
      return $( "<li>" ).append( "<div>" + item.value + "<br>" + item.label + "</div>" ).appendTo( ul );
    }else{
      return $( "<li>" ).append( "<div>" + item.value+"</div>" ).appendTo( ul );
    }
  };
  //función funListEmp
  function funListEmp(request,response) {
    var datoBusEmp=request.term.toUpperCase();
    var busEmpPost = "";
    var comillasSimples = '\'';
    if (datoBusEmp.indexOf(comillasSimples) !== -1) {
      divNotificaciones.html("No se permite la entrada de las comillas simples");
      jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
      $('#inpEmpABus').val('').focus();
      return false;
    }
    $('#inpEmpABus').data({'response':response});
    inpTypeRad.each(function(x,y) {
      var checado = $(this).prop('checked');
      if ($(this).prop('checked')) {
        busEmpPost = $(this).val();
      }//fin del if
    });//fin de la función each
    $.post(
      {
        url:"php/consultas.php",
        dataType:"json",
        type:"POST",
        data:{
          busEmpPost : busEmpPost,
          datoBusEmp : datoBusEmp
        },
        success:exitoPostEmp,
        error:errorAJAX
      }
    );//fin del función post
  }//fin de la función funListEmp
  function exitoPostEmp(data,x,y) {
    response = $('#inpEmpABus').data('response');
    response(data);
  }//fin de la función exitoPostEmp
  formEfiPorEmp.on('submit',formSubmitEfiEmp);
  //función del submit donde recibe los datos
  function formSubmitEfiEmp(e) {
    var idEmpSubmit = $('#inpEmpABus').val();
    //vamos a validar el numero de empleado de la persona, si lo selecciono de la lista entonces no vamos a consultar a la base de datos
    if (idEmpSubmit.length>7|| idEmpSubmit.length<3) {
      divNotificaciones.html("número de empleado no válido");
      jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
      $('#inpEmpABus').val("").focus();
      return false;
    }
    var fechaI = $('#feNOI').jqxDateTimeInput('getDate');
    var fechaF = $('#feNOF').jqxDateTimeInput('getDate');
    var fechaIB=obtenerFecha(fechaI);
    var fechaFB=obtenerFecha(fechaF);
    var diasTotal = fechaF.valueOf()-fechaI.valueOf();
    diasTotal = diasTotal/24/60/60/1000;
    if (diasTotal>6) {
      divNotificaciones.html("la selección de las fechas no debe pasar a los 7 días");
      jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
      return false;
    }else{
      if (diasTotal<0) {
        divNotificaciones.html("la fecha inicio debe ser menor a la fecha final");
        jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
        return false;
      }
    }
    if (itemSelectList) {
      itemSelectList = false;
      var idEmpSel = $('#inpEmpABus').data('idEmpSelect');
      $.post(
        {
        url:'php/consultas.php',
        type:'POST',
        data:
        {
          datosForm:$(this).serialize(),
          fechaIB:fechaIB,
          fechaFB:fechaFB
        },
        dataType:'json',
        beforeSend:evtBeforeSubmit,
        success:exitoSubmitEmp,
        error:errorAJAX
      });
  }//fin del if
  e.preventDefault();
}//fin de la función formSubmitEfiEmp
  //función antes de enviar los datos al servidor
  function evtBeforeSubmit(jqXHR,settings) {
    $('#inpFeNO').val("Buscando...").prop('disabled','disabled');
  }
  //función de exito al enviar los datos al servidor y la respuesta
  function exitoSubmitEmp(data,textStatus,jqXHR) {
    $('#inpFeNO').val("Buscar").removeAttr('disabled');
    if (data.validacion == "exito") {
      $('#tablaDetEfi').children('tbody').html(data.datos);
      $('.detAsisDia',$('#tablaDetEfi')).on('keydown',function (e) {
        if (e.key == "Enter"||e.keyCode==13) {
          capTdClickOrEnter(this);
        }
      });
      $('.detAsisDia',$('#tablaDetEfi')).first().focus();
    }else if (data.validacion == "errorDB") {
      divNotificaciones.html(data.datos);
      jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
    }
    if (data.validacion == "error") {
      $('#tablaDetEfi').children('tbody').html(data.datos);
    }
  }
  //evento click detalleAsistencia
  //Ventana detalle asistencia venDetCap
  venDetCap.jqxWindow(
    {
      maxWidth:'99.9%',
      minWidth:'10%',
      width:'100%',
      maxHeight:'99.9%',
      height:'10%',
      minHeight:'10%',
      position:'center',
      cancelButton:$('#btnCeDetCap'),
      autoOpen:false
    }
  );
  //evento click TdDetAsis
  $('#tablaDetEfi').on('click','.detAsisDia',evtClickDetAsis);
  function evtClickDetAsis(e) {
    capTdClickOrEnter(this);
  }//fin de la función evtClickDetAsis
  //inicio de la función capTdClickOrEnter
  function capTdClickOrEnter(objeto) {
    venDetCap.data('objeto',objeto);
    var detAsis = $(objeto).text();
    $.post(
      {
        url:"php/consultas.php",
        type:'POST',
        data:
        {
          detAsis:detAsis
        },
        dataType:'json',
        beforeSend:function () {

        },
        success:exitoPostDetAsis,
        error:errorAJAX
      }
    );
  }//fin de la función capTdClickOrEnter
  //inicio de la función exitoPostDetAsis.
  function exitoPostDetAsis(data,x,y) {
    if (data.validacion == "error") {
      divNotificaciones.html(data.datos);
      jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
    }else if (data.validacion == "exito") {
      tablaDetCap.children('tbody').html(data.datos);
      venDetCap.jqxWindow({position:'center',height:'400px',width:'99.9%'});
      venDetCap.jqxWindow('open');
      venDetCap.jqxWindow('focus');
    }
  }//fin de la función exitoPostDetAsis
  //eventos relacionados con la ventana venDetCap
  venDetCap.on('close',evtCloseVenDepCap);
  function evtCloseVenDepCap(e) {
    var tdClikcOrEnter = venDetCap.data('objeto');
    tdClikcOrEnter.focus();
  }
  //Aquí terminada todo lo relacionado con la pestaña eficiencia por empleado.
  //vamos a iniciar lo del reporte de eficiencia, funciones, inicializamos objetos y eventos de cada elemento que tengamos en nuestra pestaña eficiencia
  divFechaI.jqxDateTimeInput(
    {
      width:'150px',
      height:'25px',
      culture:'es-ES',
      formatString:'d',
      showFooter:true,
      clearString:'Limpiar',
      todayString:'Hoy',
      showWeekNumbers:true
    }
  );
  divFechaF.jqxDateTimeInput(
    {
      width:'150px',
      height:'25px',
      culture:'es-ES',
      formatString:'d',
      showFooter:true,
      clearString:'Limpiar',
      todayString:'Hoy',
      showWeekNumbers:true
    }
  );
  var formBufi = $('#formBufi');
  var radTodo = $('#radTodo');
  var radEmp = $('#radEmp');
  var inpNuEmp = $('#inpNuEmp');
  var divNumEmp = $('#divNumEmp');
  var tablaEfiCap = $('#tablaEfiCap');
  $('input[name="tipoConsul"]').on('change',evtChaRadBtn);
  //evento change de los radiobuttons
  function evtChaRadBtn(e) {
    var valRadBtn = $(this).val();
    var displayDivNumEmp = divNumEmp.css('display');
    var disabledInpNuEmp = inpNuEmp.attr('disabled');
    if (valRadBtn=="t") {
      if (displayDivNumEmp == "block" && disabledInpNuEmp == undefined) {
        divNumEmp.css('display','none');
        inpNuEmp.prop('disabled',true);
      }
    } else if (valRadBtn=='e') {
      if (displayDivNumEmp == "none" && disabledInpNuEmp == "disabled") {
        divNumEmp.css('display','initial');
        inpNuEmp.removeAttr('disabled');
        inpNuEmp.val("").focus();
      }
    }
  }
  formBufi.on('submit',evtSubForB);
  function evtSubForB(e) {
    // console.log(tablaEfiCap.children('tbody').html().length)
    // console.log(tablaEfiCap.children('thead').html().length)
    if (tablaEfiCap.children('tbody').html().length>0 && tablaEfiCap.children('thead').html().length>0) {
      $('#tablaEfiCap').DataTable().destroy();
    }
    var valRadBtn = $("input[name='tipoConsul']:checked").val();
    var fechaIB = divFechaI.jqxDateTimeInput('getDate');
    var fechaFB = divFechaF.jqxDateTimeInput('getDate');
    // console.log(fechaIB);
    // console.log(fechaFB);
    if (fechaIB == null || fechaFB == null) {
      divNotificaciones.html("Se deben llenar los campos de la fecha");
      jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNoti.jqxNotification('open');
      return false;
    }
    var rangoDias= ((((fechaFB.valueOf()-fechaIB.valueOf())/1000)/24)/60)/60;
    var fechaIForm = obtenerFecha(fechaIB);
    var fechaFForm = obtenerFecha(fechaFB);
    //console.log(fechaIForm);
    //console.log(fechaFForm);
    if(rangoDias>=0&&rangoDias<=6){
      if (valRadBtn=="t") {
        $.post(
          {
            url:'../rh/php/consultaEfi.php',
            dataType:'json',
            data:
            {
             fechaIForm:fechaIForm,
             fechaFForm:fechaFForm,
             dias:rangoDias,
             datosForm:$(this).serialize()
            },
            success:exitFormConsulta,
            type:'POST',
            error:errorAJAX
          });
        //console.log($(this).serialize());
      }
      if (valRadBtn=="e") {
        $.post(
          {
            url:'../rh/php/consultaEfi.php',
            dataType:'json',
            data:
            {
             fechaIForm:fechaIForm,
             fechaFForm:fechaFForm,
             dias:rangoDias,
             datosForm:$(this).serialize()
            },
            success:exitFormConsulta,
            type:'POST',
            error:errorAJAX
          });
        // console.log("vamos a consultar eficiencia por empleado");
        // console.log($(this).serialize());
      }
    }else{
      if (rangoDias>6) {
        tablaEfiCap.children('thead').html("");
        tablaEfiCap.children('tbody').html("");
        divNotificaciones.html("La selección de las fechas debe ser menor a 7 días");
        jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNoti.jqxNotification('open');
      }else{
        divNotificaciones.html("La fecha inicio debe ser menor a la fecha final");
        jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNoti.jqxNotification('open');
      }
    }
    e.preventDefault();
  }//fin de la función evtSubForB;
  function exitFormConsulta(datos,x,y) {
    // console.log(datos);
    if (datos.validacion=="exito") {
      //mostrar datos después que haya estado lista la tabla eliminar registros.
      //console.log(datos);
      if (datos.tc=="t") {
        $('#tablaEfiCap').children('thead').html(datos.datos.thead);
        $('#tablaEfiCap>tbody').html(datos.datos.tbody);
        $('#tablaEfiCap').DataTable(
        {
          "language":
          {
            "url":"../../json/Spanish.json"
          },
          stateSave: true,
          dom: 'Bfrtip',
          buttons:
          [
            'copy',
            {
              extend:'excelHtml5',
              title:'reporteEfi'
            },
            {
              extend:'pdfHtml5',
              title:'reporteEfi'
            },
            'print'
          ]
        });
      }else if (datos.tc=="e") {
        $('#tablaEfiCap').children('thead').html(datos.datos.thead);
        $('#tablaEfiCap').children('tbody').html(datos.datos.tbody);
        $('#tablaEfiCap').DataTable(
        {
          "language":
          {
            "url":"../../json/Spanish.json"
          },
          stateSave: true,
          dom: 'Bfrtip',
          buttons:
          [
            'copy',
            {
              extend:'excelHtml5',
              title:'reporteEfi'
            },
            {
              extend:'pdfHtml5',
              title:'reporteEfi'
            },
            'print'
          ]
        });
      }
    }else if (datos.validacion="error") {
      if (datos.errorE==1) {
        divNotificaciones.html(datos.datos);
        jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNoti.jqxNotification('open');
      }else if(datos.errorC==1){
        divNotificaciones.html(datos.datos);
        jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNoti.jqxNotification('open');
      }else{
        divNotificaciones.html("No se encontraron registros");
        jqxNoti.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNoti.jqxNotification('open');
      }
      tablaEfiCap.children('thead').html("");
      tablaEfiCap.children('tbody').html("");
      //$('#tablaEfiCap').DataTable().clear().draw();
    }
  }
  //aquí termina todo lo relacionado con el reporte de eficiencia
  //funciones genericas
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
  }

  //función de error al momento de hacer un ajax
  function errorAJAX(jqXHR,textStatus,errorThrown) {
    // console.log(jqXHR);
    // console.log(textStatus);
    // console.log(errorThrown);
    if (jqXHR.status == 0) {
      divNotificaciones.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
			jqxNoti.jqxNotification({template:'error',autoClose:false}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right');
			return false;
    }
    var errorPHP=jqXHR.responseText;
  	//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
  	divNotificaciones.html(textStatus);
  	jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
  	$('#jqxNotificationDefaultContainer-top-right');
  	divNotificaciones.html(errorPHP);
  	jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
  	divNotificaciones.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
  	jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto',autoClose:false}).jqxNotification('open');
  }//fin de la función errorAJAX
}//fin de la función principal
