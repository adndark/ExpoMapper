
$(function() {

      
      $("#save-stand").on("click", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
  
        var elements = document.getElementById("stand-info").elements;
  
        var newStand ={};
        for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        console.log(item);
        newStand[item.id] = item.value;
        }
    
         
        // Send the POST request.
        $.ajax("/api/stands", {
          type: "POST",
          data: newStand
        }).then(
          function() {
            console.log("created new stand");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
    
      
    });