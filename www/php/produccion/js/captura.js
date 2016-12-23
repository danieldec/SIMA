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
	var btnResetNumParte=$('#btnResetNumParte');
	var divTMVentana=$('#divTMVentana');
	var ventanaCapPorHora=$('#ventanaCapPorHora');
	var eficienciaCap=$('#eficienciaCap');
	var tmMinCap=$('#tmMinCap');
	var cantTTM=$('#cantTTM');
	copiaTM=$('.copiaTM',"#divTMVentana");
	//ventana captura parcial
	var divVenPrePar=$('#divVenPrePar');
	var divVentanaPre=$('#divVentanaPre');
	var divVenCapHoraEmp=$('#divVenCapHoraEmp');
	var divVentanaCapHoraPar=$('#divVentanaCapHoraPar');
	var formCapPorHoraPar=$('#formCapPorHoraPar');
	var spanNumEmpleadoCapPar=$('#spanNumEmpleadoCapPar');
	var spanHoraCapPar=$('#spanHoraCapPar');
	var spanNumParteCapPar=$('#spanNumParteCapPar');
	var spanRateCap2Par=$('#spanRateCap2Par');
	var horaIPar=$('#horaIPar');
	var cantidadEmpPar=$('#cantidadEmpPar');
	var tParPar=$('#tParPar');
	var tmMinCapPar=$('#tmMinCapPar');
	var eficienciaCapPar=$('#eficienciaCapPar');
	var tmCapPar=$('#tmCapPar');
	var btnCapPorHoraPar=$('#btnCapPorHoraPar');
	var btnCapPar = $('#btnCapPar'); 
	var btnVerCapPar = $('#btnVerCapPar'); 
	var divTMVentanaPar = $('#divTMVentanaPar');
	var copiaTMPar = $('.copiaTMPar','#divTMVentanaPar');
	var cantTTMPar=$('#cantTTMPar');
	//aquí termina los objetos de la ventana captura parcial
	var thRangoHora,tdNumEmpleado,tdEditar;
	var ventanaAbierta=false;
	var number = 0;
	var numParteSelect;
	var numParteCapFinal="",rateNumParteFinal="";
	var numParteOriginal="",rateNumParteOriginal="";
	var eficiecia,tp;
	var arregloTiempoMuerto=[];
	var sumaMinTM=0;
	//variables para calcular la eficiencia de la ventana captura
	var minTrabCap, minTotCap, minTmCap,cantidadProgCap,rateCap,efiCap,cantidadCap;
	var detAsis,detNumOrd;
	var vTmCapTab,vHrCapTab;
	var minTotTrabHora;
	var horaFTPar;
	var difMin;
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
			disabled:true,
			showWeekNumbers:true
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
			showWeekNumbers:true
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
			inpAgrNEmpNOrd.val(ui.item.value);
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
			if (ui.item.value.length>10) {
				inpNumParteCap.val(numParteOriginal);
				return false;
			}
			obtenerRate(ui.item.value);
		}
	});
	//Aquí termina el método del autocomplete()
	//Aquí empieza el metodo listaEmpleados
	function funListaNumParte(request,response) {
		$.post({
			url:"php/numParteRate.php",
			dataType:'json',
			data:{numParte:request.term,lista:true},
			success:function (data) {
				response(data);
			},
			type:'POST',
			error:errorFuncionABtnEmp
		});
	}//Aquí termina la función funListaNumParte
	function obtenerRate(numParte) {
		$.post({
			url:"php/numParteRate.php",
			dataType:'json',
			data:{numParte:numParte,rate:true},
			success:exitoObtenerRate,
			type:'POST',
			error:errorFuncionABtnEmp
		})
	};//Aquí termina la función obtenerRate
	function exitoObtenerRate(data) {
		numParteCapFinal=data.num_parte;
		rateNumParteFinal=data.rate;
		spanRateCap.html(rateNumParteFinal);
		inpNumParteCap.val(numParteCapFinal);
		var ventanaAbierta=divVentanaCapHora.jqxWindow('isOpen');
		if (ventanaAbierta) {
			numParteCapFinal=inpNumParteCap.val();
			spanNumParteCap.html(numParteCapFinal);
			spanRateCap2.html(rateNumParteFinal);
		}
	}//Aquí termina la función exitoObtenerRate
	btnResetNumParte.on('click',clickResetNumParte);
	function clickResetNumParte() {
		inpNumParteCap.val(numParteOriginal);
		spanRateCap.html(rateNumParteOriginal);
	}//Aquí termina el evento click del objeto btnResetNumParte
	//aquí obtenemos el objeto que constuye el autocomplete y lo que hacemos es obtener el UL para darle un z-index de 9002
	var  inpNumParteCapUl=$( ".inpNumParteCap" ).autocomplete( "instance" );
	$(inpNumParteCapUl.bindings[1]).css('z-index','9020');
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
		});
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
	//evento autocomplete del numero de parte, para la captura

	//empezamos a realizar la interfaz de la captura de produccion.
	//declaración de las ventana utilizadas en la captura
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
		divTMVentana.jqxWindow(
			{
				width:300,
				height:200,
				autoOpen:false,
				okButton:$('#btnAceptarTM'),
				cancelButton:$('#btnCancelTM')
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
			numParteOriginal=data.numParte;
			rateNumParteOriginal=data.rate;
			inpNumParteCap.val(numParteOriginal);
			spanRateCap.html(rateNumParteOriginal);
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
	function venCapPer(e) {
		contador=0;
		var numEmpleado=$(this).siblings('.idEmpCap').html();
		var efiTabla=$(this).text();
		detListNumOrd=$(this).siblings('.idDetLisNumOrdCap').html();
		var indice=$(this).index();
		detAsis=$(this).siblings('.idDetAsisCap').html();
		var fechaDia=divFechaCapPost.jqxDateTimeInput('getDate');
		fechaCompletaHoy = obtenerFecha(fechaDia);
		vTmCapTab=$(this).siblings('.tmCapTab').html();
		vHrCapTab=$(this).siblings('.hrCapTab').html();
		if (parseInt(efiTabla)<=0) {
			ventanaAbierta=divVentanaCapHora.jqxWindow('isOpen');
			if (ventanaAbierta) {
				divVentanaCapHora.jqxWindow('close');
				divVentanaCapHora.jqxWindow({closeAnimationDuration:100});
				tdEditar.css('background-color','rgb(255, 255, 255)');
				thRangoHora.css('background-color','rgb(255, 255, 255)');
				tdNumEmpleado.css('background-color','rgb(255, 255, 255)');
			}//fin del if
			thRangoHora=$(this).parent().parent().siblings('thead').children('tr').children('th:nth-child('+(indice+1)+')');
			$('#ventanaCapPorHora').jqxWindow({keyboardNavigation: false});
			//Aquí obtenemos el detalle asistencia y detalle num Orden
			tdEditar=$(this);
			tdEditar.css('background-color','gainsboro');
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
					position:
					{
						 x: positionVenCapPorHora.left,
						 y: heightVenCapPorHora
					 },
					height:'210',
					resizable:false
				});
				divVentanaCapHora.jqxWindow('open');
				//métodos para que la ventana divVentanaCapHora este al frente de la ventana #ventanaCapPorHora y que tenga el foco también.
				divVentanaCapHora.jqxWindow('bringToFront');
				divVentanaCapHora.data({
					'numParte':inpNumParteCap.val(),
					'rate':spanRateCap.html(),
					'fechaHoy':fechaCompletaHoy,
					'detListNumOrd':detListNumOrd,
					'detAsis':detAsis,
					'tdClickeado':$(this)
				});
		}//aquí acaba el if
		else{
			thRangoHora=$(this).parent().parent().siblings('thead').children('tr').children('th:nth-child('+(indice+1)+')');
			var horaC=thRangoHora.attr('data-h');
			divVentanaCapHora.data({
				'numParte':inpNumParteCap.val(),
				'rate':spanRateCap.html(),
				'fechaHoy':fechaCompletaHoy,
				'detListNumOrd':detListNumOrd,
				'detAsis':detAsis,
				'tdClickeado':$(this)
			});
			$.post(
				{
					url:"php/minTrab.php",
					dataType:'json',
					data:{horaC:horaC,fechaCompletaHoy:fechaCompletaHoy,detAsis:detAsis},
					success:minTrabExito,
					type:'POST',
					error:errorFuncionABtnEmp
			});//fin del post
			divVentanaCapHora.data({
					'numParte':inpNumParteCap.val(),
					'rate':spanRateCap.html(),
					'fechaHoy':fechaCompletaHoy,
					'detListNumOrd':detListNumOrd,
					'detAsis':detAsis,
					'tdClickeado':$(this)
				});
		}//fin del else
	}// fin de la función venCapPer
	//función respuesta minutosTrab
	function minTrabExito(data) {
		minTotTrabHora=data.datos.tTT;
		horaFTPar=data.datos.horaFDb;
		var divClick=divVentanaCapHora.data('tdClickeado');
		if (parseInt(minTotTrabHora)==60) {
			var coorTd=divClick.offset();
			var venAbierta=divVentanaPre.jqxWindow('isOpen');
			if (venAbierta) {
				divVentanaPre.jqxWindow('close');
			}
			divVentanaPre.jqxWindow(
				{
					position:
					{
						x:coorTd.left,
						y:coorTd.top+divClick.outerWidth()
					}
				});
				divVentanaPre.jqxWindow('open');
				divVentanaPre.jqxWindow('bringToFront');
		}else if (parseInt(minTotTrabHora)<60) {
			//agregar todo lo que hacemos para abrir la captura, pero la diferencia es que vamos a usar el TFDB obtenido de la DB, y usarlo como horaInicio del a siguiente captura.
			divVenPrePar.jqxWindow('open');
			divVenPrePar.jqxWindow('bringToFront');
		}
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
	tmCap.on('click',clickTM);
	function clickTM(e) {
		var heightVenCapPorHora=$('#ventanaCapPorHora').outerHeight();
		var coordenadasVen= divVentanaCapHora.offset()
		divTMVentana.jqxWindow({
			position:
			{
				x: coordenadasVen.left+divVentanaCapHora.outerWidth(),
				y: coordenadasVen.top
			}
		});
		// divTMVentana.jqxWindow('focus');
		divTMVentana.jqxWindow('open');
		divTMVentana.jqxWindow('bringToFront');
	}
	//evento ventana divVentanaCapHora cuando obtiene el foco
	divVentanaCapHora.on('focus',focoDivVenCapHora);
	function focoDivVenCapHora(e) {
		eficienciaCap.focus();
	}
	//evento cerrar ventana de la ventana divTMVentana
	divTMVentana.on('close',funCerrarVentanaDivTMVentana);
	function funCerrarVentanaDivTMVentana(e) {
		// cantidadEmp.focus();
		divVentanaCapHora.jqxWindow('focus');
	}
	divVentanaCapHora.on('open',funAbrirVentanaDivCapHora);
	function funAbrirVentanaDivCapHora(e) {
		cantidadEmp.val(0);
		tPar.val(60);
		eficienciaCap.val(0);
		tmMinCap.val(0);
		spanNumEmpleadoCap.html(tdNumEmpleado.html());
		spanHoraCap.html(thRangoHora.html());
		numParteCapFinal=inpNumParteCap.val();
		rateNumParteFinal=spanRateCap.html();
		spanNumParteCap.html(numParteCapFinal);
		spanRateCap2.html(rateNumParteFinal);
		cantidadEmp.focus().select();
		// console.log(e);
	}
	divVentanaCapHora.on('focus',funFocusVentanaDivCapHora);
	function funFocusVentanaDivCapHora(e) {
		cantidadEmp.focus().select();
	}
	divTMVentana.on('open',funOpenVenTM);
	function funOpenVenTM(e) {
		arregloTiempoMuerto=[];
		sumaMinTM=0;
		$.post('captura.php',{pTipoTM:true},dataListTM);
		$('.ttMCap').focus().val("");
		$('.minttMCap').val("");
	}
	//evento cerrar ventana de la ventana divTMVentana
	divTMVentana.on('close',funCerrarVenTM);
	function funCerrarVenTM(e) {
		if (e.args.dialogResult.OK) {
			$('.copiaTM').each(function (index,objeto) {
				var i = $(objeto).children('.ttMCap').val();
				var j = $(objeto).children('.minttMCap').val();
				arregloTiempoMuerto.push([i,j]);
			});
			$.each(arregloTiempoMuerto,function (index,objeto) {
				sumaMinTM+=parseInt(objeto[1])
			});
			tmMinCap.val(sumaMinTM);
			calcEfi();
		}
		if (e.args.dialogResult.Cancel) {
			sumaMinTM=0;
			arregloTiempoMuerto=[];
			if ($('.copiaTM').length>1) {
				$('.copiaTM').each(function (index,objeto) {
					if (index>0) {
						$(objeto).remove();
					}
				});
			}
			$('.ttMCap').val("");
			$('.minttMCap').val("");
			tmMinCap.val(0);
			calcEfi();
		}
		if (e.args.dialogResult.None) {
			sumaMinTM=0;
			arregloTiempoMuerto=[];
			if ($('.copiaTM').length>1) {
				$('.copiaTM').each(function (index,objeto) {
					if (index>0) {
						$(objeto).remove();
					}
				});
			}
			$('.ttMCap').val("");
			$('.minttMCap').val("");
			tmMinCap.val(0);
			calcEfi();
		}
	}
	function dataListTM(datos,status) {
    // console.log(datos);
    var dataListTipoTM=$.parseJSON(datos);
    if (dataListTipoTM.Validacion=="Exito") {
      $('#listTM').html(dataListTipoTM.Datos);
    }
    $('.ttMCap').change(function(e) {
      switch (parseInt(e.target.value)) {
        case 1:
        $(e.target).siblings('.minttMCap').val(20);
        break;
        case 2:
        $(e.target).siblings('.minttMCap').val(40);
        break;
        case 3:
        $(e.target).siblings('.minttMCap').val(5);
        break;
        case 0:
        $(e.target).siblings('.minttMCap').val('');
        break;
        default:
        $(e.target).siblings('.minttMCap').val(0);
      }
    });
    // console.log(dataListTipoTM);
  }
	//evento asociado al botón de submit del formulario de la ventana divVentanaCapHora
	// btnCapPorHora.on('click',clickCaptura);
	// function clickCaptura(e) {
	// 	var h= thRangoHora.attr('data-h');
	// }
	//evento focus inputs de la ventana captura
	cantidadEmp.on('blur',funFocoCantidadEmp);
	tPar.on('blur',funFocoTPar);
	tmMinCap.on('blur',funFocoTmMinCap);

	// Estas son las variables usadas en la captura.
	// var minTrabCap, minTotCap, minTmCap,cantidadProgCap,rateCap,efiCap,cantidadCap;
	function funFocoCantidadEmp(e) {
		calcEfi();
	}
	function funFocoTPar(e) {
		calcEfi();
	}
	function funFocoTmMinCap(e) {
	}

	//función para calcular la eficiecia.
	function calcEfi() {
		minTotCap=tPar.val();
		if (minTotCap<=0) {
			divNotificaciones.html("No puede tener menos de 0 minutos");
			jqxNotiModCap.jqxNotification({template:'error',width:'auto',height:'auto'}).jqxNotification('open');
			tPar.focus().select();
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		minTmCap=tmMinCap.val();
		rateCap=spanRateCap2.text();
		minTrabCap=minTotCap - minTmCap;
		cantidadProgCap=(parseInt(rateCap) * parseInt(minTrabCap))/60;
		cantidadCap=cantidadEmp.val();
		efiCap=(cantidadCap/cantidadProgCap)*100;
		eficienciaCap.val(efiCap.toFixed(2));
	}//fin de la función calcEfi
	formCapPorHora.on('submit',funEnviarForm);
	//función para enviar el formulario para la captura.
	function funEnviarForm(e) {
		var fechaCaptura,fecha;
		fechaCaptura=divFechaCapPost.jqxDateTimeInput('getDate');
		var h = thRangoHora.attr('data-h');
		var horaI  = new Date(), horaF  = new Date();
		var hI,hF,efiCap = eficienciaCap.val();
		horaI.setHours(h);
		horaI.setMinutes(0);
		horaI.setSeconds(0);
		horaF.setHours(h);
		horaF.setMinutes(minTotCap);
		horaF.setSeconds(0);
		hI=obtenerHoraCompleta(horaI);
		hF=obtenerHoraCompleta(horaF);
		fecha=obtenerFecha(fechaCaptura);
		// console.log(detListNumOrd);
		// console.log(detAsis);
		// console.log(hI+"--"+hF+"--"+fecha+"--"+minTmCap+"--"+efiCap+"---"+detListNumOrd+"--"+detAsis+"--"+arregloTiempoMuerto);
		if (efiCap<=0||efiCap>=200) {
			divNotificaciones.html("No puede haber eficiencias menores o igual a 0  (cero) o mayores a 200");
			jqxNotiModCap.jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		//Aquí vamos a enviar el tiempo muerto de la captura
		if (minTmCap>0) {
			$.post({
				url:"php/captura.php",
				dataType:'json',
				data:
				{
					fecha:fecha,
					cantidadCap:cantidadCap,
					hI:hI,
					hF:hF,
					minTmCap:minTmCap,
					efiCap:efiCap,
					detListNumOrd:detListNumOrd,
					detAsis:detAsis,
					pArregloTiempoMuerto:arregloTiempoMuerto
				},
				success:exitoFunCaptura,
				type:'POST',
				error:errorFuncionABtnEmp
			});
		}else{
			//si no hay tiempo muerto pues lo enviamos así, sin el arreglo
			$.post({
				url:"php/captura.php",
				dataType:'json',
				data:
				{
					fecha:fecha,
					cantidadCap:cantidadCap,
					hI:hI,
					hF:hF,
					minTmCap:minTmCap,
					efiCap:efiCap,
					detListNumOrd:detListNumOrd,
					detAsis:detAsis
				},
				success:exitoFunCaptura,
				type:'POST',
				error:errorFuncionABtnEmp
			});
		}
		e.preventDefault();
	}
	function exitoFunCaptura(data) {
		if (data.validacion=="exito") {
			divNotificaciones.html(data.datos);
			$(jqxNotiModCap).jqxNotification({template:'success'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			var td= divVentanaCapHora.data('tdClickeado');
			var efi=$('#eficienciaCap').val();
			var hrTrabTot="",minTMTot="";
			hrTrabTot= (parseInt(minTotCap)/60)+parseFloat(vHrCapTab);
			minTMTot = (parseInt(minTmCap)/60)+parseFloat(vTmCapTab);
			td.text(efi);
			td.siblings('.tmCapTab').text(minTMTot.toFixed(2));
			td.siblings('.hrCapTab').text((hrTrabTot/1).toFixed(2));
			divVentanaCapHora.jqxWindow('close');
			// console.log("HOLAMUNDO2");
			// window.alert("HOLAMUNDO");
		}else if (data.validacion=="error") {
			divNotificaciones.html(data.datos);
			$(jqxNotiModCap).jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		}
	}
	function obtenerHoraCompleta(hora) {
		var horaCompleta,horas,minutos,segundos;
		horas=hora.getHours();
		minutos=hora.getMinutes();
		segundos=hora.getSeconds();
		if (horas<10) {
			horas="0"+horas;
		}
		if (minutos<10) {
			minutos="0"+minutos;
		}
		if (segundos<10) {
			segundos="0"+segundos;
		}
		horaCompleta=horas+":"+minutos+":"+segundos;
		return horaCompleta;
	}
	cantTTM.on('change',copiaTTM);
	function copiaTTM(e) {
		numCopias=e.target.value;
		divCopiaTMCap=copiaTM.clone(true);
		switch (numCopias) {
			case "1":
				if ($('.copiaTM').length>1) {
					$('.copiaTM').each(function (index,objeto) {
						if (index>0) {
							$(objeto).remove();
						}
					});
				}
				break;
			case "2":
				if ($('.copiaTM').length<2) {
					$('.copiaTM').after(divCopiaTMCap);
				}
				if ($('.copiaTM').length>2) {
					$('.copiaTM').each(function (index,objeto) {
						if (index>1) {
							$(objeto).remove();
						}
					});
				}
				break;
			case "3":
				var copias=$('.copiaTM').length;
				if (copias<3) {
					while (copias<3) {
						$('.copiaTM').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			case "4":
				var copias=$('.copiaTM').length;
				if (copias<4) {
					while (copias<4) {
						$('.copiaTM').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			case "5":
				var copias=$('.copiaTM').length;
				if (copias<5) {
					while (copias<5) {
						$('.copiaTM').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			default:
		}
	}//fin de la función copiaTTM
	//inicializamos la ventana de la pregunta
	divVentanaPre.jqxWindow(
		{
		width:'100%',
		height:'50%',
		autoOpen:false,
		maxHeight:'140px',
		maxWidth:'200px',
		minWidth:'10%',
		minHeight:'10%',
		cancelButton: $('#btnCanVenPre'),
		okButton:$('#btnAcepVenPre')
	});
	//iniciamos una ventana para visualizar las capturas
	divVenCapHoraEmp.jqxWindow({
		width:'100%',
		height:'100%',
		autoOpen:true,
		maxHeight:'200px',
		maxWidth:'700px',
		minWidth:'50px',
		minHeight:'80px'
	});
	//eventos relacionados con la ventana de l a pregunta
	divVentanaPre.on('close',eventoCerrar);
	function eventoCerrar(e) {
		if (e.args.dialogResult.OK) {
			//Aquí vamos a programar la otra ventana donde mostrara los resultados de la captura
			divVenCapHoraEmp.jqxWindow('open');
			divVenCapHoraEmp.jqxWindow('bringToFront');
			$.post(
			{
				url:"php/capturaPorEmpleado.php",
				dataType:'json',
				data:
				{
					prueba:"prueba"
				},
				success:exitoMosCap,
				type:'POST',
				error:errorFuncionABtnEmp
			})
		}else if(e.args.dialogResult.Cancel) {
		}
	}
	function exitoMosCap(e) {
		divNotificaciones.html(e);
		console.log(e)
		jqxNotiModCap.jqxNotification(
			{
				template:'error',
				autoClose:true,
				autoCloseDelay:1500
			}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
	}

	//Aquí va ir todo lo relacionado con el parcial de la captura
	divVenPrePar.jqxWindow(
	{
		width:'100%',
		height:'50%',
		autoOpen:false,
		maxHeight:'100px',
		maxWidth:'310px',
		minWidth:'10%',
		minHeight:'10%',
		cancelButton:btnCapPar,
		okButton:btnVerCapPar

	});

	divVentanaCapHoraPar.jqxWindow(
	{
		width:'100%',
		height:'250px',
		autoOpen:false,
		maxHeight:'250px',
		maxWidth:'200px',
		minWidth:'10%',
		minHeight:'50%'
	});
	divTMVentanaPar.jqxWindow(
	{
		width:300,
		height:200,
		autoOpen:false,
		okButton:$('#btnAceptarTMPar'),
		cancelButton:$('#btnCancelTMPar')
	});
	divVenPrePar.on('close',closeWinDivVenPrePar);
	function closeWinDivVenPrePar(e) {
		if (e.args.dialogResult.Cancel) {
			divVentanaCapHoraPar.jqxWindow('open');
			divVentanaCapHoraPar.jqxWindow('bringToFront');
		}
		if (e.args.dialogResult.OK) {
			divVenCapHoraEmp.jqxWindow('open');
			divVenCapHoraEmp.jqxWindow('bringToFront');
		}
	}
	divVentanaCapHoraPar.on('open',abrirVenDivVenCapHoraPar);
	function abrirVenDivVenCapHoraPar(e) {
		//obtenemos el td donde se dio el click
		var numEmpleado,hora,numParte,rate,eficienciaCapAnte,detAsis,indice,fechaDia,indice;
		var tdClick=divVentanaCapHora.data('tdClickeado');
		numEmpleado=tdClick.siblings('.idEmpCap').html();
		spanNumEmpleadoCapPar.html(numEmpleado);
		indice=tdClick.index();
		thRangoHora=tdClick.parent().parent().siblings('thead').children('tr').children('th:nth-child('+(indice+1)+')');
		hora=thRangoHora.html();
		spanHoraCapPar.html(hora);
		spanNumParteCapPar.html(inpNumParteCap.val());
		spanRateCap2Par.html(spanRateCap.html());
		cantidadEmpPar.val(0).focus().select();
		//vamos a ingresar el tiempo
		eficienciaCapAnte=tdClick.html();
		vTmCapTab=tdClick.siblings('.tmCapTab').html();
		vHrCapTab=tdClick.siblings('.hrCapTab').html();
		fechaDia=divFechaCapPost.jqxDateTimeInput('getDate');
		fechaCompletaHoy= obtenerFecha(fechaDia);
		var hora=new Date();
		//cuando buscamos el parcial obtenemos la hora final del último registro, y para la siguiente captura va hacer nuestra hora de inicio.
		horaIPar.html(horaFTPar);
		horaSplit=horaFTPar.split(':');
		hora.setHours(horaSplit[0],horaSplit[1],horaSplit[2]);
		horaIP=hora.getHours();
		minIP=hora.getMinutes();
		segIP=hora.getSeconds();
		if (horaIP<10) {
			horaIP="0"+horaIP;
		}
		if (minIP<10) {
			minIP="0"+minIP;
		}
		if (segIP<10) {
			segIP="0"+segIP;
		}
		//el valor máximo que tendra los minutos parciales de la captura
		difMin=60-parseInt(minIP);
		tParPar.val(difMin);
		//nos va a servir estó para tener la hora final de la captura
		//hora.setMinutes(hora.getMinutes()+difMin);
		/*console.log("minutos: "+ hora.getMinutes()+" horas: "+hora.getHours());
		console.log(parseInt(horaIP));
		console.log(parseInt(minIP));
		console.log(parseInt(segIP));*/
	}
	tmCapPar.on('click',clickTriTmCapPar);
	function clickTriTmCapPar(e) {
		divTMVentanaPar.jqxWindow('open');
		divTMVentanaPar.jqxWindow('bringToFront');
	}
	//toda modificación que se haga en el tiempo muerto del tiempo parcial se deberá realizar en el tiempo muerto sin parcial.
	divTMVentanaPar.on('open',openDivTMVenPar);
	function openDivTMVenPar(e) {
		arregloTiempoMuerto=[];
		sumaMinTM=0;
		$.post('captura.php',{pTipoTM:true},dataListTMPar);
		$('.ttMCapPar').focus().select().val("");
		$('.minttMCapPar').val("");
	}
	function dataListTMPar(datos,status) {
		var dataListTipoTM=$.parseJSON(datos);
		if (dataListTipoTM.Validacion=="Exito") {
			$('#listTMPar').html(dataListTipoTM.Datos);
		}
		$('.ttMCapPar').change(function(e) {
			switch (parseInt(e.target.value)) {
				case 1:
		        $(e.target).siblings('.minttMCapPar').val(20);
		        break;
		        case 2:
		        $(e.target).siblings('.minttMCapPar').val(40);
		        break;
		        case 3:
		        $(e.target).siblings('.minttMCapPar').val(5);
		        break;
		        case 0:
		        $(e.target).siblings('.minttMCapPar').val('');
		        break;
		        default:
		        $(e.target).siblings('.minttMCapPar').val(0);
		    }
		});
	}
	cantTTMPar.on('change',changeCantTTM);
	function changeCantTTM(e) {
		numCopias=e.target.value;
		divCopiaTMCap=copiaTMPar.clone(true);
		switch (numCopias) {
			case "1":
				if ($('.copiaTMPar').length>1) {
					$('.copiaTMPar').each(function (index,objeto) {
						if (index>0) {
							$(objeto).remove();
						}
					});
				}
				break;
			case "2":
				if ($('.copiaTMPar').length<2) {
					$('.copiaTMPar').after(divCopiaTMCap);
				}
				if ($('.copiaTMPar').length>2) {
					$('.copiaTMPar').each(function (index,objeto) {
						if (index>1) {
							$(objeto).remove();
						}
					});
				}
				break;
			case "3":
				var copias=$('.copiaTMPar').length;
				if (copias<3) {
					while (copias<3) {
						$('.copiaTMPar').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			case "4":
				var copias=$('.copiaTMPar').length;
				if (copias<4) {
					while (copias<4) {
						$('.copiaTMPar').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			case "5":
				var copias=$('.copiaTMPar').length;
				if (copias<5) {
					while (copias<5) {
						$('.copiaTMPar').last().after(divCopiaTMCap);
						copias++;
					}
				}
				break;
			default:
		}
	}
	divTMVentanaPar.on('close',closeDivTMVenPar);
	function closeDivTMVenPar(e) {
		if (e.args.dialogResult.OK) {
			$('.copiaTMPar').each(function (index,objeto) {
				var i = $(objeto).children('.ttMCapPar').val();
				var j = $(objeto).children('.minttMCapPar').val();
				arregloTiempoMuerto.push([i,j]);
			});
			$.each(arregloTiempoMuerto,function (index,objeto) {
				sumaMinTM+=parseInt(objeto[1]);
			});
			tmMinCapPar.val(sumaMinTM);
		}
		if (sumaMinTM<=minTotCap) {

		}
		if (e.args.dialogResult.Cancel) {
			sumaMinTM=0;
			arregloTiempoMuerto=[];
			if ($('.copiaTMPar').length>1) {
				$('.copiaTMPar').each(function (index,objeto) {
					if (index>0) {
						$(objeto).remove();
					}
				});
			}
			$('.ttMCapPar').val("");
			$('.minttMCapPar').val("");
			tmMinCapPar.val(0);
		}
		divVentanaCapHoraPar.jqxWindow('focus');
	}
	divVentanaCapHoraPar.on('focus',funFocusVentanaDivCapHora);
	function funFocusVentanaDivCapHora(e) {
		cantidadEmpPar.focus().select();
	}
	cantidadEmpPar.on('keyup blur',evtCantidadEmpPar);
	function evtCantidadEmpPar(e) {
		//ERROR cada vez que el input esta vaciO o tiene valor 0 muestra el mensaje de error
		var lonCad="";
		var tipoVar="";
		var cantidad="";
		if (e.type=="keyup") {
			lonCad=$(this).val().length
			tipoVar=$(this).val()*1;
			cantidad=$(this).val();
			if (!isNaN(tipoVar)&&(lonCad>0&&lonCad<6)&&parseInt(cantidad)>0) {
				calcEfiPar();
			}else{
				errorCalcEfi($(this),e.type)
			}
		}
		else if (e.type=="blur") {
			lonCad=$(this).val().length;
			tipoVar=$(this).val()*1;
			cantidad=$(this).val();
			if (!isNaN(tipoVar)&&(lonCad>0&&lonCad<6)&&parseInt(cantidad)>0) {
				calcEfiPar();
			}else if (!isNaN(tipoVar)&&(lonCad>1&&lonCad<6)){
				errorCalcEfi($(this),e.type)
			}
		}
	}
	tParPar.on('blur keyup',evtTParPar);
	function evtTParPar(e) {
		var tParParMin=$(this).val();
		if (tParParMin>difMin) {
		divNotificaciones.html("El tiempo parcial actual no puede ser mayor el tiempo parcial  " + difMin);
		jqxNotiModCap.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		$(this).val(difMin);
		calcEfiPar();
		return false;
		}
		if (isNaN(tParParMin*1)) {
			divNotificaciones.html("no se acepta letras o caracteres especiales");
			jqxNotiModCap.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1500}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		$(this).val(difMin);
		return false;
		}
		if (tParParMin.length<0||tParParMin==0) {
			return false;
		}
		calcEfiPar()
	}
	tmMinCapPar.on('blur',evtTmMinCapPar);
	function evtTmMinCapPar(e) {
		//console.log(e);
	}
	//variables usadas para el calculo de la eficiencia y despues de la eficiencia.

	function calcEfiPar() {
		minTotCap=tParPar.val();
		tmMinCapPar.val();
		minTmCap=tmMinCapPar.val();
		rateCap=spanRateCap2Par.text();
		minTrabCap=minTotCap - minTmCap;
		cantidadProgCap=(parseInt(rateCap) * parseInt(minTrabCap))/60;
		cantidadCap=cantidadEmpPar.val();
		efiCap=(cantidadCap/cantidadProgCap)*100;
		eficienciaCapPar.val(efiCap.toFixed(2));
	}
	function errorCalcEfi(objeto,evento) {
		if (evento=="blur") {
			objeto.val(0).focus().select();
		}
		divNotificaciones.html("Cantidad no valida");
		jqxNotiModCap.jqxNotification({template:'error',autoClose:true,autoCloseDelay:1000}).jqxNotification('open');
		$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
	}
	//submit de la captura de eficiencia
	formCapPorHoraPar.on('submit',funEnviarFormPar);
	//función para enviar el formulario para la captura.
	function funEnviarFormPar(e) {
		var fechaCaptura,fecha;
		fechaCaptura=divFechaCapPost.jqxDateTimeInput('getDate');
		var horaF  = new Date();
		var hI=$('#horaIPar').text(),hF,efiCap = eficienciaCapPar.val();
		//variable que contiene los minutos del tiempo parcial
		var tPCapPar=$('#tParPar').val();
		//dividir la el tiempo parcial en un arreglo, para determinar la hora final de la captura
		var tPArray=hI.split(':');
		horaF.setHours(tPArray[0]);
		horaF.setMinutes(parseInt(tPCapPar)+parseInt(tPArray[1]));
		horaF.setSeconds(0);
		hF=obtenerHoraCompleta(horaF);
		fecha=obtenerFecha(fechaCaptura);
		if (efiCap<=0||efiCap>=200) {
			divNotificaciones.html("No puede haber eficiencias menores o igual a 0  (cero) o mayores a 200");
			jqxNotiModCap.jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			return false;
		}
		console.log(fecha+" "+cantidadCap+" "+hI+" "+hF+" "+minTmCap+" "+efiCap+" "+detListNumOrd+" "+detAsis);
		console.log(arregloTiempoMuerto);
		//Aquí vamos a enviar el tiempo muerto de la captura
		if (minTmCap>0) {
			$.post({
				url:"php/captura.php",
				dataType:'json',
				data:
				{
					fecha:fecha,
					cantidadCap:cantidadCap,
					hI:hI,
					hF:hF,
					minTmCap:minTmCap,
					efiCap:efiCap,
					detListNumOrd:detListNumOrd,
					detAsis:detAsis,
					pArregloTiempoMuerto:arregloTiempoMuerto
				},
				success:exitoFunCapturaPar,
				type:'POST',
				error:errorFuncionABtnEmp
			});
		}else{
			//si no hay tiempo muerto  lo enviamos así, sin el arreglo
			$.post({
				url:"php/captura.php",
				dataType:'json',
				data:
				{
					fecha:fecha,
					cantidadCap:cantidadCap,
					hI:hI,
					hF:hF,
					minTmCap:minTmCap,
					efiCap:efiCap,
					detListNumOrd:detListNumOrd,
					detAsis:detAsis
				},
				success:exitoFunCapturaPar,
				type:'POST',
				error:errorFuncionABtnEmp
			});
		}
		e.preventDefault();
	}
	//función despues de haber realizado la captura del tiempo parcial
	function exitoFunCapturaPar(data) {
		if (data.validacion=="exito") {
			divNotificaciones.html(data.datos);
			$(jqxNotiModCap).jqxNotification({template:'success'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
			var td= divVentanaCapHora.data('tdClickeado');
			var efi=$('#eficienciaCapPar').val();
			var efiPar=td.text();
			efi=(parseFloat(efi)+parseFloat(efiPar))/2;
			var hrTrabTot="",minTMTot="";
			hrTrabTot= (parseInt(minTotCap)/60)+parseFloat(vHrCapTab);
			minTMTot = (parseInt(minTmCap)/60)+parseFloat(vTmCapTab);
			td.text(efi);
			td.siblings('.tmCapTab').text(minTMTot.toFixed(2));
			td.siblings('.hrCapTab').text((hrTrabTot/1).toFixed(2));
			divVentanaCapHoraPar.jqxWindow('close');
		}else if (data.validacion=="error") {
			divNotificaciones.html(data.datos);
			$(jqxNotiModCap).jqxNotification({template:'error'}).jqxNotification('open');
			$('#jqxNotificationDefaultContainer-top-right').css({'z-index':zInd});
		}
	}
	//Aquí termina todo lo relacionado con el parcial de la captura
	//AjaxSetup
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
	});//Aquí termina la función ajaxSetup

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
