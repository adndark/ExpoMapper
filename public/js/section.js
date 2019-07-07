$( document ).ready(function() {
  console.log( "ready!" );
  $("#sectionsHead").hide();

});

$(function() {

var dataList = $("#sectionsBody");
var dataContainer = $(".data-container");
$(document).on("click", ".delete", handleDeleteButtonPress);
$(document).on("click", ".update", handleUpdateButtonPress);
    
function upsertData(sectionData) {
  $.get("/api/sections", sectionData)
    .then(getData);
    console.log(getData);
    
}

function getData() {
  $.get("/api/sections", function(data) {
    $("#sectionsHead").show();
    $("#sectionsBody").show();
    
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createArtisanRow(data[i]));
    }
    renderArtisan(rowsToAdd);

    console.log(rowsToAdd);
    
    // nameInput.val("");
  });
}

function createArtisanRow(sectionData) {

  var newTr = $("<tr>");
  newTr.data("section", sectionData);
  var values = Object.values(sectionData);
  console.log(sectionData);
  
  //   values.forEach(function(info,index){
// });
  
newTr.append("<td contenteditable='true' id='ArtisanName'>" + sectionData.sectionName+ "</td>");
newTr.append("<td contenteditable='true' id='capacity'>" + sectionData.capacity + "</td>");
newTr.append("<td><a style='cursor:pointer;color:red' class='delete'>Delete</a></td>"); 
newTr.append("<td><a style='cursor:pointer;color:red' class='update'>Update</a></td>");

return newTr;
}

// A function for rendering the list of authors to the page
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
  alertDiv.text("You must create an section before.");
  dataContainer.append(alertDiv);
}

$("#section").on("click", function(event) {
  $('#sectionsBody').empty()
  $("#artisanHead").hide();
  $("#artisanBody").hide();
  upsertData();
});

function handleDeleteButtonPress() {
  var listItemData = $(this).parent("td").parent("tr").data("section");
  var id = listItemData.id;
  console.log(listItemData);
  
  
  $.ajax({
    method: "DELETE",
    url: "/api/sections/" + id
  })
    .then(getData);
    alert("Deleted ")
    
}

function handleUpdateButtonPress() {

  var listItemData = $(this).parent("td").parent("tr").data("section");
  console.log(listItemData );
  
  var id = listItemData.id;
    
  var upSection = {
    sectionName: $("#sectionName").html(),
    capacity: $("#capacity").html(),
  };
 
  // Send the PUT request.
  $.ajax("/api/sections/" + id, {
    type: "PUT", 
    data: upSection
  }).then(
    function() {
      console.log("changed", upSection);
      // Reload the page to get the updated list
      // location.reload();
      alert("Section changed ")
    }
  );
}

  
  
$("#save-section").on("click", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  var elements = document.getElementById("section-info").elements;
  var newSection ={};
  for(var i = 0 ; i < elements.length ; i++){
  var item = elements.item(i);
  // console.log(item);
  newSection[item.id] = item.value;
  }
  console.log(newSection);
  // Send the POST request.
  $.ajax("/api/sections", {
    type: "POST",
    data: newSection
  }).then(
    function() {
      console.log("created new section");
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
  

});