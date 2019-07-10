$("#save-artisan").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var elements = document.getElementById("artisan-form").elements;

    var newArtisan = { UserId: "1" };
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        console.log(item);
        newArtisan[item.id] = item.value;
    }

    // Send the POST request.
    $.ajax("/api/artisans", {
        type: "POST",
        data: newArtisan
    }).then(
        function() {
            console.log("created new stand");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});