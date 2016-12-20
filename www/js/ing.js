$(document).ready(principal);
function principal(e) {
	//variables usadas en la pestañana num parte
	var numParteTabla=$('#numParteTabla');
	var numParteTablaTbody=$('#numParteTabla>tbody');
	var btnAgregarNumP = $('#btnAgregarNumP');
	var formNumParte = $('#formNumParte');
	//variables de la interfaz de ingenieria
	var jqxNotIng = $('#jqxNotIng');
	var jqxNotIngContent = $('#jqxNotIngContent');
	jqxNotIng.jqxNotification({template:'error',width:'auto',height:'auto'});
	var venAltaNumParte=$('#venAltaNumParte');
	var venEditNumParte = $('#venEditNumParte');
	var formEditNumParte = $('#formEditNumParte');
	var numperoParteReg;
	var rateNumParteReg;
	//variables para la edición del número de parte
	var numParteEdt,rateEdt,descEdt,bajaEdt;
	var divVenPregBaja = $('#divVenPregBaja');
	venAltaNumParte.jqxWindow(
	{
		autoOpen:false,
		width:'50%',
		height:'200',
		showCollapseButton:true
	});
	venEditNumParte.jqxWindow(
	{
		autoOpen:false,
		width:'100%',
		height:'200px',
		showCollapseButton:true
	});
	divVenPregBaja.jqxWindow(
	{
		autoOpen:false,
		width:'200px',
		height:'120px',
		showCollapseButton:true
	});

	//Tenemos que llenar la tabla num Parte
	function actualizarTabla() {
		$.post({
			url:'php/tablaNumParte.php',
			dataType:'json',
			data:{numParteTa:true},
			success:exitoTablaNumParte,
			type:'POST',
			error:errorFuncionAjax
		});
	}
	function exitoTablaNumParte(data,x,y) {
		if (data.validacion=="exito") {
			numParteTabla.DataTable().destroy();
			numParteTablaTbody.html(data.datos);
			numParteTabla.DataTable({
            "language":{
            	"url":"../../json/Spanish.json",
            },
            stateSave: true
          });
		}else if (data.validacion=="error"){
			jqxNotIngContent.html(data.datos);
			jqxNotIng.jqxNotification(
				{
					template:'error',
					width:'100%',
					height:'100%'
				});
			jqxNotIng.jqxNotification('open');
		}
	}
	actualizarTabla();
	//evento botón con id btnAgregarNumP 
	btnAgregarNumP.on('click',evtBtnAgreNP);
	function evtBtnAgreNP(e) {
		venAltaNumParte.jqxWindow('open');
	}
	//eventos de la ventana venAltaNumParte
	venAltaNumParte.on('open',funOpenWin);
	venAltaNumParte.on('close',funCloseWin);
	function funOpenWin(e) {
		$('#numParte').val('').focus().select();
		$('#rateNumParte').val('');
		$('#descNumParte').val('');
	}
	function funCloseWin(e) {

	}
	//evento del formulario para el submit
	formNumParte.on('submit',funSubmitNumParte);
	function funSubmitNumParte(e) {
		e.preventDefault();
		var datosNumParte = $(this).serialize();
		numperoParteReg= $('#numParte').val();
		rateNumParteReg = $('#rateNumParte').val();
		$.post(
		{
			url:'php/altaNumParte.php',
			dataType:'json',
			data:{datosNumParte:datosNumParte},
			success:exitoNumParte,
			type:'POST',
			error:errorFuncionAjax
		});
	}
	function exitoNumParte(datos) {
		console.log(datos);
		if (datos.validacion=="exito") {
			jqxNotIngContent.html(datos.datos);
			jqxNotIng.jqxNotification({template:'success',width:'300px',height:'auto'});
			jqxNotIng.jqxNotification('open');
			actualizarTabla();
			venAltaNumParte.jqxWindow('close');
			var x = $('#divRowNumParte')["0"].childNodes[1].childNodes[1].childNodes[1].childNodes[1].childNodes["0"].childNodes[1];
			buscarInp($('#divRowNumParte'));
			//console.log(x="Hola que hace")

		}else if (datos.validacion=="error") {
			jqxNotIngContent.html(datos.datos);
			jqxNotIng.jqxNotification({template:'error',width:'300px',height:'auto'});
			jqxNotIng.jqxNotification('open');
		}
	}
	function buscarInp(e) {
		console.log(e)
	}
	//evento tr para editar una celda
	numParteTabla.on('click','.btnEdit>input',evtClickEditNumParte);
	function evtClickEditNumParte(e) {
		venEditNumParte.jqxWindow('open');
		numParteEdt = $(this).parent().siblings('.numParte').text();
		rateEdt = $(this).parent().siblings('.rate').text();
		descEdt = $(this).parent().siblings('.desc').text(); 
		bajaEdt = $(this).parent().siblings('.est').text();
	}
	venEditNumParte.on('open',openWinVenEdit);
	function openWinVenEdit(e) {
		$('#numParteEdit').val(numParteEdt);
		$('#rateNumParteEdit').val(rateEdt);
		$('#descNumParteEdit').val(descEdt);
		if (bajaEdt==1) {
			$('#spanAltaBaja').text("BAJA");
			$('#bajaEdit').val(0).removeAttr('checked');
		}else if (bajaEdt==0){
			$('#spanAltaBaja').text("ALTA");
			$('#bajaEdit').val(0).removeAttr('checked');
		}
	}
	$('#bajaEdit').on('change',function(e){
		if ($(this).is(':checked')) {
			if (bajaEdt==1) {
				divVenPregBaja.jqxWindow('setContent','<p>¿Deseas realmente dar de baja este número de parte?</p><input type="button" id="AceptarBaja" value="Aceptar"><input type="button" id="cancelarBaja" value="Cancelar">');
				divVenPregBaja.jqxWindow({
				okButton:$('#AceptarBaja'),
				cancelButton:$('#cancelarBaja')
			});
			divVenPregBaja.jqxWindow('open');
			divVenPregBaja.jqxWindow('bringToFront');
		}else if (bajaEdt==0) {
			divVenPregBaja.jqxWindow('setContent','<p>¿Deseas realmente dar de alta este número de parte?</p><input type="button" id="AceptarBaja" value="Aceptar"><input type="button" id="cancelarBaja" value="Cancelar">');
			divVenPregBaja.jqxWindow({
				okButton:$('#AceptarBaja'),
				cancelButton:$('#cancelarBaja')
			});
			divVenPregBaja.jqxWindow('open');
			divVenPregBaja.jqxWindow('bringToFront');
		}		
	}
	});
	divVenPregBaja.on('close',evtClosePregBaja);
	function evtClosePregBaja(e) {
		if (e.args.dialogResult.Cancel==true) {
			if (bajaEdt==1) {
				$('#bajaEdit').val(1).removeAttr('checked');
			}else if (bajaEdt==0) {
				$('#bajaEdit').val(0).removeAttr('checked');
			}
		}
		if (e.args.dialogResult.None==true) {
			if (bajaEdt==1) {
				$('#bajaEdit').val(1).removeAttr('checked');
			}else if (bajaEdt==0) {
				$('#bajaEdit').val(0).removeAttr('checked');
			}
		}
		if (e.args.dialogResult.OK==true) {
			if (bajaEdt==1) {
				$('#bajaEdit').val(0).prop('checked','checked');
			}else if (bajaEdt==0) {
				$('#bajaEdit').val(1).prop('checked','checked');
			}
		}
	}//fin del evento cerrar de la ventana divVenPregBaja
	formEditNumParte.on('submit',subFormEdit);
	function subFormEdit(e) {
		e.preventDefault();
		var formDatos=$(this).serialize();
		var formNP=$(this).find('#numParteEdit').val();
		var formRate=$(this).find('#rateNumParteEdit').val();
		var formDesc=$(this).find('#descNumParteEdit').val();
		var formBaja=$(this).find('#bajaEdit').val();
		console.log(formDatos);
		console.log(formNP);
		console.log(formRate);
		console.log(formDesc);
		console.log(formBaja);
	}
	//función que atrapa los errores ocurridos cuando hacemos un ajax
	function errorFuncionAjax(jqXHR,textStatus,errorThrown) {
    if (jqXHR.status == 0) {
      jqxNotIngContent.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
      jqxNotIng.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotIng.jqxNotification('open');
      return false;
    }
    var errorPHP=jqXHR.responseText;
    //Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
    jqxNotIngContent.html(textStatus);
    jqxNotIng.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
    jqxNotIngContent.html(errorPHP);
    jqxNotIng.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
    jqxNotIngContent.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
    jqxNotIng.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
  }//fin de la función errorFuncionAjax
}