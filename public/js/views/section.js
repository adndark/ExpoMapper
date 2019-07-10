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

    tagName: "tr",

    render: function() {

        console.log("Rendering row");
        const self = this;
        _.each(sectionColumn, function(val, key) {
            const column = "<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>";
            self.$el.append(column);
        });
        // Create buttons
        // Delete Section
        this.$el.append("<td><a style='cursor:pointer;color:red' class='delete-section'>Delete Artisan</a></td>");
        // Update Section
        this.$el.append("<td><a style='cursor:pointer;color:red' class='update-section'>Update Artisan</a></td>");
        return this;
    }

});

const SectionTable = Backbone.View.extend({

    // If the model changes then render the view again
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {

        console.log("Rendering table");
        const table = $("<table class=\"table table-striped aaaa\">");
        // Generate table header
        table.append(generateSectionTableHeader());
        let tbody = $("<tbody id=\"sectionBody\"> </tbody>");
        this.model.each(function(section) {
            const sectionRowView = new SectionRow({ $el: this.$el, model: section });
            tbody.append(sectionRowView.render().$el);
        });
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});