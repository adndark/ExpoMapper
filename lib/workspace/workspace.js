// Define workspace class
class Workspace {

    constructor(workspaceId, canvasId) {
        console.log("Initializing workspace class");
        this.workspaceId = workspaceId
        this.canvasId = canvasId;
        // Create canvas first
        this.canvas = this._createCanvas();
        this.floor = null;
        // Init function, it doesn't do anything yet
        this._init(this.worksapaceId, this.canvasId);

        // List that will hold sections
        this.sections = [];
        this.stands = [];
    }

    getWorkspace() {
        return $("#"+ this.workspaceId);
    }

    getFloor(){
        return this.floor;
    }

    _init(workspaceId, canvasId) {
    }

    _addToCanvas(object) {
        if(!object) {
            console.log("Cannot add empty object to canvas");
        }
        if(!this.canvas) {
            console.log("Cannot add to empty canvas, create a canvas first");
        }
        object.getParentObject().setCanvas(this.canvas);
        this.canvas.add(object);
    }

    addFloor(id, label) {

        if(!id) {
            console.log("A floor must have an id");
        }
        // Validate there is not a floor already.
        // If so return.
        if (this.floor) {
            console.log("There is already a floor " + this.floor.label + " not creating new");
            return;
        }
        // Override options with default scaled workspace
        // dimensions
        const options = {};
        const scaledDimensions = this._getFloorDimensions(10);
        // Default values for floor
        options.width = scaledDimensions.width;
        options.height = scaledDimensions.height;
        options.fill = "#e9ebf0";
        if(!label){
            label = "Main floor";
        }
        options.label = label;
        this.floor = this._addFloor(id, options);
    }

    addSection(id, visualId, label){
        const section = new Section(id, visualId, label, this);
        this.sections.push(section);
        this._addToCanvas(section.getComponent());
    }

    addStand(id, visualId, label){
        const stand = new Stand(id, visualId, label, this);
        this.stands.push(stand);
        this._addToCanvas(stand.getComponent());
    }

    getSectionById(tag) {
        this.sections.forEach(function (item, index) {
            if(item.id == tag){
                return item;
            }
        });
    }

    getStandById(tag) {
        this.stands.forEach(function (item, index) {
            if(item.id == tag){
                return item;
            }
        });
    }

    removeSection(id) {
        this._removeFromCollection(this.sections, id);
        console.log("Section with id " + id + " removed");
    }

    removeStand(id) {
        this._removeFromCollection(this.stands, id);
        console.log("Stand with id " + id + " removed");
    }

    _removeFromCollection(collection, id) {
        const itemMetadata = {};
        collection.forEach(function (item, index) {
            if(item.id == id) {
                itemMetadata.item = item;
                itemMetadata.index = index;
                console.log("Item found " + item.id);
            }
        });

        if(!itemMetadata.item) {
            console.log("No item found for removal");
        }
        this.canvas.remove(itemMetadata.item.getComponent());
        collection.splice(itemMetadata.index, 1);
    }

    lock(boolean) {
        // Lock floor
        this.floor.lock(true);
        // Lock sections
        this.sections.forEach(function (item, index) {
            item.lock(true);
        });
        // Lock stands
        this.stands.forEach(function (item, index) {
            item.lock(true);
        });
    }

    setCanvasEventHandler(event, callback) {
        // Create handler function
        const handler = this._canvasObjectHandler(this, callback);
        // Set event listeners
        this.canvas.on(event, handler);
    }

    _addFloor (id, options) {

        // Create floor
        const floor = new Floor(id, options, this);
        console.log("Creating floor " + floor.label + " with options " + JSON.stringify(options));
        // Add floor to canvas
        console.log("Adding floor to workspace");
        const floorComponent = floor.getComponent();
        this._addToCanvas(floorComponent);
        // Center floor, vertical and horizontal
        this.canvas.centerObject(floorComponent);
        return floor;
    }

    _createCanvas() {
        // Get the workspace from the DOM
        const $workspace = this.getWorkspace();
        // Create canvas element and append it into the workspace
        $workspace.append("<canvas id=" + this.canvasId + "></canvas>");
        // Set the canvas dimentions based on parent container
        const options = {
            "width": $workspace.width(),
            "height": $workspace.height(),
            "preserveObjectStacking": true
        }
        // Create canvas
        console.log("Creating canvas with properties " + JSON.stringify(options));
        const canvas = new fabric.Canvas(this.canvasId, options);
        console.log("Canvas created within " + this.workspaceId + " in canvas element " + this.canvasId);
        return canvas;
    }

    _getFloorDimensions(scaledByPercentage) {
        const $workspace = this.getWorkspace();
        const width = $workspace.width();
        const height = $workspace.height();
        const percentage = 100;

        const scaledWidth = Math.round(width - (width * (scaledByPercentage/percentage)));
        const scaledHeight = Math.round(height - (height * (scaledByPercentage/percentage)));
        return {
            width : scaledWidth,
            height : scaledHeight
        }
    }

    _canvasObjectHandler(parent, callback){
        return function(options) {
            // If options are null or there is no target
            if(!options || !options.target) {
                return;
            }
            // Set object's index
            parent._moveObjectsToIndex(parent);
            // Call callback function with objects data
            callback(options.target.getParentObject());
        }
    }

    _moveObjectsToIndex(workspace){

        // Move workspace to index
        workspace.floor.moveToIndex();
        // Move sections to index
        console.log("Sections " + workspace.sections.length);
        workspace.sections.forEach(function (item, index) {
            item.moveToIndex();
        });
        // Move stands to index
        console.log("Stands " + workspace.stands.length);
        workspace.stands.forEach(function (item, index) {
            item.moveToIndex();
        });
    }
}

$('document').ready(function(){
    var workspace = new Workspace('workspaceContainer', 'workspaceCanvas');

    workspace.addFloor('1', null);

    workspace.addFloor('2', 'Test Floor 123asdfasdf');


    function doSomething(data) {
        console.log("Callback function");
        console.log(data);
    }

    workspace.setCanvasEventHandler("mouse:down", doSomething);
    workspace.setCanvasEventHandler('object:selected', doSomething);

    setTimeout(function() {
        console.log("locking floor");
        workspace.getFloor().lock(true);
        //workspace.floor.getComponent().opacity = .50;
        workspace.addSection("10","E1UX", "De la Villa");

        workspace.addSection("20","E1UX", "De la Villa");

    }, 1000);

    setTimeout(function() {

        workspace.addStand("100","E1UX-10", "De la Villa");

        workspace.addStand("111","E1UX-11", "De la Villa");

        workspace.addStand("112","E1UX-11", "De la Villa");

        workspace.addStand("113","E1UX-11", "De la Villa");

        console.log("Change floor's name");
        workspace.getFloor().setLabel("Test");
    }, 2000);

    setTimeout(function() {
        workspace.removeSection("20");
        
        workspace.removeStand("111");

        workspace.removeStand("112");

        workspace.removeStand("113");
    }, 3000);
});