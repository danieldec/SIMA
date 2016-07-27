$(document).on('ready',function() {
  var numOrden=$('#inpNumOrden').val();
  var mensaBD=$('#mensajeBD');
  var inpFNumOrden=$('#inpFNumOrden').val();
  var fecha= new Date();
  var dia=fecha.getDay()+
  if (numOrden=="0") {
    mensaBD.addClass('alert alert-danger text-center').show().fadeOut(10000);
  }else{
    mensaBD.addClass('alert alert-danger text-center').hide().fadeOut(10000);
  }

});
