const sectionColumn = {
    sectionName: "Name",
    capacity: "Capacity",

};

function generateSectionTableHeader() {
    let head = $("<thead>");
    _.each(sectionColumn, function(val, key) {
        head.append("<th>" + val + "</th>");
    });
    return head;
}

const SectionRow = Backbone.View.extend({
    events: {
        "click .delete-section": "deleteSection",
        "click .update-section": "updateSection"
    },

    deleteSection: function() {
        this.remove();
        //this.model.destroy()
        console.log("Deleting section with id " + this.model.get("id"));
        //this.model.trigger('delete', this.model);
        this.model.destroy();
    },

    updateSection: function() {
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
        _.each(sectionColumn, function(val, key) {
            const column = $("<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>");
            column.blur(self.attributeValueChange(key));
            self.$el.append(column);
        });
        // Create buttons
        // Delete Section
        this.$el.append("<td><a style='cursor:pointer;color:red' class='delete-section'>Delete</a></td>");
        // Update Section
        this.$el.append("<td><a style='cursor:pointer;color:red' class='update-section'>Update</a></td>");
        return this;
    }

});

const SectionTable = Backbone.View.extend({

    // If the model changes then render the view again
    initialize: function() {
        this.listenTo(this.model, "change", function() {
            this.$el.empty();
            this.render();
        });
    },

    render: function() {

        console.log("Rendering table");
        const table = $("<table class=\"table table-striped\">");
        // Generate table header
        table.append(generateSectionTableHeader());
        let tbody = $("<tbody id=\"sectionBody\"> </tbody>");
        this.model.each(function(section) {
            const sectionRowView = new SectionRow({ model: section });
            // Generate artisan row jquery object by calling render
            sectionRowView.render();
            tbody.append(sectionRowView.$el);
        });
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});