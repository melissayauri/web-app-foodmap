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
    $('#restaurants').append('<div  data-filter="' + $filter + '">' + $photo + ' </div>');
    /* $('#restaurants div').append('<img src="" alt="">');*/
    /* añadiendo el tamaño de las columnas para cada foto de la dulceria*/
    $('#restaurants div img ').addClass('col-xs-5 photo');
  });
  /* efecto a cada una de las imagenes de la vista principal*/
  $('#restaurants div img ').on('click', function() {
    /* $(this).animate({height:'150px'});*/
    $(this).addClass('shadow');
    $(this).addClass('mes');
  });
  $('#restaurants div img ').on('mouseleave', function() {
    /* $(this).animate({height:'30vh'});*/
    $(this).removeClass('shadow');
  });

  /* mensaje de ayuda*/
  $('#question').on('click', function() {
    $('#answer').toggle();
  });
});
