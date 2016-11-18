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
	//incializamos el calendario del modal de la captura y la configuración inicial
	divFechaCapEmpleados.jqxDateTimeInput(
		{
			width: '150px',
			height: '25px',
			culture:'es-ES',
			formatString: "d",
			showFooter:true,
			clearString:'Limpiar',
			todayString:'Hoy'
	}).css({'margin':'10px auto'}).jqxDateTimeInput('setDate',new Date(fechaDia.getFullYear(),fechaDia.getMonth(),fechaDia.getDate()));
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
			$(jqxNotiModCap).jqxNotification({template:'success'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			inpAgrNEmpNOrd.val('');
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

	//empezamos a realizar la interfaz de la captura de produccion.
	$('#ventanaCapPorHora').jqxWindow({'width':'auto','height':'auto',autoOpen:false,maxHeight:700, maxWidth:900});
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
	}
	function exitoFunListaEmpleados(data,textStatus,jqXHR) {
		if (data.validacion=="Exito") {
			$('#tablaCapPorHora').DataTable().destroy();
			$('#ventanaCapPorHora').jqxWindow('open');
			$('#tablaCapPorHora').DataTable({
				"language":{
					"url":"../../json/Spanish.json"
				}
			});
			divNotificaciones.html(data.datos[0].asistencia_fecha);
			console.log(data.datos);
			jqxNotiModCap.jqxNotification({template:'success',width:'auto',height:'auto'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		}else if (data.validacion=="Error") {
			divNotificaciones.html(data.datos);
			console.log(data.datos);
			jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
	}
	$("#"+tablaCapPorHora.prop('id')+'>tbody td:nth-of-type(+n+7)').on('click',venCapPer);
	contador=0;
	function venCapPer(e) {
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
