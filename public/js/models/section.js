// Defiine Section model
const SectionModel = Backbone.Model.extend({
    // Url to fetch data from
    urlRoot: "/api/sections",
});

// Define sections collection which retrives data for
// a given floor id
const SectionsCollection = Backbone.Collection.extend({

    // Override initialize
    initialize: function(models, options) {
        this.FloorId = options.FloorId;
    },

    // Define model
    model: SectionModel,

    // Override url function
    url: function() {
        return "/api/sectionsByFloorId/" + this.FloorId;
    }
});