
$(function() {
    
    $(".change-user").on("click", function(event) {
      var id = $(this).data("id");
      var newPassword = $(this).data("");
  
      var newPassword = {
        password: newPassword
      };
  
      // Send the PUT request.
      $.ajax("/api/artisans/" + id, {
        type: "PUT",
        data: newSleepState
      }).then(
        function() {
          console.log("changed sleep to", newSleep);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $("#save-section").on("click", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      var elements = document.getElementById("section-info").elements;

      var newSection ={};
      for(var i = 0 ; i < elements.length ; i++){
      var item = elements.item(i);
      console.log(item);
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
  
    $(".delete-user").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/artisans/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted user", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });