// Define Floor model
const FloorModel = Backbone.Model.extend({
    // Url to fetch data from
    urlRoot: "/api/floors",
});

// Define floor collection which retrives data for
// a given user id
const FloorCollection = Backbone.Collection.extend({

    // Override initialize
    initialize: function(models, options) {
        this.UserId = options.UserId;
    },

    // Define model
    model: FloorModel,

    // Override url function
    url: function() {
        return "/api/floorsByUserId/" + this.UserId;
    }
});