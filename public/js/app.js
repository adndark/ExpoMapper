
  $("#newMap").on("click", function() {
    $("#results-modal").modal("toggle");

  });

  $("#newMapInfo").on("click", function() {
    // var x = document.getElementById("map-form").elements[0].value;
    var x = document.getElementById("map-form");
    // var name = $("#map-name").val();
    console.log(x);

  });

  
  $("#save-artisan").on("click", function() {

  var elements = document.getElementById("artisan-form").elements;
  console.log(elements);
  
  var obj ={};
  for(var i = 0 ; i < elements.length ; i++){
      var item = elements.item(i);
      console.log(item);
      obj[item.id] = item.value;
  }

  // document.getElementById("demo").innerHTML = JSON.stringify(obj);
  console.log(JSON.stringify(obj));
  console.log(obj);
  



  });