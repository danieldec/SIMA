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
          $('#inpEmpABus').val("");
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
    $('#inpEmpABus').focus();
  }//fin la función evtChangeSelect
  //vamos a darle el foco al input de la fecha inicio y tambien agregamos el required que obliga agregar una fecha por si el usuario elimina los datos de los input
  $('#feNOI').find('input').focus().prop({'required':'required',tabindex:4,placeholder:'Ingresa fecha inicial'});
  $('#feNOI>div').children('div').prop('tabindex','5');
  $('#feNOF').find('input').prop({'required':'required',tabindex:6,placeholder:"Ingresa fecha final"});
  $('#feNOF>div').children('div').prop('tabindex','7');
  $('#feNOI>div,#feNOF>div').children('div').on('keydown focusin focusout',function (e) {
    console.log(e);
    switch (e.type) {
      case "focusin":
        $(this).css({'background-color':'rgb(209,209,209)','transform':'scale(1.04)'});
        break;
      case "focusout":
      $(this).css({'background-color':'rgb(239,239,239)','transform':'scale(1)'});
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
      },
      focus:function (event,ui) {
        $('#inpEmpABus').val(ui.value);
      }
    }
  ).autocomplete("instance")._renderItem = function (ul, item) {
    return $( "<li>" ).append( "<div>" + item.value + "<br>" + item.label + "</div>" ).appendTo( ul );
  };
  //función funListEmp
  function funListEmp(request,response) {
    var busEmpPost = "";
    var datoBusEmp=request.term.toUpperCase();
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
  }
  formEfiPorEmp.on('submit',formExitoResp);
  //función del submit donde recibe los datos
  function formExitoResp(e) {
    console.log(e);
    e.preventDefault();
  }
  function errorAJAX(jqXHR,textStatus,errorThrown) {
  		if (jqXHR.status == 0) {
  			divNotificaciones.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
  			jqxNoti.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
  			$('#jqxNotificationDefaultContainer-top-right');
  			return false;
  		}
  		var errorPHP=jqXHR.responseText;
  		//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
  		divNotificaciones.html(textStatus);
  		jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
  		$('#jqxNotificationDefaultContainer-top-right');
  		divNotificaciones.html(errorPHP);
  		jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
  		divNotificaciones.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
  		jqxNoti.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
  }
}//fin de la función principal
