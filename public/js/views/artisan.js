const artisanColumn = {
    ArtisanName: "Name",
    phone: "Phone",
    email: "Email",
    address: "Address",
    city: "City",
    community: "Community",
    craft: "Craft",
    rawMaterial: "Raw Material",
    finalProduct: "Final Product",
    assignee: "Assignee",
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
        "click .delete-artisan": "deleteArtisan",
        "click .update-artisan": "updateArtisan"
    },

    deleteArtisan: function() {
        // Remove row frmo view
        this.remove();
        console.log("Deleting artisan with id " + this.model.get("id"));
        // Destroy model (destroy in db)
        this.model.destroy();
    },

    updateArtisan: function() {
        console.log("Update model " + JSON.stringify(this.model));
        this.model.save();
    },

    attributeValueChange: function(key) {
        const self = this;
        return function() {
            var value = self.model.get(key);
            if (value != $(this).html()) {
                console.log("Model value changed. Original: " + value + " new: " + $(this).html());
                console.log(key);
                console.log($(this).html());
                self.model.set(key, $(this).html());
            }
        }
    },

    tagName: "tr",

    render: function() {

        const self = this;
        _.each(artisanColumn, function(val, key) {
            const column = $("<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>");
            column.blur(self.attributeValueChange(key));
            self.$el.append(column);
        });
        // Create buttons
        // Delete Artisan
        this.$el.append("<td><a style='cursor:pointer;color:red' class='delete-artisan'>Delete </a></td>");
        // Update artisan
        this.$el.append("<td><a style='cursor:pointer;color:red' class='update-artisan'>Update </a></td>");
        return this;
    }

});

const ArtisanTable = Backbone.View.extend({

    // If the model changes then render the view again
    initialize: function() {
        this.listenTo(this.model, "change", function() {
            this.$el.empty();
            this.render();
        });
    },

    render: function() {

        const table = $("<table class=\"table table-striped\">");
        // Generate table header
        table.append(generateArtisanTableHeader());
        let tbody = $("<tbody id=\"artisanBody\"> </tbody>");
        this.model.each(function(artisan) {
            //console.log("Artisan " + JSON.stringify(artisan));
            const artisanRowView = new ArtisanRow({ model: artisan });
            // Generate artisan row jquery object by calling render
            artisanRowView.render();
            // Append jquery element into tbody
            tbody.append(artisanRowView.$el);
        });
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});