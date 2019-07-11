const floorColumn = {
    floorName: "Floor Name",
};

function generateFloorTableHeader() {
    let head = $("<thead>");
    _.each(floorColumn, function(val, key) {
        head.append("<th>" + val + "</th>");
    });
    return head;
}

const floorRow = Backbone.View.extend({

    events: {
        "click .delete-floor": "deleteFloor",
        "click .update-floor": "updateFloor"
    },

    deleteFloor: function() {
        // Remove row frmo view
        this.remove();
        console.log("Deleting Floor with id " + this.model.get("id"));
        // Destroy model (destroy in db)
        this.model.destroy();
    },

    updateFloor: function() {
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
        _.each(floorColumn, function(val, key) {
            const column = $("<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>");
            column.blur(self.attributeValueChange(key));
            self.$el.append(column);
        });
        // Create buttons
        // Delete floor
        this.$el.append("<td><a style='cursor:pointer;color:red' class='delete-floor'>Delete </a></td>");
        // Update floor
        this.$el.append("<td><a style='cursor:pointer;color:red' class='update-floor'>Update </a></td>");
        return this;
    }

});

const FloorTable = Backbone.View.extend({

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
        table.append(generateFloorTableHeader());
        let tbody = $("<tbody id=\"floorBody\"> </tbody>");
        this.model.each(function(floor) {
            //console.log("floor " + JSON.stringify(floor));
            const floorRowView = new floorRow({ model: floor });
            // Generate floor row jquery object by calling render
            floorRowView.render();
            // Append jquery element into tbody
            tbody.append(floorRowView.$el);
        });
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});