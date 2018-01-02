$(document).ready(function() {
  // mostrando todos los restaurantes que hay en la data en la seccion de muestra(sample)

  for (var i = 0; i < data.length; i++) {

 $('#sample').append('<div>' + data[i]['photo'] + '</div>');
    // añadiendo clases para mostrar los restaurantes de forma ordenada
    $('#sample img').addClass('col-xs-4 mg-bt-25 height-25 line');
  }


});
