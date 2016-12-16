$(document).ready(Principal);
function Principal() {
  //variables declaradas
  var cadenaNumEmpleado,cadenaNomEmpleado,cadenaApeEmpleado;
  var inputTypeText=$('div>input[type="text"]');
  var inputNumEmpleado=$('input[name="numEmpleado"]');
  var inputNomEmpleado=$('input[name="nombreEmpleado"]');
  var inputApeEmpleado=$('input[name="apellidoEmpleado"]');
  // var alertAltaEmple;
  $('.nav-tabs a').on('click',function() {
    $(this).tab('show');
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
  $('form').on('submit',function (e) {
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
  //Aquí vamos a usar la libreria de jqwidget en la tabla de empleados
  // prepare the data
  var theme='classic';
   var source =
   {
       datatype: "json",
       datafields:
       [
         { name: 'idempleados',type:'string' },
         { name: 'nombre',type:'string' },
         { name: 'apellidos',type:'string' },
         { name: 'estado',type:'int' }
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
         console.log(data);
        //  console.log("Completado con exito");
       },
       loadError:function (xhr, status, error) {
         window.alert("conexion fallida con el servidor, intente de nuevo");
       }
     });
   $("#jqxgridEmpleados").jqxGrid({
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
   });
}
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
