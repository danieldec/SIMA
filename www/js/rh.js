$(document).ready(Principal);
function Principal() {
  //variables declaradas
  var cadenaNumEmpleado,cadenaNomEmpleado,cadenaApeEmpleado;
  var inputTypeText=$('div>input[type="text"]');
  var inputNumEmpleado=$('input[name="numEmpleado"]');
  var inputNomEmpleado=$('input[name="nombreEmpleado"]');
  var inputApeEmpleado=$('input[name="apellidoEmpleado"]');
  var formUsu = $('#formUsu');
  var formAltaEmpleados = $('#formAltaEmpleados');
  var numEmp = $('#numEmp');
  var jqxNotRh = $('#jqxNotRh');
  var jqxNotRhContent = $('#jqxNotRhContent');
  var altaEmpleados = $('#altaEmpleados');
  var empleadosTabla = $('#empleadosTabla');
  var venEditEmp = $('#venEditEmp');
  var formEditNumEmp = $('#formEditNumEmp');
  var divFechaI = $('#divFechaI');
  var divFechaF = $('#divFechaF');
  // var alertAltaEmple;
  $('.nav-tabs a').on('click',function(e) {
    $(this).tab('show');
    if ($(this).text()=="USUARIOS") {
      $("#nombreU").val('').focus();
      $('#contrasenaU').val('');
      $('#numEmp').val("");
      $($('#perfilU>option')['0']).prop('selected','selected');
    }
  });
  venEditEmp.jqxWindow(
    {
      width:'300px',
      height:'380px',
      autoOpen:false,
      showCollapseButton:true
    });
  //gadget reloj del jqxWidget
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
    });
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
    });
  //convertir cadena de texto en mayusculas del input
  inputTypeText.each(function () {
    $(this).bind('keyup blur focus',function() {
      if ($(this).prop('name')==inputNumEmpleado.prop('name')) {
        cadenaNumEmpleado=$(this).val().toUpperCase();
      }
      if ($(this).prop('name')==inputNomEmpleado.prop('name')) {
        cadenaNomEmpleado=$(this).val().toUpperCase();
      }
      if ($(this).prop('name')==inputApeEmpleado.prop('name')) {
        cadenaApeEmpleado=$(this).val().toUpperCase();
      }
    });
  });
  //insertar usuario a través de ajax
  formAltaEmpleados.on('submit',function (e) {
    inputNumEmpleado.val(cadenaNumEmpleado);
    inputNomEmpleado.val(cadenaNomEmpleado);
    inputApeEmpleado.val(cadenaApeEmpleado)
    var numEmpleado=inputNumEmpleado.val() ;
    var nombreEmpleado=inputNomEmpleado.val();
    var apeEmpleado=inputApeEmpleado.val();
    $.post('altasEmpleado.php',
      {
        pnumEmpleado:numEmpleado,
        pnombreEmpleado:nombreEmpleado,
        papeEmpleado:apeEmpleado
      },
      function(data,status) {
        var tipoMensaje=data.charAt(0);
        var mensajeMostrar=data.slice(1,data.length);
        //console.log(tipoMensaje +" : "+ mensajeMostrar);
        var mensaje=$('#formAltaEmpleados');
        var numeroHijos=mensaje.children('div').size();
        if (tipoMensaje=="E") {
          //console.log(mensaje);
          var mensajeHtml='<div class="alert alert-danger alert-dismissible fade in" role="alert" id="alertAltaEmple"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span haria-hidden="true">&times;</span></button>'+mensajeMostrar+'</div>';
          if (numeroHijos<=3) {
            mensaje.append(mensajeHtml);
          }
          if (numeroHijos>3) {
            $('#formAltaEmpleados>div.alert.alert-danger').remove();
            $('#formAltaEmpleados>div.alert.alert-success').remove();
            mensaje.append(mensajeHtml);
          }
        }
        if (tipoMensaje=="S") {
          var mensajeHtml='<div class="alert alert-success alert-dismissible fade in" role="alert" id="alertAltaEmple"><button type="button" data-dismiss="alert" aria-label="Close" class="close"><span haria-hidden="true">&times;</span></button>'+mensajeMostrar+'</div>';
          if (numeroHijos<=3) {
            mensaje.append(mensajeHtml);
          }
          if (numeroHijos>3) {
            $('#formAltaEmpleados>div.alert.alert-danger').remove();
            $('#formAltaEmpleados>div.alert.alert-success').remove();
            mensaje.append(mensajeHtml);
          }
          inputTypeText.each(function() {
            $(this).val("");
            //console.log(this);
          });
          $('#inpNumEmpleado').focus();
          //alertAltaEmple=$('#alertAltaEmple');
        }
      }
    )
    e.preventDefault();
  });
  //evento modal cuando se abre
  altaEmpleados.on('shown.bs.modal',function() {
    $('#inpNumEmpleado').focus();
  });
  function actualizaTabEmp() {
    $.post({
      url:'php/empleados.php',
      dataType:'json',
      data:{numEmpleado:true},
      success:exitoTablaEmpleado,
      type:'POST',
      error:errorFuncionAjax
    });
  }//fin de la función actualizar tabla
  function exitoTablaEmpleado(data,x,y) {
    if (data.validacion=="exito") {
      tablaPlug(data);
    }else if (data.validacion=="error") {
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRhContent.html(data.datos);
      jqxNotRh.jqxNotification('open');
    }
  }//fin de la función exitoTablaEmpleados
  function tablaPlug(data) {
    empleadosTabla.DataTable().destroy();
    empleadosTabla.children('tbody').html(data.datos);
    empleadosTabla.DataTable({
      "language":{
        "url":"../../json/Spanish.json",
      },
      stateSave: true
    });
  }
  //evento botón editar empleado.
  empleadosTabla.on('click','.btnEditEmp',evtClickBtn);
  function evtClickBtn(e) {
    var coordenadasBtn= $(this).position();
    var coorX=$('#divConFluidTaEmp').outerWidth();
    var venOpen = venEditEmp.jqxWindow(
      {
        position:
        {
          x: coorX+10,
          y: coordenadasBtn.top+80
        }
      });
    if (venOpen) {
      venEditEmp.jqxWindow('close');
      venEditEmp.jqxWindow('open');
    }else{
      venEditEmp.jqxWindow('open');
    }
    var numEmp = $(this).parent().siblings('.idEmp').text();
    var nombreEmp = $(this).parent().siblings('.nom').text();
    var apellEmp = $(this).parent().siblings('.ape').text();
    var estado = $(this).parent().siblings('.est').text();
    venEditEmp.data(
      {
        numEmp:numEmp,
        nombreEmp:nombreEmp,
        apellEmp:apellEmp,
        estado:estado
      });
  }//fin de la función evtClickBtn
  //eventos ventana venEditEmp cuando se abre o cierra
  venEditEmp.on('close open',venEditEmpOpenOClose);
  function venEditEmpOpenOClose(e) {
    if (e.type=="close") {

    }
    else if (e.type=="open") {
      $('#nombreEmpEdit').val(venEditEmp.data('nombreEmp'));
      $('#apellEmpEdit').val(venEditEmp.data('apellEmp'));
      $('#numEmpEdit').val(venEditEmp.data('numEmp')).focus();
      $('#editEstadoEdit').val(venEditEmp.data('estado'));
      $('#editEstadoEdit').removeAttr('checked');
      //nos va a indicar si es baja o alta.
      var estado = venEditEmp.data('estado');
      if (estado==1) {
        $('#spanEstado').text("Baja");
      }//fin del if
      else if (estado==0) {
        $('#spanEstado').text("Alta");
      }//fin del else if
    }//fin del else

  }//fin de la función
  formEditNumEmp.on('submit',submEditEmp);
  function submEditEmp(e) {
    e.preventDefault();
    var numEmpSubmit = $('#numEmpEdit').val();
    var nomEmpSubmit = $('#nombreEmpEdit').val();
    var apellSubmit = $('#apellEmpEdit').val();
    var estadoSubmit = $('#editEstadoEdit').val();
    $('#editEstadoEdit').val(venEditEmp.data('estado'));
    if ( numEmpSubmit == venEditEmp.data('numEmp') && nomEmpSubmit==venEditEmp.data('nombreEmp') &&  apellSubmit == venEditEmp.data('apellEmp') && estadoSubmit == venEditEmp.data('estado')) {
      return false;
    }//fin del if
    else{
      var datos = $(this).serialize();
      if (numEmpSubmit != venEditEmp.data('numEmp')) {
        $.post(
          {
            url:'php/empleados.php',
            dataType:'json',
            data:{numEmpleadoEdit:true,datos:datos,numEmpSubmit:venEditEmp.data('numEmp')},
            success:exitoEditEmpleado,
            type:'POST',
            error:errorFuncionAjax,
          });
      }else{
        $.post(
          {
            url:'php/empleados.php',
            dataType:'json',
            data:{numEmpleadoEdit:true,datos:datos},
            success:exitoEditEmpleado,
            type:'POST',
            error:errorFuncionAjax
          });
      }
    }//fin del else if
  }//fin de la función submEditEmp
  function exitoEditEmpleado(datos,x,y) {
    if (datos.validacion=="exito") {
      jqxNotRhContent.html(datos.datos);
      jqxNotRh.jqxNotification({template:'success',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
      venEditEmp.jqxWindow('close');
      actualizaTabEmp();
    }
    else if (datos.validacion=="error") {
      jqxNotRhContent.html(datos.datos);
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
    }
  }//fin de la función exitoEditEmpleado
  $('#editEstadoEdit').on('change',evtChangeChecbox);
  function evtChangeChecbox(e) {
    var estado = $(this).val();
    if (estado == 0 && $('#spanEstado').text() == "Alta") {
      $(this).val(1);
    }else if (estado==1 && $('#spanEstado').text() == "Alta") {
      $(this).val(0);
    }
    if (estado == 1 && $('#spanEstado').text() == "Baja") {
      $(this).val(0);
    }else if (estado == 0 && $('#spanEstado').text() == "Baja") {
      $(this).val(1);
    }
  }//fin de la función evtChangeChecbox
  actualizaTabEmp();
  /*
  //empieza el listado de los empleado
  $('#btnListaE').on('click',function () {
    $.post('empleadosME.php',
      {
      }
      ,function(data, status) {
        $('#listaEmpleados').html(data,document);
        funcionRegargar();
      }
    )
  });
  //esta función nos sirve para modificar o eliminar a un empleado
  var funcionRegargar = function() {
    var numEmpleadoE;
    var nomEmpleadoE;
    var apeEmpleadoE;
    $("tr>td>button").on('click',function() {
      var inputSelecionado=$(this).parent().prevAll();
      // original var inputSelecionado=$(this).parent().prevAll().children('input');
      // console.log($(this).attr("id"));
    	// console.log($(this).text()+"\nel método.html(): "+$(this).html());
    	if ($(this).text()==" Modificar") {
        numEmpleadoE=inputSelecionado.children('input:eq(2)').val();
        //nomEmpleadoE=inputSelecionado.children('input:eq(1)').val();
        //apeEmpleadoE=inputSelecionado.children('input:eq(0)').val();
    		$(this).html('<span class="glyphicon glyphicon-floppy-disk"></span> Guardar');
        inputSelecionado.children('input').removeAttr('disabled');
    		return;
    	}
    	if ($(this).text()==" Guardar") {
        var numEmpleadoAux=inputSelecionado.children('input:eq(2)').val().toUpperCase();
        var nomEmpleadoAux=inputSelecionado.children('input:eq(1)').val().toUpperCase();
        var apeEmpleadoAux=inputSelecionado.children('input:eq(0)').val().toUpperCase();
        //console.log(numEmpleadoAux + nomEmpleadoAux+ apeEmpleadoAux);
        //console.log(numEmpleadoE+nomEmpleadoE+apeEmpleadoE);
        $.post('modElimEmpleado.php',
        {
          pNumEmpleado:numEmpleadoE,
          pnumEmpleadoAux:numEmpleadoAux,
          pNomEmpleado:nomEmpleadoAux,
          pApeEmpleado:apeEmpleadoAux,
          pModificar:"modificar"
        }
        ,function (data, status) {
          window.alert('registro: '+ data + status)
        }
      );
        inputSelecionado.children('input').attr('disabled','');
        $(this).html('<span class="glyphicon glyphicon-pencil"></span> Modificar');
    	}
      //eliminar a un empleado
      if ($(this).text()==" Eliminar") {
        var numEmpleado=inputSelecionado.children('input:eq(2)').val().toUpperCase();
        var confirmacion=window.confirm("¿estas seguro que quieres eliminar a este empleado?");
        if (confirmacion) {
          $.post('modElimEmpleado.php',
          {
            pnumEmpleado:numEmpleado,
            pEliminar:"eliminar"
          },function(data,status) {
            if (data=="Eliminado") {
              alert(data)
              inputSelecionado.parent().remove();
            }else{
              alert(data)
            }
          })
        }else{
          return;
        }
      }

    });
  };*/
  $('#aCerrarSesion').on('click',function(e) {
    var r= window.confirm("¿Estas seguro que quieres salir?");
    if (r) {
      return true;
    }else{
      e.preventDefault();
    }
  });
  /*
  //Aquí vamos a usar la libreria de jqwidget en la tabla de empleados
  // prepare the data
  var theme='classic';
  var source =
  {
    datatype: "json",
    datafields:
      [
        { name: 'idempleados',type:'string'},
        { name: 'nombre',type:'string'},
        { name: 'apellidos',type:'string'},
        { name: 'estado',type:'int'}
      ],
    cache:false,
    url: 'empleados.php',
    type:'POST',
    root:'Rows',
    beforeprocessing:function(data) {
      source.totalrecords=data[0].TotalRows;
    },
    sort:function () {
      $('#jqxgridEmpleados').jqxGrid('updatebounddata','sort');
    }
  };
  var dataAdapter=new $.jqx.dataAdapter(source,
    {
      loadComplete:function (data) {
        //console.log(data);
        //  console.log("Completado con exito");
      },
      loadError:function (xhr, status, error) {
        window.alert("conexion fallida con el servidor, intente de nuevo");
      }
    });
  $("#jqxgridEmpleados").jqxGrid(
    {
      width:'100%',
      source: dataAdapter,
      theme: theme,
      autoheight:true,
      editable:true,
      pageable:true,
      virtualmode:true,
      sortable: true,
      columnsresize: true,
      altRows:true,
      rendergridrows:function(obj) {
        return obj.data;
      },
      columns:
       [
         { text: '# empleado', datafield: 'idempleados', width: '20%' },
         { text: 'Nombre', datafield: 'nombre', width: '35%' },
         { text: 'Apellidos', datafield: 'apellidos', width: '35%' },
         { text: 'Estado', datafield: 'estado', width: '10%', columntype:'checkbox' },
       ]
     });
  $("#excelExport").jqxButton();
  $("#excelExport").click(function () {
     $("#jqxgridEmpleados").jqxGrid('exportdata', 'xls','empleados','UTF-8');
   });*/
  //autocomplete del número de empleado.
  numEmp.autocomplete(
  {
    source:listEmp,
    minLength:2,
    select: function(event,ui) {

    }
  });
  function listEmp(request,response) {
    // console.log(request.term);
    $.post(
    {
      url:'php/listaEmpleados.php',
      dataType:'json',
      data:{mosNumEmpl:true,numEmp:request.term},
      success:function(data) {
        response(data);
      },
      type:'POST',
      error:errorFuncionAjax
    });
  }//fin de la función listEmp
  //formulario submit
  formUsu.on('submit',funFormUsu);
  function funFormUsu(e) {
    var nombreUCad=$('#nombreU').val(),numEmpCad=$('#numEmp').val();
    $('#nombreU').val(nombreUCad.toUpperCase());
    $('#numEmp').val(numEmpCad.toUpperCase());
    var datosForm =$(this).serialize();
    $.post(
    {
      url:'php/insertarUsuario.php',
      dataType:'json',
      data:{datosForm:datosForm},
      success:exitoInsertarUsu,
      type:'POST',
      error:errorFuncionAjax
    });
    e.preventDefault();
  }//fin de la función funFormUsu
  function exitoInsertarUsu(data,x,y) {
    if (data.validacion=="exito") {
      $("#nombreU").val('');
      $('#contrasenaU').val('');
      $('#numEmp').val("");
      $($('#perfilU>option')['0']).prop('selected','selected');
      jqxNotRhContent.html(data.datos);
      jqxNotRh.jqxNotification({template:'success',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
    }else if (data.validacion="error") {
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRhContent.html(data.datos);
      jqxNotRh.jqxNotification('open');
    }
  }//fin de la funcion exitoInsertarUsu
  //eventos, variables funciones, relacionado con la eficiencia de la captura
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
    console.log(tablaEfiCap.children('tbody').html().length)
    console.log(tablaEfiCap.children('thead').html().length)
    if (tablaEfiCap.children('tbody').html().length>0 && tablaEfiCap.children('thead').html().length>0) {
      $('#tablaEfiCap').DataTable().destroy();
    }
    var valRadBtn = $("input[name='tipoConsul']:checked").val();
    var fechaIB = divFechaI.jqxDateTimeInput('getDate');
    var fechaFB = divFechaF.jqxDateTimeInput('getDate');
    //console.log(fechaIB);
    //console.log(fechaFB);
    if (fechaIB == null || fechaFB == null) {
      jqxNotRhContent.html("Se deben llenar los campos de la fecha");
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
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
            url:'php/consultaEfi.php',
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
            error:errorFuncionAjax
          });
        //console.log($(this).serialize());
      }
      if (valRadBtn=="e") {
        $.post(
          {
            url:'php/consultaEfi.php',
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
            error:errorFuncionAjax
          });
        console.log("vamos a consultar eficiencia por empleado");
        console.log($(this).serialize());
      }
    }else{
      if (rangoDias>6) {
        tablaEfiCap.children('thead').html("");
        tablaEfiCap.children('tbody').html("");
        jqxNotRhContent.html("La selección de las fechas debe ser menor a 7 días");
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }else{
        jqxNotRhContent.html("La fecha inicio debe ser menor a la fecha final");
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }
    }
    e.preventDefault();
  }//fin de la función evtSubForB;
  function exitFormConsulta(datos,x,y) {
    console.log(datos);
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
        jqxNotRhContent.html(datos.datos);
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }else if(datos.errorC==1){
        jqxNotRhContent.html(datos.datos);
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }else{
        jqxNotRhContent.html("No se encontraron registros");
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }
      tablaEfiCap.children('thead').html("");
      tablaEfiCap.children('tbody').html("");
      //$('#tablaEfiCap').DataTable().clear().draw();
    }
  }
  //Aquí estaran todas las variables, eventos y funciones del reporte de entrenamiento
  var formRepEnt = $('#formRepEnt');
  var divFechaIRE = $('#divFechaIRE');
  var divFechaFRE = $('#divFechaFRE');
  var tablaRepEnt = $('#tablaRepEnt');
  var fechaIFormRE="";
  var fechaFFormRE="";
  divFechaIRE.jqxDateTimeInput(
    {
      width:'150px',
      height:'25px',
      culture:'es-ES',
      formatString:'d',
      showFooter:true,
      clearString:'Limpiar',
      todayString:'Hoy',
      showWeekNumbers:true
    });
  divFechaFRE.jqxDateTimeInput(
    {
      width:'150px',
      height:'25px',
      culture:'es-ES',
      formatString:'d',
      showFooter:true,
      clearString:'Limpiar',
      todayString:'Hoy',
      showWeekNumbers:true
    });
  //evento submit del formulario
  formRepEnt.on('submit',evtSubRepEnt);
  function evtSubRepEnt(e) {
    var fechaIB = divFechaIRE.jqxDateTimeInput('getDate');
    var fechaFB = divFechaFRE.jqxDateTimeInput('getDate');
    if (fechaIB == null || fechaFB == null) {
      jqxNotRhContent.html("Se deben llenar los campos de la fecha");
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
      return false;
    }
    //ESTAS DOS VARIABLES PASARAN A SER GLOBALES POR QUE LAS VOY A USAR EN EL NOMBRE DEL REPORTE
    fechaIFormRE = obtenerFecha(fechaIB);
    fechaFFormRE = obtenerFecha(fechaFB);
    var rangoDias= ((((fechaFB.valueOf()-fechaIB.valueOf())/1000)/24)/60)/60;
    if(rangoDias>=0&&rangoDias<=6){
      $.post(
          {
            url:'php/reporteEnt.php',
            dataType:'json',
            data:
            {
             fechaIForm:fechaIFormRE,
             fechaFForm:fechaFFormRE,
             dias:rangoDias,
             repEnt:true
            },
            success:exFormRepEnt,
            type:'POST',
            error:errorFuncionAjax
          });
    }//fin del if
    else{
      if (rangoDias>6) {
        tablaEfiCap.children('thead').html("");
        tablaEfiCap.children('tbody').html("");
        jqxNotRhContent.html("La selección de las fechas debe ser menor a 7 días");
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }
      else{
        jqxNotRhContent.html("La fecha inicio debe ser menor a la fecha final");
        jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotRh.jqxNotification('open');
      }
    }
    e.preventDefault();
  }

  //función exito del formulario
  function exFormRepEnt(datos,x,y) {
    if (datos.validacion=="exito") {
      tablaRepEnt.DataTable().destroy();
      tablaRepEnt.children('tbody').html(datos.datos);
      tablaRepEnt.DataTable(
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
              title:'dia(s) '+fechaIFormRE+' al '+fechaFFormRE
            },
            {
              extend:'pdfHtml5',
              title:'dia(s) '+fechaIFormRE+' al '+fechaFFormRE
            },
            'print'
          ]
        });
        console.log(fechaIFormRE);
        console.log(fechaFFormRE);
    }else if (datos.validacion="error") {
      jqxNotRhContent.html(datos.datos);
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotRh.jqxNotification('open');
    }
  }
  //función para obtener fecha
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

  //inicializamos la notificaciones que vamos a mostrar al usuario cuando suceda un evento de error o de exito en alguna transacción realizada.
  jqxNotRh.jqxNotification({template:'error',width:'auto',height:'auto'});
  //función error AJAX
  function errorFuncionAjax(jqXHR,textStatus,errorThrown) {
    if (jqXHR.status == 0) {
      jqxNotRhContent.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
      jqxNotRh.jqxNotification({template:'error',width:'300px',height:'auto',autoClose: false});
      jqxNotRh.jqxNotification('open');
      return false;
    }
    var errorPHP=jqXHR.responseText;
    //Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
    jqxNotRhContent.html(textStatus);
    jqxNotRh.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
    jqxNotRhContent.html(errorPHP);
    jqxNotRh.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
    jqxNotRhContent.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
    jqxNotRh.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
  }//fin de la función errorFuncionAjax

}//fin de la función Principal
/*
Primer paso pedir  ayuda.
Ser mejor persona en todo.
Respetar a mi esposa.
Decir no puedo :(.
Decir no.
Aprender de mis errores.
Hablar con mi maestra.

Voy a llorar porque tengo frio en mi cuerpecito, que mala leche, ahorita tengo ganas de dormir en mi camita con unnas cobijas y estar viendo videos o una pelicula o la televisión en mi cuarto y quedarme dormido si es posible y despertar y que todo ya este resuelto y volver a mi cama a dormir.*/
//recorrer los elemento de un mismo tipo de selector
//$('div>input[type="text"]').each(function (index) {
//   console.log(index+": " +$(this).val());
// })
