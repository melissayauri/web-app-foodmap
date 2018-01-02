$(document).ready(function() {
  $('#search').keyup(function() {
    /* valores que se coloca en el filtro*/
    var $input = $(this).val();
    if ($(this).val() === '') {
      window.location.href = '../views/principal.html';
      /* location.reload();*/
    }

    /* tomando todos los restaurantes de la data*/
    var $restaurants = $('#restaurants div ');
    var $sizeRestaurant = restaurants.length;
    /* recorrido por la data restaurantes que se tiene inicialmente*/
    $.each(data, function(i, $sizeRestaurant) {
      /* almacena el filtro que se solicita*/
      var $filterRestaurant = '';
      console.log($restaurants);
      /* se guarda el filtro ingresado a traves del atributo data*/
      $filterRestaurant = $($restaurants[i]).data('filter');
      console.log($filterRestaurant);
      var $sizeFilter = $filterRestaurant.length;
      /* recorrido para el filtro solicitado, ejemplo.helados*/
      $.each(data, function(j, $sizeFilter) {
        /* si el valor de la entrada coincide con el filtro del atributo data*/
        if ($filterRestaurant === $input) {
          /* se muestra los restaurantes que contengan el filter:helados*/
          $($restaurants[i]).show();
        } else {
          $($restaurants[i]).hide();
        }
      });
    });
  });
});
