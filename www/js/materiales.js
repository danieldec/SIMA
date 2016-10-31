$(document).on('ready',principal);
function principal(e) {
  if (e.target.URL=='http://localhost/SIMA/php/materiales/reporte.php') {
    var fechaHoy=$('#hoy').val();
    var reqNumOrden=true;
    console.log(fechaHoy+" "+reqNumOrden);
    $.post('../produccion/requerimientos.php',{pFechaHoy:fechaHoy,pReqNumOrden:reqNumOrden},reqNumOrdenPost);
    function reqNumOrdenPost(data,status,callback) {
      try {
        console.log(data);
        var datos=$.parseJSON(data);
        $('#tablaReq tbody').empty();
        $('#tablaReq').DataTable().destroy();
        $('#tablaReq tbody').html(datos.Datos);
        $('.cantReq',tablaReq).each(function() {
          cantR=$(this).html();
          parseInt(cantR);
          parcR=$(this).siblings('.parReq').html();
          paPR=cantR-parcR;
          parseInt(paPR);
          proR=$(this).siblings('.cantReaReq').html();
          parseInt(proR);
          balR=paPR-proR;
          parseInt(balR);
          // $(this).html(parseInt(cantR).toLocaleString('en-IN'));
          // $(this).siblings('.paPReq').html(paPR.toLocaleString('en-IN'));
          // $(this).siblings('.balReq').html(balR.toLocaleString('en-IN'));
          $(this).text(cantR);
          $(this).siblings('.paPReq').text(paPR);
          $(this).siblings('.balReq').text(balR);
          // console.log($(this).siblings('.porReq').children('.progress'));
          var porcentaje=((parseInt(parcR)+parseInt(proR))/cantR)*100;
          // console.log(porcentaje);
          $(this).siblings('.porReq').children('.progress').css('width',Math.round(porcentaje)+"%");
          $(this).siblings('.porReq').children('.progress').children('div').html(Math.round(porcentaje)+"%");
        });
        $('#tablaReq').DataTable({
          "language":{
            "url":"../../json/Spanish.json"
          }
        });
      } catch (e) {
        console.log(e);
        console.log(data);
      }
      // console.log(datos);
      // console.log(data);
    }// fin de la función reqNumOrdenPost
  }
}
