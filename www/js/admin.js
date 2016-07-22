$(document).on('ready',function() {
  var cadena="";
  var inputTypeText=$('input[type="text"]');
  //evento del menu tab
  $('.nav-tabs a').on('click',function (e) {
    e.preventDefault();
    $(this).tab('show');
    console.log($('.tab-pane').attr('class'));
    console.log($(this).tab('show'));
  });


  //este evento nos permite hacer que las minusculas se hagan mayusculas
  inputTypeText.bind('keyup blur focus',function (e) {
    cadena=$(this).val().toUpperCase();
    console.log(cadena);
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
  inputTypeText.val(cadena);
});
