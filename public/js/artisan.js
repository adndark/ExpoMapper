// Test artisan model
const testArtisan = new ArtisanModel({ id: 2 });

console.log("Fetching artisan with id 2");
testArtisan.fetch({
    success: function() {
        console.log("Test artisan");
        console.log(JSON.stringify((testArtisan)));
        console.log((testArtisan));
        console.log("Setting ArtisanName")
        testArtisan.set("ArtisanName", new Date().getTime());
        console.log("Save artisan");
        testArtisan.save();
    }
});

console.log(JSON.stringify((testArtisan)));

const artisanCollection = new ArtisanCollection([], {userId: 1});
artisanCollection.url = "/api/artisansByUserId/1";
artisanCollection.fetch({
    success: function() {
        console.log("artisanCollection");
        console.log(JSON.stringify((artisanCollection)));
        console.log((artisanCollection));
        console.log("Artisan with id " + JSON.stringify(artisanCollection.get(5)));
        console.log(artisanCollection.get(5));
        console.log("Modifying artisan's name");
        const art = artisanCollection.get(5).set("ArtisanName", "AnotherTesty123");
        art.save();
    }
});

// Create test artisan
const test = new ArtisanModel();
test.set({"ArtisanName": "testy"});
test.save();

console.log(test);


$( document ).ready(function() {
  console.log( "ready!" );

  $("#artisanHead").hide();
});


$(function() {

var dataList = $("#artisanBody");
var dataContainer = $(".data-container");
$(document).on("click", ".delete-artisan", handleDeleteButtonPress);
$(document).on("click", ".update-artisan", handleUpdateButtonPress);

function upsertArtisan(artisanData) {
  $.get("/api/artisans", artisanData)
    .then(getArtisans);
    console.log(getArtisans);
    
}

function getArtisans() {
  $.get("/api/artisans", function(data) {
    $("#artisanHead").show();
    $("#artisanBody").show();

    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createArtisanRow(data[i]));
    }
    renderArtisan(rowsToAdd);

    console.log(rowsToAdd);
    
    // nameInput.val("");
  });
}

function createArtisanRow(artisanData) {

    var newTr = $("<tr>");
    newTr.data("artisan", artisanData);
    var values = Object.values(artisanData);
    console.log(artisanData);


    values.forEach(function(info, index) {

        console.log(info);

        console.log(index);

    });

    newTr.append("<td contenteditable='true' id='ArtisanName'>" + artisanData.ArtisanName + "</td>");
    newTr.append("<td contenteditable='true' id='phone'>" + artisanData.phone + "</td>");
    newTr.append("<td contenteditable='true' id='email'>" + artisanData.email + "</td>");
    newTr.append("<td contenteditable='true' id='address'>" + artisanData.address + "</td>");
    newTr.append("<td contenteditable='true' id='city'>" + artisanData.city + "</td>");
    newTr.append("<td contenteditable='true' id='community'>" + artisanData.community + "</td>");
    newTr.append("<td contenteditable='true' id='companyAsso'>" + artisanData.companyAsso + "</td>");
    newTr.append("<td contenteditable='true' id='craft'>" + artisanData.craft + "</td>");
    newTr.append("<td contenteditable='true' id='rawMaterial'>" + artisanData.rawMaterial + "</td>");
    newTr.append("<td contenteditable='true' id='finalProduct'>" + artisanData.finalProduct + "</td>");
    newTr.append("<td contenteditable='true' id='assignee'>" + artisanData.assignee + "</td>");




    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-artisan'>Delete Artisan</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='update-artisan'>Update Artisan</a></td>");

    return newTr;
}

// A function for rendering the list of artisans to the page
function renderArtisan(rows) {
  dataList.children().not(":last").remove();
  dataContainer.children(".alert").remove();
  if (rows.length) {
    console.log(rows);
    dataList.prepend(rows);
  }
  else {
    renderEmpty();
  }
}

function renderEmpty() {
  
  var alertDiv = $("<div>");
  alertDiv.addClass("alert alert-danger");
  alertDiv.text("You must create an Artisan before.");
  dataContainer.append(alertDiv);
}

$("#getArtisanInfo").on("click", function(event) {
  $('#artisanBody').empty()
  $("#sectionsHead").hide();
  $("#sectionsBody").hide();
  upsertArtisan();
});

function handleDeleteButtonPress() {
  var listItemData = $(this).parent("td").parent("tr").data("artisan");
  var id = listItemData.id;


  $.ajax({
    method: "DELETE",
    url: "/api/artisans/" + id
  }).then(getArtisans);
  location.reload();
}

function handleUpdateButtonPress() {

  var listItemData = $(this).parent("td").parent("tr").data("artisan");
  var id = listItemData.id;
    
  var upArtisan = {
    ArtisanName: $("#ArtisanName").html(),
    phone: $("#phone").html(),
    address: $("#address").html(),
    city: $("#city").html(),
    community: $("#community").html(),
    companyAsso : $("#companyAsso").html(),
    craft: $("#craft").html(),
    rawMaterial: $("#rawMaterial").html(),
    finalProduct: $("#finalProduct").html(),
    assignee: $("#assignee").html(),
  };
 
  // Send the PUT request.
  $.ajax("/api/artisans/" + id, {
    type: "PUT", 
    data: upArtisan
  }).then(
    function() {
      console.log("changed", upArtisan);
      alert("Artisan Changed ")
      // Reload the page to get the updated list
      
    }
  );
}

  
$("#save-artisan").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  var elements = document.getElementById("artisan-form").elements;
  var newUser ={};
  for(var i = 0 ; i < elements.length ; i++){
  var item = elements.item(i);
  console.log(item);
  newUser[item.id] = item.value;
}
    // Send the POST request.
    $.ajax("/api/artisans", {
      type: "POST",
      data: newUser
    }).then(
      function() {
        console.log("created new artisan");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  
});