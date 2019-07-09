// const sectionCollection = new SectionsCollection([], { FloorId: 1 });

// sectionCollection.fetch({
//     success: function() {
//         console.log("sectionCollection");
//         console.log(JSON.stringify((sectionCollection)));
//         console.log((sectionCollection));
//         console.log("Floor with id " + JSON.stringify(sectionCollection.get(6)));
//         console.log(sectionCollection.get(6));

//     }
// });



// // View for all sections
// // const sectionsView = Backbone.View.extend({
// //     el: 'body', 
// //     render: function () { 
// //         var viewHtml = '<table border="1">'; 
// //     }
// // });


// // var collectionView = new sectionsView({
// //     el: $("#sectionsBody"),
// //     selectable: true,
// //     collection: sectionCollection,
// //     modelView: sectionsView
// // });

// const SearchView = Backbone.View.extend({
//     // initialize: function() {
//     //     alert("Alerts suck.");
//     // }

//     initialize: function() {
//         this.render();
//     },
//     render: function() {
//         // Compile the template using underscore
//         var variables = { search_label: "My Search" };
//         var template = _.template($("#search_template").html(), variables);
//         // Load the compiled HTML into the Backbone "el"
//         this.$el.html(template);
//     }
// });
// const search_view = new SearchView({ el: $("#search_template") });

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
            console.log("Getting " + key);
            const column = "<td contenteditable='true' id='" + key + "'>" + self.model.get(key) + "</tr>";
            console.log(column);
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
        const title = $("<h1>Sections</h1>");
        const table = $("<table class=\"table table-striped aaaa\">");
        // Generate table header
        table.append(generateSectionTableHeader());
        let tbody = $("<tbody id=\"sectionBody\"> </tbody>");
        this.model.each(function(section) {
            console.log("Artisan " + JSON.stringify(section));
            const sectionRowView = new SectionRow({ $el: this.$el, model: section });
            tbody.append(sectionRowView.render().$el);
        });
        title.appendTo("#sectionsTable")
        table.append(tbody);
        this.$el.append(table);
        return this;
    }

});