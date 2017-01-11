$(document).on('ready',principal);
function principal(e) {
  var formConPar = $('#formConPar');
  var divFeI = $('#divFeI');
  var divFeF = $('#divFeF');
  var jqxNotIng = $('#jqxNotIng');
  var jqxNotIngContent = $('#jqxNotIngContent');
  var numParteConsul = $('#numParteConsul');
  var tablaConsulNP = $('#tablaConsulNP');
  divFeI.jqxDateTimeInput(
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
  divFeF.jqxDateTimeInput(
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
  jqxNotIngContent.html("HOLAMUNDO");
  jqxNotIng.jqxNotification(
    {
      template:'info',
      width:'300px',
      height:'auto',
      autoOpen:true
    }
  );
  numParteConsul.autocomplete(
    {
      source:listNumParte,
      minLength:2
    }
  );
  function listNumParte(request,response) {
    $.post(
      {
        url:'php/consultaNumParte.php',
        dataType:'json',
        data:
        {
          numParte:request.term,
          busNumParte:true
        },
        success:function (data) {
          response(data);
        },
        type:'POST',
        error:errorFuncionAjax
      }
    );
  }//fin de la función listNumParte

  formConPar.on('submit',subFormConIng);
  function subFormConIng(e) {
    var fechaI = divFeI.jqxDateTimeInput('getDate');
    var fechaF = divFeF.jqxDateTimeInput('getDate');
    var fechaFI = obtenerFecha(fechaI);
    var fechaFF = obtenerFecha(fechaF);
    var numParte = numParteConsul.val();
    var rangoDias = ((((fechaF.valueOf()-fechaI.valueOf())/1000)/24)/60)/60;
    console.log(rangoDias);
    if (rangoDias>30) {
      jqxNotIngContent.html("La consulta no debe pasar de los 30 días");
      jqxNotIng.jqxNotification(
        {
          template:"error",
          width:"300px",
          height:"auto"
        }
      );
      jqxNotIng.jqxNotification('open');
      return false;
    }else{
      if (rangoDias<0) {
        jqxNotIngContent.html("La fecha final no debe ser mayor a la fecha inicio");
        jqxNotIng.jqxNotification(
          {
            template:"error",
            width:"300px",
            height:"auto"
          }
        );
        jqxNotIng.jqxNotification('open');
        return false;
      }
    }
    if ((fechaI == null || fechaF == null)||numParte.length==0||numParte==""||numParte.length>10) {
      if (numParte.length>10) {
        jqxNotIngContent.html("Número de parte invalido");
        jqxNotIng.jqxNotification(
          {
            template:"error",
            width:"300px",
            height:"auto"
          }
        );
        jqxNotIng.jqxNotification('open');
        numParteConsul.val("").focus();
      }else{
        jqxNotIngContent.html("Por favor no dejes vacias las fechas, o el número de parte.");
        jqxNotIng.jqxNotification(
          {
            template:"error",
            width:"300px",
            height:"auto"
          }
        );
        jqxNotIng.jqxNotification('open');
      }
      return false;
    }//fin del if
    $.post(
      {
        url:'php/consultaNumParte.php',
        dataType:'json',
        data:
        {
          numParte:numParte,
          consulNumParte:true,
          fechaFI:fechaFI,
          fechaFF:fechaFF
        },
        success:exitoConParte,
        type:'POST',
        error:errorFuncionAjax
      });
      e.preventDefault();
  }//fin de la función subFormConIng
    function exitoConParte(datos,x,y) {
      if (datos.validacion=="exito") {
        tablaConsulNP.children('tbody').html(datos.datos);
      }else if (datos.validacion=="error") {
        jqxNotIngContent.html(datos.datos);
        jqxNotIng.jqxNotification(
          {
            template:"error",
            width:"300px",
            height:"auto"
          }
        );
        jqxNotIng.jqxNotification('open');
      }
    }

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
}//fin de la función principal
