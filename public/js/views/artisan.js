const artisanColumn = {
    ArtisanName: "Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    city: "City",
    community: "Community",
    craft: "Craft",
    rawMaterial: "RawMaterial",
    finalProduct: "finalProduct",
    assignee: "assignee",
    aditionalInfo: "Additional Info"
};

function generateArtisanTableHeader() {
    let head = $("<thead>");
    _.each(artisanColumn, function(val, key) {
        head.append("<th>" + val + "</th>");
    });
    return head;
}

const ArtisanRow = Backbone.View.extend({

    events: {
        "click .delete-artisan": "deleteArtisan"
    },

    deleteArtisan: function() {
        this.remove();
        //this.model.destroy()
        console.log("Deleting artisan with id " + this.model.get("id"));
        //this.model.trigger('delete', this.model);
        this.model.destroy();
    },

    tagName: "tr",

    render: function() {

        const self = this;
        _.each(artisanColumn, function(val, key) {
            const column = "<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>";
            self.$el.append(column);
        });
        // Create buttons
        // Delete Artisan
        this.$el.append("<td><a style='cursor:pointer;color:red' class='delete-artisan'>Delete Artisan</a></td>");
        // Update artisan
        this.$el.append("<td><a style='cursor:pointer;color:red' class='update-artisan'>Update Artisan</a></td>");
        return this;
    }

});

const ArtisanTable = Backbone.View.extend({

    // If the model changes then render the view again
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {

        console.log("Rendering table");
        const table = $("<table class=\"table table-striped aaaa\">");
        // Generate table header
        table.append(generateArtisanTableHeader());
        let tbody = $("<tbody id=\"artisanBody\"> </tbody>");
        this.model.each(function(artisan) {
            console.log("Artisan " + JSON.stringify(artisan));
            const artisanRowView = new ArtisanRow({ $el: this.$el, model: artisan });
            tbody.append(artisanRowView.render().$el);
        });
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});