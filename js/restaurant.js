$(document).ready(function() {
  var size = data.length;
  /* funcion para hacer el recorrido de la data*/
  $.each(data, function(i, size) {
    /* imagen de las dulcerias */
    var $photo = data[i]['photo'];
    /* nombres de los filtros de los postres*/
    var $filter = data[i]['filter'];
    var posi = data[i]['position'];
    console.log($filter);
    /* agregando las imagenes y generando atributos mediante data*/
    $('#restaurants').append('<div  data-filter="' + $filter + '">"' + $photo + '" </div>');
    /* $('#restaurants div').append('<img src="" alt="">');*/
    /* añadiendo el tamaño de las columnas para cada foto de la dulceria*/
    $('#restaurants div img ').addClass('col-xs-5 photo');
  });
  /* mensaje de ayuda*/
  $('#question').on('click', function() {
    $('#answer').toggle();
  });
});
