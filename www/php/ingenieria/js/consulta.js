$(document).on('ready',principal);
function principal(e) {
  var formConPar = $('#formConPar');
  var divFeI = $('#divFeI');
  var divFeF = $('#divFeF');
  var jqxNotIng = $('#jqxNotIng');
  var jqxNotIngContent = $('#jqxNotIngContent');
  $.post(
    {
      url:'php/tablaNumParte.php',
      dataType:'json',
      data:{numEmpleado:true},
      success:exitoConParte,
      type:'POST',
      error:errorFuncionAjax
    });
    function exitoConParte(datos,x,y) {

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
