const standColumn = {
    standName: "Name",
    artisan: "Artisan Name",
};

function generateSectionTableHeader() {
    let head = $("<thead>");
    _.each(standColumn, function(val, key) {
        head.append("<th>" + val + "</th>");
    });
    return head;
}

const StandRow = Backbone.View.extend({

    tagName: "tr",

    render: function() {

        console.log("Rendering row");
        const self = this;
        _.each(standColumn, function(val, key) {
            console.log("Getting " + key);
            const column = "<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>";
            console.log(column);
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

const StandTable = Backbone.View.extend({

    // If the model changes then render the view again
    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {

        console.log("Rendering table");
        const title = $("<h1>Stands</h1>");
        const table = $("<table class=\"table table-striped\">");
        // Generate table header
        table.append(generateSectionTableHeader());
        let tbody = $("<tbody id=\"standBody\"> </tbody>");
        this.model.each(function(section) {

            const standRowView = new StandRow({ $el: this.$el, model: section });
            tbody.append(standRowView.render().$el);
        });
        title.appendTo("#standsTable")
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});