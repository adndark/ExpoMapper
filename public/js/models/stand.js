// Define stand model
const StandModel = backbone.Model.extend({
    //Url to fetch the data from:
    urlRoot: "/api/stands",
});

//Define stand collection which retrives data for
// a given Section id
const StandModelCollection = backBone.Collection.extend({

    //Override initialize 
    initialize: function(models, options) {
        this.SectionId = options.SectionId;
    },

    //define Model
    model: StandModel,

    //Override Url function
    url: function() {
        return "/api/standsBySectionId/" + this.SectionId;
    }

})