// Define user model
const UserModel = Backbone.Model.extend({
    // Url to fetch data from
    urlRoot: "/api/user",
});

// Define User collection
const UserCollection = Backbone.Collection.extend({

    // Override initialize
    initialize: function(models, options) {
        this.id = options.id;
    },

    // Define model
    model: UserModel,

    // Override url function
    url: function() {
        return "/api/users/" + this.id;
    }
});