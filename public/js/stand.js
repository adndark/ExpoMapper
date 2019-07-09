console.log("Instantiate Stand Table and wait for model change");
const standsBySection = new StandsCollection([], { SectionId: 1 });

console.log(standsBySection);

const standTable = new StandTable({ el: "#standsTable", model: standsBySection });

$("#getStandInfo").on("click", function(event) {

    standsBySection.fetch({

        success: function() {
            standTable.render();
        }
    });
});