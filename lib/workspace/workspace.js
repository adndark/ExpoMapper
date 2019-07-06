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

        // Coordenates to spawn new objects
        this.initCoordsDisplace = 15;
        this.spawnCoords = {
            x: this.initCoordsDisplace,
            y: this.initCoordsDisplace
        }
        this.selected = null;
    }

    getWorkspace() {
        return $("#"+ this.workspaceId);
    }

    getFloor(){
        return this.floor;
    }

    getSelectedObject() {
        return this.selected;
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
        this.floor = this._addFloor(id, label, options);
    }

    addSection(id, visualId, label) {
        // Get spawn coordinates
        const visualOptions = this._getSpawnCoordinates();
        // Create section
        const section = new Section(id, visualId, label, this, visualOptions);
        // Add section object to list sections
        this.sections.push(section);
        // Add section's component to canvas
        this._addToCanvas(section.getComponent());
        // Update spawn coordinates so next
        // object uses new coordinates.
        this._updateSpawnCoordinates();
    }

    addStand(id, visualId, label) {
        // Get sapwn coordinates
        const visualOptions = this._getSpawnCoordinates();
        // Create stand
        const stand = new Stand(id, visualId, label, this, visualOptions);
        // Add stand to stands list
        this.stands.push(stand);
        // Add stand's component to canvas
        this._addToCanvas(stand.getComponent());
        // Udpate spawn coordinates
        this._updateSpawnCoordinates();
        console.log("Added stand with id " + id + " visualId: "+ visualId + " label: " + label);
    }

    getSectionById(id) {

        for (const item of this.sections) {
            if(id.localeCompare(item.id) == 0) {
                return item;
            }
        }
        console.log("No section found for id " + id);
    }

    getStandById(id) {
        for (const item of this.stands) {
            if(id.localeCompare(item.id) == 0) {
                return item;
            }
        }
        console.log("No stand found for id " + id);
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
            return;
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

    _addFloor (id, label, visualOptions) {

        // Create floor
        const floor = new Floor(id, label, this, visualOptions);
        console.log("Creating floor " + floor.label + " with options " + JSON.stringify(visualOptions));
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

    _getSpawnCoordinates () {
        return {
            top: this.spawnCoords.y,
            left: this.spawnCoords.x
        };
    }

    _updateSpawnCoordinates () {
        this.spawnCoords.x = this.spawnCoords.x + this.initCoordsDisplace;
        this.spawnCoords.y = this.spawnCoords.y + this.initCoordsDisplace;
    }

    _canvasObjectHandler(parent, callback) {
        return function(options) {
            // If options are null or there is no target
            if(!options || !options.target) {
                return;
            }
            // Set object's index
            parent._moveObjectsToIndex(parent);
            // Set object selected
            console.log("Selected object");
            console.log(options.target.getParentObject());
            parent.selected = options.target.getParentObject();
            // Call callback function with objects data
            callback(options.target.getParentObject());
        }
    }

    _moveObjectsToIndex(workspace) {

        // Move workspace to index
        workspace.floor.moveToIndex();
        // Move sections to index
        workspace.sections.forEach(function (item, index) {
            item.moveToIndex();
        });
        // Move stands to index
        workspace.stands.forEach(function (item, index) {
            item.moveToIndex();
        });
    }
}

$('document').ready(function() {
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

        workspace.getStandById("112").setLabel("Artesano 1");

        workspace.getSectionById("10").setLabel("Section 1");

        workspace.getStandById("113").setVisualId("Art");

        console.log(workspace.getSelectedObject());
        //workspace.removeStand("113");
    }, 3000);
});