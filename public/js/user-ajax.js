
$(function() {
    
    $(".change-user").on("click", function(event) {
      var id = $(this).data("id");
      var newPassword = $(this).data("");
  
      var newPassword = {
        password: newPassword
      };
  
      // Send the PUT request.
      $.ajax("/api/users/" + id, {
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
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newUser = {
        userName: $("").val().trim(),
        name: $("").val().trim(),
        email:$("").val().trim(),
        password: $("").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/users", {
        type: "POST",
        data: newUser
      }).then(
        function() {
          console.log("created new user");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-user").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/users/" + id, {
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