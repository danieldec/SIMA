$(document).ready(principal);
function principal() {
	//variables usadas globalmente
	var inpAgrNEmpNOrd=$('.inpAgrNEmpNOrd',"#modCapNumOrd");
	var inpAnadirEmp=$('.inpAnadirEmp','#modCapNumOrd');
	var jqxNotiModCap=$('#jqxNotiModCap');
	//autocomplete para registrar operadores al número de orden.
	inpAgrNEmpNOrd.autocomplete({
		source:listaEmpleados,
		minLength:2,
		select:function(event,ui) {
			inpAnadirEmp.trigger('click');
		}
	});
	function listaEmpleados(request,response) {
		$.post({
			url:"php/empleadosLista.php",
			dataType:'json',
			data:{q:request.term},
			success:function (data) {
				response(data);
			},
			type:'POST'
		});
	}//fin de la función listaEmpleados.

	//evento click registrar o agregar para asignar al empleado al número de parte. y agregarlo en la base de datos en la tabla detalle_
	inpAnadirEmp.on('click',agregarBtnEmpleado);
	function agregarBtnEmpleado(e) {
		var zInd=$('#modCapNumOrd').css('zIndex');
		var numParte=$(modCapNumOrd).data('numParte');
		var numOrden=$(modCapNumOrd).data('numOrden');
		var idEmpleado=inpAgrNEmpNOrd.val();
		console.log(idEmpleado.length);
		if ((idEmpleado.length>=0&&idEmpleado.length<6)||idEmpleado==""||idEmpleado.length>6) {
			$(jqxNotiModCap).jqxNotification({template:'error'}).html("Ingresa un número de empleado").jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		var respuesta=$.post({
			url:"php/anadirEmpANumOrd.php",
			dataType:'json',
			data:{numParte:numParte,numOrden:numOrden,idEmpleado:idEmpleado},
			success:exitoFuncionABtnEmp,
			type:'POST',
			error:errorFuncionABtnEmp
		})		
	}//fin de la función agregarBtnEmpleado
	function exitoFuncionABtnEmp(data,textStatus,jqXHR) {
		jqxNotiModCap.jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
	}//fin de la función exitoFuncionABtnEmp
	function errorFuncionABtnEmp(jqXHR,textStatus,errorThrown) {
		//Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
		$(jqxNotiModCap).jqxNotification({template:'error'}).html(textStatus).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		$(jqxNotiModCap).jqxNotification({template:'error'}).html(jqXHR.responseText).jqxNotification('open');
		$(jqxNotiModCap).jqxNotification({template:'error'}).html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack).jqxNotification('open');
		console.log(jqXHR)
	}//fin de la función errorFuncionABtnEmp
	//Aquí acaba la función error 


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