function loadArtisanData(userId) {
    console.log("Getting artisan info");
    // Hide other containers
    hideDataContainers();
    // Clear artisans table
    $('#artisansTable').empty();

    // Render artisan table
    console.log("Instantiate ArtisanTable and wait for model change");
    const artisansByUser = new ArtisanCollection([], { userId: userId });
    const artisanTable = new ArtisanTable({ el: "#artisansTable", model: artisansByUser });

    // Show loading data spinner
    $("#loadingData").show();
    // Retrieve data from server
    artisansByUser.fetch({

        success: function() {
            // Render artisan table
            artisanTable.render();
            // Hide loading data container
            $("#loadingData").hide();
            // Display artisans container
            $("#artisansContainer").show();
        }
    });
}

function loadSectionsData(userId) {
    console.log("Getting sections data");
    // Hide other containers
    hideDataContainers();
    // Clear sections table
    $("#sectionsTable").empty();
    // Retrieve data and render
    const sectionsByFloor = new SectionsCollection([], { FloorId: userId });
    const sectionTable = new SectionTable({ el: "#sectionsTable", model: sectionsByFloor });

    // Show loading data spinner
    $("#loadingData").show();
    // Retrieve data from server
    sectionsByFloor.fetch({

        success: function() {
            // Render section table
            sectionTable.render();
            // Hide loading data container
            $("#loadingData").hide();
            // Display section container
            $("#sectionsContainer").show();
        }
    });
}

function loadStandsData(userId) {
    console.log("Instantiate Stand Table and wait for model change");
    // Hide other containers
    hideDataContainers();
    // Clear sections table
    $("#standsTable").empty();
    const standsBySection = new StandsCollection([], { SectionId: 1 });
    const standTable = new StandTable({ el: "#standsTable", model: standsBySection });

    // Show loading data spinner
    $("#loadingData").show();
    // Retrieve data from server
    standsBySection.fetch({

        success: function() {
            // Render section table
            standTable.render();
            // Hide loading data container
            $("#loadingData").hide();
            // Display section container
            $("#standsContainer").show();
        }
    });

}

function hideDataContainers() {

    // Hide artisan container
    $("#artisansContainer").hide();
    // Hide section container
    $("#sectionsContainer").hide();
    // Hide stands container
    $("#standsContainer").hide();
    // Show loading data container
    $("#loadingData").hide();
}

// Once the document is ready (loaded all files) then
// call this JQuery function to execute initial logic
$(document).ready(function() {
    console.log("ready!");

    // Hide all data containers
    hideDataContainers();

    // Bind logic to button for getting artisans info
    $("#getArtisanInfo").on("click", function(event) {

        // Load data for user 1 as is the only one we have
        loadArtisanData(getCook("userId"));

    });

    // Bind logic to button for getting section info
    $("#getSectionInfo").on("click", function(event) {

        // Load data for user 1 as is the only one we have
        loadSectionsData(getCook("userId"));
    });

    // Bind logic to button for getting stand info
    $("#getStandInfo").on("click", function(event) {

        loadStandsData(getCook("userId"));
    });
});