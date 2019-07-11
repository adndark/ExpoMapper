function loadFloorData(userId) {
    console.log("Getting floor info");
    // Hide other containers
    hideDataContainers();
    // Clear artisans table
    $('#floorsTable').empty();

    // Render artisan table
    console.log("Instantiate Floor Table and wait for model change");
    const floorsByUser = new FloorCollection([], { userId: userId });
    const floorTable = new FloorTable({ el: "#floorsTable", model: floorsByUser });

    // Retrieve data from server
    floorsByUser.fetch({

        success: function() {
            // Render artisan table
            floorTable.render();

            // Display artisans container
            $("#floorsContainer").show();
        }
    });
}

function hideDataContainers() {
    // Hide floor container
    $("#floorsContainer").hide();
}


$(document).ready(function() {
    console.log("ready!");
    hideDataContainers();

    // Bind logic to button for getting floors info
    $("#getFloorInfo").on("click", function(event) {

        // Load data for user 1 as is the only one we have
        loadFloorData(getCook("userId"));

    });

});