$(document).ready(principal);
function principal() {
	//variables usadas globalmente
	var zInd=$('#modCapNumOrd').css('zIndex');
	var inpAgrNEmpNOrd=$('.inpAgrNEmpNOrd',"#modCapNumOrd");
	var inpAnadirEmp=$('.inpAnadirEmp','#modCapNumOrd');
	var jqxNotiModCap=$('#jqxNotiModCap');
	var divNotificaciones=$('#divNotificaciones');
	var fechaDia=new Date(),ano,mes,dia,fechaCompletaHoy;
	var tablaCapPorHora=$('#tablaCapPorHora');
	var divFechaCapEmpleados=$('#divFechaCapEmpleados');
	var divVentanaCapHora=$('#divVentanaCapHora');
	var cantidadEmp=$('#cantidadEmp');
	var tPar=$('#tPar');
	var modalTiempoMuerto=$('#modalTiempoMuerto');
	var tmCap=$('#tmCap');
	var btnCapPorHora=$('#btnCapPorHora');
	var formCapPorHora=$('#formCapPorHora');
	var spanNumEmpleadoCap=$('#spanNumEmpleadoCap');
	var spanHoraCap=$('#spanHoraCap');
	var inpNumParteCap=$('.inpNumParteCap');
	var spanRateCap=$('#spanRateCap');
	var npBuscar=$('#npBuscar');
	var divFechaCapPost=$('#divFechaCapPost');
	var spanNumParteCap=$('#spanNumParteCap');
	var spanRateCap2=$('#spanRateCap2');
	var thRangoHora,tdNumEmpleado,tdEditar;
	var ventanaAbierta=false;
	var number = 0;
	var numParteSelect;
	//incializamos el calendario del modal de la captura y la configuración inicial
	divFechaCapEmpleados.jqxDateTimeInput(
		{
			width: '150px',
			height: '25px',
			culture:'es-ES',
			formatString: "d",
			showFooter:true,
			clearString:'Limpiar',
			todayString:'Hoy',
			disabled:true
	}).
	css({'margin':'10px auto'}).
	jqxDateTimeInput('setDate',new Date(fechaDia.getFullYear(),fechaDia.getMonth(),fechaDia.getDate()));
	divFechaCapPost.jqxDateTimeInput(
		{
			width: '150px',
			height: '25px',
			culture:'es-ES',
			formatString: "d",
			showFooter:true,
			clearString:'Limpiar',
			todayString:'Hoy',
	}).
	jqxDateTimeInput('setDate',new Date(fechaDia.getFullYear(),fechaDia.getMonth(),fechaDia.getDate()));
	//fecha del día del hoy.
	fechaCompletaHoy = obtenerFecha(fechaDia);
	/*función que nos devuelve la fecha formateada así:
	YYYY/mm/dd*/
	function obtenerFecha(fechaDia) {
		this.fechaDia=fechaDia;
		if (this.fechaDia.getMonth()<10) {
			mes=0+""+(this.fechaDia.getMonth()+1);
		}else{
			mes=this.fechaDia.getMonth()+1;
		}
		if (this.fechaDia.getDate()<10) {
			dia=0+""+this.fechaDia.getDate();
		}else{
			dia=this.fechaDia.getDate();
		}
		return this.fechaDia.getFullYear()+"/"+mes+"/"+dia;
	}//fin de la función obtenerFecha
	//evento click del calendario
	divFechaCapEmpleados.on('click',clickCalendario);
	function clickCalendario(e) {
		var desactivoCalendario= divFechaCapEmpleados.jqxDateTimeInput('disabled');
		if (!desactivoCalendario) {
		}
		else{
			var editarCalendario=window.prompt("Ingresa contraseña supervisor para cambiar fecha");
			if (editarCalendario!=null) {
				if (editarCalendario=="SIMAC2016") {
					divFechaCapEmpleados.jqxDateTimeInput({disabled:false})
				}//fin del if
				else {
					window.alert("Contraseña no válida");
				}//fin del else
			}//fin del if
		}//fin del else
	}//fin de la funcion clickCalendario
	//autocomplete para registrar operadores al número de orden.
	inpAgrNEmpNOrd.autocomplete({
		source:listaEmpleados,
		minLength:2,
		select:function(event,ui) {
			inpAgrNEmpNOrd.val(ui.item.value)
			inpAnadirEmp.trigger('click');
		}
	});
	//Aquí termina el método del autocomplete()
	//Aquí empieza el metodo listaEmpleados
	function listaEmpleados(request,response) {
		var fechaDia=divFechaCapEmpleados.jqxDateTimeInput('getDate');
		fechaCompletaHoy = obtenerFecha(fechaDia);
		$.post({
			url:"php/empleadosLista.php",
			dataType:'json',
			data:{fechaCompletaHoy:fechaCompletaHoy,q:request.term},
			success:function (data) {
				response(data);
			},
			type:'POST',
			error:errorFuncionABtnEmp
		});
	}//fin de la función listaEmpleados.

	//autocomplete
	inpNumParteCap.autocomplete({
		source:funListaNumParte,
		minLength:2,
		select:function(event,ui) {
			obtenerRate(ui.item.value);
		}
	});
	//Aquí termina el método del autocomplete()
	//Aquí empieza el metodo listaEmpleados
	function funListaNumParte(request,response) {
		$.post({
			url:"php/numParteRate.php",
			dataType:'json',
			data:{numParte:request.term},
			success:function (data) {
				response(data);
			},
			type:'POST',
			error:errorFuncionABtnEmp
		});
	}
	function obtenerRate(numParte) {
		$.post({
			url:"php/numParteRate.php",
			dataType:'json',
			data:{numParte:numParte,rate:true},
			success:exitoObtenerRate,
			type:'POST',
			error:errorFuncionABtnEmp
		})
	};
	function exitoObtenerRate(data) {
		spanRateCap.html(data.rate)
	}
	//aquí obtenemos el objeto que constuye el autocomplete y lo que hacemos es obtener el UL para darle un z-index de 9002
	var  inpNumParteCapUl=$( ".inpNumParteCap" ).autocomplete( "instance" );
	$(inpNumParteCapUl.bindings[1]).css('z-index','9004');

	//Aquí termina las funciones y eventos asociados al autocomplete del número de empleado en el detalle asistencia del día.

	//evento click registrar o agregar para asignar al empleado al número de parte. y agregarlo en la base de datos en la tabla detalle_
	inpAnadirEmp.on('click',agregarBtnEmpleado);
	function agregarBtnEmpleado(e) {
		//Guardamos las variables de numOrden con el metodo data, de objeto modCapNumOrd
		var numOrden=$(modCapNumOrd).data('numOrden');
		var idEmpleado=inpAgrNEmpNOrd.val();
		if ((idEmpleado.length>=0&&idEmpleado.length<=3)||idEmpleado==""||idEmpleado.length>6) {
			jqxNotiModCap.jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd}).find('.jqx-notification-content').html("Ingresa un número de empleado valido");
			inpAgrNEmpNOrd.select().focus();
			return false;
		}
		var respuesta=$.post({
			url:"php/anadirEmpANumOrd.php",
			dataType:'json',
			data:{numOrden:numOrden,idEmpleado:idEmpleado,fechaCompletaHoy:fechaCompletaHoy},
			success:exitoFuncionABtnEmp,
			type:'POST',
			error:errorFuncionABtnEmp
		})
	}//fin de la función agregarBtnEmpleado
	//Inicio de la función exitoFuncionABtnEmp
	function exitoFuncionABtnEmp(data,textStatus,jqXHR) {
		if (data.validacion=="Exito") {
			divNotificaciones.html(data.datos)
			$(jqxNotiModCap).jqxNotificatifunListaNumParte
		}else if (data.validacion=="Error") {
			divNotificaciones.html(data.datos);
			$(jqxNotiModCap).jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			inpAgrNEmpNOrd.val('');
		}
	}//fin de la función exitoFuncionABtnEmp
	function errorFuncionABtnEmp(jqXHR,textStatus,errorThrown) {
		if (jqXHR.status == 0) {
			divNotificaciones.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
			jqxNotiModCap.jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		var errorPHP=jqXHR.responseText;
		//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
		divNotificaciones.html(textStatus);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		divNotificaciones.html(errorPHP);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
		divNotificaciones.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
		jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
	}//fin de la función errorFuncionABtnEmp
	//evento autocomplete del numero de parte, para la captura

	//empezamos a realizar la interfaz de la captura de produccion.
	$('#ventanaCapPorHora').jqxWindow(
		{
			width:'100%',
			height:'50%',
			autoOpen:false,
			maxHeight:'700px',
			maxWidth:'900px',
			minWidth:'10%',
			minHeight:'10%',
			cancelButton: $('#inpCancelVentana')
		});
		divVentanaCapHora.jqxWindow({
			width:'100%',
			height:'100%',
			autoOpen:false,
			maxHeight:'300px',
			maxWidth:'300px',
			minWidth:'10%',
			minHeight:'10%',
			showAnimationDuration:20
		});
	$('.capturaPorHora').on('click',clickBtnCapturaXHora);
	function clickBtnCapturaXHora() {
		var fechaDia=divFechaCapEmpleados.jqxDateTimeInput('getDate');
		fechaCompletaHoy = obtenerFecha(fechaDia);
		var numOrden=$(modCapNumOrd).data('numOrden');
		$.post({
			url:"php/listaCapturaFolio.php",
			dataType:'json',
			data:{numOrden:numOrden,fechaCompletaHoy:fechaCompletaHoy},
			success:exitoFunListaEmpleados,
			type:'POST',
			error:errorFuncionABtnEmp
		});
		var nose =$( ".inpNumParteCap" ).autocomplete( "instance" );
		console.log(nose);
	}//Aquí termina la función click
	//aquí empieza la función exitoFunListaEmpleados
	function exitoFunListaEmpleados(data,textStatus,jqXHR) {
		if (data.validacion=="Exito") {
			$('#tablaCapPorHora').DataTable().destroy();
			$('#tablaCapPorHora>tbody').html(data.datos);
			$('#ventanaCapPorHora').jqxWindow({
				width:'100%',
				height:'350px',
				autoOpen:true,
				maxHeight:'700px',
				maxWidth:'900px',
				minWidth:'10%',
				minHeight:'10%',
				position:'top',
				cancelButton: $('#inpCancelVentana')
			}).jqxWindow('open');
			$('#ventanaCapPorHora').jqxWindow('focus');
			$('#tablaCapPorHora').DataTable({
				"language":{
					"url":"../../json/Spanish.json"
				}
			});
			inpNumParteCap.val(data.numParte);
			spanRateCap.html(data.rate);
		}else if (data.validacion=="Error") {
			divNotificaciones.html(data.datos);
			console.log(data.datos);
			jqxNotiModCap.jqxNotification({template:'error',width:'300',height:'auto'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
	}//Aquí termina la función exitoFunListaEmpleados
	//Aquí asignamos el evento a los td donde se va a realizar la captura por hora
	$("#"+tablaCapPorHora.prop('id')+'>tbody').on('click','td:nth-of-type(+n+7)',venCapPer);
	contador=0;
	function venCapPer(e) {

		ventanaAbierta=divVentanaCapHora.jqxWindow('isOpen');
		if (ventanaAbierta) {
			divVentanaCapHora.jqxWindow('close');
			divVentanaCapHora.jqxWindow({closeAnimationDuration:100});
			tdEditar.css('background-color','rgb(255, 255, 255)');
			thRangoHora.css('background-color','rgb(255, 255, 255)');
			tdNumEmpleado.css('background-color','rgb(255, 255, 255)');
		}
		var indice=$(this).index();
		$('#ventanaCapPorHora').jqxWindow({keyboardNavigation: false});
		tdEditar=$(this);
		tdEditar.css('background-color','gainsboro');
		thRangoHora=$(this).parent().parent().siblings('thead').children('tr').children('th:nth-child('+(indice+1)+')');
		var tdClickeado=$(this);
		tdClickeado.jqxTooltip('open');
		thRangoHora.css('background-color','#8ec9e2');
		tdNumEmpleado=$(this).siblings('.idEmpCap');
		tdClickeado.jqxTooltip({ content: '#Empleado: '+tdNumEmpleado.html()+' Hora: '+thRangoHora.html(), position: 'mouse'});
		tdNumEmpleado.css('background-color','#8ec9e2');
		var positionVenCapPorHora=$('#ventanaCapPorHora').offset();
		var heightVenCapPorHora=$('#ventanaCapPorHora').outerHeight();
		divVentanaCapHora.jqxWindow(
			{
			position: { x: positionVenCapPorHora.left, y: heightVenCapPorHora},
			height:'210',
			resizable:false,
			 okButton: btnCapPorHora
		});
		//función cuando se abre la ventana
		divVentanaCapHora.jqxWindow('open',function(e) {
			cantidadEmp.val(0);
			tPar.val(60);
			cantidadEmp.focus().select();
			spanNumEmpleadoCap.html(tdNumEmpleado.html());
			spanHoraCap.html(thRangoHora.html());
		});
		//métodos para que la ventana divVentanaCapHora este al frente de la ventana #ventanaCapPorHora y que tenga el foco también.
		divVentanaCapHora.jqxWindow('bringToFront');
		divVentanaCapHora.jqxWindow('focus');
		var fechaDia=divFechaCapPost.jqxDateTimeInput('getDate');
		fechaCompletaHoy = obtenerFecha(fechaDia);
		divVentanaCapHora.data({
			'numParte':inpNumParteCap.val(),
			'rate':spanRateCap.html(),
			'fechaHoy':fechaCompletaHoy
		});
	}
	//evento hover de los td
	$("#"+tablaCapPorHora.prop('id')+'>tbody').on('mouseover','td:nth-of-type(+n+7)',funHoverTD);
	function funHoverTD(e) {
		if (e.type=="mouseover") {
			var indice=$(this).index();
			var tdClickeado=$(this);
			var thRangoHora=$(this).parent().parent().siblings('thead').children('tr').children('th:nth-child('+(indice+1)+')');
			var tdNumEmpleado=$(this).siblings('.idEmpCap');
			tdClickeado.jqxTooltip({ content: '#Empleado: '+tdNumEmpleado.html()+' Hora: '+thRangoHora.html(), position: 'mouse'});
			tdClickeado.jqxTooltip('open');
		}
	}
	//evento asígnado a la ventana de divVentanaCapHora cuando cerramos la misma ventana
	divVentanaCapHora.on('close',funCerrarVentana);
	function funCerrarVentana(e) {
		thRangoHora.css('background-color','rgb(247, 247, 247)');
		tdNumEmpleado.css('background-color','rgb(247, 247, 247)');
		tdEditar.css('background-color','rgb(247, 247, 247)');
	}
	//evento asociado al botón de tiempo muerto de la ventana divVentanaCapHora
	$('#tmCap').on('click',clickTM);
	function clickTM(e) {
	}
	//evento asociado al botón de submit del formulario de la ventana divVentanaCapHora
	// btnCapPorHora.on('click',clickCaptura);
	// function clickCaptura(e) {
	// 	var h= thRangoHora.attr('data-h');
	// }
	formCapPorHora.on('submit',enviarFuncion);
	function enviarFuncion(e) {
		console.log(divVentanaCapHora.data('numParte'));
		console.log(divVentanaCapHora.data('rate'));
		console.log(divVentanaCapHora.data('fechaHoy'));
		e.preventDefault();
	}



	$.ajaxSetup({
		error:function(jqXHR,textStatus,errorThrown) {
			if (jqXHR.status == 0) {
				divNotificaciones.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
				jqxNotiModCap.jqxNotification({template:'error'}).jqxNotification('open');
				$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
				return false;
			}
			var errorPHP=jqXHR.responseText;
			//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
			divNotificaciones.html(textStatus);
			jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			divNotificaciones.html(errorPHP);
			jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
			divNotificaciones.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
			jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
		}
	})
}//fin de la función principal


//nos va a servir de referencia para cuando ocurra un error al momento de hacer una consulta ajax
/*$.ajaxSetup({
    error: function( jqXHR, textStatus, errorThrown ) {
      if (jqXHR.status == 0) {
        alert('No hay conexión con el servidor, por favor intente más tarde o llame al administrador');
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
  });//fin de la función $.ajaxSetup*/
