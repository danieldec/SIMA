$(document).on('ready',function() {
  //evento del menu tab
  $('.nav-tabs a').on('click',function (e) {
    e.preventDefault();
    $(this).tab('show');
    console.log($('.tab-pane').attr('class'));
    console.log($(this).tab('show'));
  });

  var cadena="";
  // $('input[type="text"]').on('blur',function () {
  //   console.log($(this).val());
  // });

  //este evento nos permite hacer que las minusculas se hagan mayusculas
  $('input[type="text"]').on('keyup',function (e) {
    cadena=$(this).val().toUpperCase();
    $(this).val(cadena);
  });
  $('input[type="password"]').on('click',function (e) {
    console.log($(this).val());
  });
  //dialogo de confirmación para cerrar sesión
  $('#aCerrarSesion').on('click',function(e) {
    var r= window.confirm("¿Estas seguro que quieres salir?");
    if (r==true) {
      return true;
    }else{
      e.preventDefault();
    }
  });
});
