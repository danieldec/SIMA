$(document).on('ready',principal);
function principal() {
  //Aquí estaran todas las variables, eventos y funciones del reporte de entrenamiento
  var formRepEnt = $('#formRepEnt');
  var divFechaIRE = $('#divFechaIRE');
  var divFechaFRE = $('#divFechaFRE');
  var tablaRepEnt = $('#tablaRepEnt');
  var fechaIFormRE="";
  var fechaFFormRE="";
  var jqxNotE = $('#jqxNotE')
  var jqxNotEContent = $('#jqxNotEContent')
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
      jqxNotEContent.html("Se deben llenar los campos de la fecha");
      jqxNotE.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotE.jqxNotification('open');
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
        jqxNotEContent.html("La selección de las fechas debe ser menor a 7 días");
        jqxNotE.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotE.jqxNotification('open');
      }
      else{
        jqxNotEContent.html("La fecha inicio debe ser menor a la fecha final");
        jqxNotE.jqxNotification({template:'error',width:'300px',height:'auto'});
        jqxNotE.jqxNotification('open');
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
      jqxNotEContent.html(datos.datos);
      jqxNotE.jqxNotification({template:'error',width:'300px',height:'auto'});
      jqxNotE.jqxNotification('open');
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
  jqxNotE.jqxNotification({template:'error',width:'auto',height:'auto'});
  //función error AJAX
  function errorFuncionAjax(jqXHR,textStatus,errorThrown) {
    if (jqXHR.status == 0) {
      jqxNotEContent.html("No hay conexión con el servidor, por favor intente más tarde o llame al administrador");
      jqxNotE.jqxNotification({template:'error',width:'300px',height:'auto',autoClose: false});
      jqxNotE.jqxNotification('open');
      return false;
    }
    var errorPHP=jqXHR.responseText;
    //Aquí vamos a capturar el error que nos arroje ya sea javascript, como php
    jqxNotEContent.html(textStatus);
    jqxNotE.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
    jqxNotEContent.html(errorPHP);
    jqxNotE.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
    jqxNotEContent.html(errorThrown.message+": "+errorThrown.name+"\n"+errorThrown.stack);
    jqxNotE.jqxNotification({template:'error',width:'auto',height:'auto',autoClose: false}).jqxNotification('open');
  }//fin de la función errorFuncionAjax
}
