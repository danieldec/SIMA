$(document).on('ready',function() {
  console.log('Listo para programar');
  $(".nav-tabs a").on('click',function() {
  	$(this).tab('show');	
  });
  $("tr>td>button").on('click',function() {  	
  	/*console.log($(this).attr("id"));
  	console.log($(this).text()+"\nel método.html(): "+$(this).html());*/
  	if ($(this).text()==" Modificar") {
  		$(this).html('<span class="glyphicon glyphicon-floppy-disk"></span> Guardar');
  		
  		return;
  	}
  	if ($(this).text()==" Guardar") {
  		$(this).html('<span class="glyphicon glyphicon-pencil"></span> Modificar');
  	}
  });
  $('tr').on('click',function(){
  	console.log($(this).index());
  });

  $('.filaSeleccionada').hover(function() {

  },function() {
  	
  });
});
