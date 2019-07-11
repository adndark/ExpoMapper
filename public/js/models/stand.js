// Define stand model
const StandModel = Backbone.Model.extend({
    //Url to fetch the data from:
    urlRoot: "/api/stands",
});

//Define stand collection which retrives data for
// a given Section id
const StandsCollection = Backbone.Collection.extend({

    //Override initialize 
    initialize: function(models, options) {
        this.floorId = options.floorId;
    },

    //define Model
    model: StandModel,

    //Override Url function
    url: function() {
        return "/api/standsByFloorId/" + this.floorId;
    }

})