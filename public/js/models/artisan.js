// Defiine artisan model
const ArtisanModel = Backbone.Model.extend({
    // Url to fetch data from
    urlRoot: "/api/artisans",
});

// Define artisan collection which retrives data for
// a given user id
const ArtisanCollection = Backbone.Collection.extend({

    // Override initialize
    initialize: function(models, options) {
        this.UserId = options.userId;
    },

    // Define model
    model: ArtisanModel,

    // Override url function
    url: function() {
        return "/api/artisansByUserId/" + this.UserId;
    }
});