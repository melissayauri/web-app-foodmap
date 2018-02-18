/* funcionalidad para la ubicación del usuario y los lugares para comer*/
var myLocation;
var initMap = (function() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644},
    zoom: 14
  });
  var infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myLocation = position;
      infoWindow.setPosition(position);
      infoWindow.setContent('Esta es tu ubicación');
      var thisPlace = new google.maps.LatLng(myLocation.lat, myLocation.lng);
      /* Ubicación de lugares que venden postres más cercanos a tu ubicación*/
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: thisPlace,
        radius: 1500,
        type: ['bakery']
      }, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      };
      function createMarker(thisPlace) {
        var placeLoc = thisPlace.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: thisPlace.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(thisPlace.name);
          infoWindow.open(map, this);
        });
      };

      map.setCenter(position);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
});

var handleLocationError = (function(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: No deseas la ubicación' :
    'Error: Your browser doesn\'t support geolocation.');
});

/* funcionalidad*/
$(document).ready(function() {
  var addFilters = (function(element) {
    var filtersArr = [];
    for (var i = 0; i < restaurants.length; i++) {
      for (var n = 0; n < restaurants[i].filters.length; n++) {
        filtersArr.push(restaurants[i].filters[n]);
      }
    }
    var uniqueFilters = [...new Set(filtersArr)];
    var filtersFinal = uniqueFilters.sort();
    for (var a = 0; a < filtersFinal.length; a++) {
      element.append("<option value='"+filtersFinal[a]+"'>"+filtersFinal[a]+"") ;
    };
    return filtersFinal;
  });
  addFilters($('#selection'));
  /* funcionalidad para el splash*/
  setTimeout(function() {
    $('.splash').fadeOut();
    $('.principal-container').fadeIn();
  }, 4000);
  setTimeout(function() {
    initMap();
  }, 1000);


  /* funcionalidad para el selector que muestra los lugares */
  $('#selection').change(function() {
    $('#place-container').children().remove();
    var selection = $('select').val();
    for (var i = 0; i < restaurants.length; i++) {
      for (var n = 0; n < restaurants[i].filters.length; n++) {
        if (restaurants[i].filters[n] === selection) {
          var image = restaurants[i].photo;
          $('#place-container').append("<div class='col s12 l6 xl6'><div class='place'><p class='title-place'>"+restaurants[i].name+"</p>"+image+"</div></div>");
        }
      }
    };

    /* funcionalidad para que al momento de pasar el cursor se muestre el nombre del lugar*/
    $('.place').mouseover(function() {
      $(':nth-child(1)', this).css({'opacity': '1'});
    });

    $('.place').mouseout(function() {
      $(':nth-child(1)', this).css({'opacity': '0'});
    });

    /* inicializando el modal*/
    $('.modal').modal();
    /* funcionalidad para adicionar los elementos al modal*/
    $('.place').click(function() {
      var place = $(this).children('img').attr('alt');
      for (var i = 0; i < restaurants.length; i++) {
        if (place === restaurants[i].name) {
          $('#name-place').empty();
          $('#information').empty();
          $('#name-place').html(restaurants[i].name);
          $('#ubication').empty();
          var newName = restaurants[i].name.replace(/ /g, '+');
          for (var n = 0; n < restaurants[i].address.length; n++) {
            var newAddress = restaurants[i].address[n].replace(/ /g,'+' );
            var addressGoogle = newAddress.replace(/,/g, "");
            $('#ubication').append("<iframe src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAR26jcQ0wriBfIDM3j327c80TqkZjw8-A&q="+addressGoogle+"'allowfullscreen></iframe>");
            $('#information').append('<p>' + restaurants[i].address[n] + '</p>');
          }
          $('#information').append("<p><a href='"+restaurants[i].website+"'>"+restaurants[i].website+"</a></p>");
        }
      }
      $("#modal").modal("open");
      /**
      * If the user clicks on the modal overlay, the search resets itself
      */
      $(".modal-overlay").click(function() {
        $("#place-container").children().remove();
        $("#selection").val(null);
      });
    });
  });
});
