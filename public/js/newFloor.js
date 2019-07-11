$("#newStand").on("click", function() {
    $("#stand-modal").modal("toggle");

});

$("#newSection").on("click", function() {
    //Display the modal form to create a new section
    $("#section-modal").modal("toggle");

});

$("#save-section").on("click", function() {
    var elements = document.getElementById("section-form").elements;
    console.log(elements);

    var newSection = {};
    for (var i = 0; i < elements.length; i++) {
        var item = elements.item(i);
        console.log(item);
        newSection[item.id] = item.value;
    }

    console.log(JSON.stringify(newSection));
    console.log(newSection);

    SaveSectionsData();
});