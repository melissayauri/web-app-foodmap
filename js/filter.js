
 $('#search').on('input', function(event) {


   var inputSearch = $(this).val();

    for (var j = 0; j < data.length; j++) {
       var name = data[j]['name'];
       var tag = data[j]['tags'];
       var img = data[j]['photo'];
       console.log(tag)
       console.log(inputSearch)
         for (var j = 0; j < data[j].num.length; j++) {
    if (inputSearch === tag) {
      console.log('hhh');
       $('#sample ').text(name);
       $('#sample').wrap('<div>' + img + '</div>');

    }
  if (inputSearch === '') {
  window.location.href = '../views/principal.html';
  }
}
}

});
