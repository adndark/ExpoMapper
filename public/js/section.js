console.log("Instantiate Sections Table and wait for model change");
const sectionsByFloor = new SectionsCollection([], { FloorId: 1 });

console.log(sectionsByFloor);

const sectionTable = new SectionTable({ el: "#sectionsTable", model: sectionsByFloor });

$("#getSectionInfo").on("click", function(event) {

    sectionsByFloor.fetch({

        success: function() {
            sectionTable.render();
        }
    });
});