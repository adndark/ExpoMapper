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
        this.sections = []
    }

    getWorkspace() {
        return $("#"+ this.workspaceId);
    }

    _init(workspaceId, canvasId) {
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
        const section = new Section(id, visualId, label);
        this.sections.push(section);
        this.canvas.add(section.getComponent());
    }

    addStand(id, visualId, label){
        const section = new Stand(id, visualId, label);
        this.sections.push(section);
        this.canvas.add(section.getComponent());
    }

    lockFloor(boolean) {
        if(!this.floor) {
            console.log("There is no floor to lock, please create a floor");
            return;
        }
        this.floor.getComponent().lock(boolean);
    }

    setCanvasEventHandler(event, callback) {
        // Create handler function
        const handler = this._canvasObjectHandler(this, callback);
        // Set event listeners
        this.canvas.on(event, handler);
    }

    _addFloor (id, options) {

        // Create floor
        const floor = new Floor(id, options);
        console.log("Creating floor " + floor.label + " with options " + JSON.stringify(options));
        // Add floor to canvas
        console.log("Adding floor to workspace");
        const floorComponent = floor.getComponent();
        this.canvas.add(floorComponent);
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
            console.log("Processing event");
            console.log(JSON.stringify(options));

            console.log("Setting index " + options.target.parentObject.getIndex() +" for object " + options.target.type);
            options.target.moveTo(options.target.parentObject.getIndex());
            //parent.canvas.renderAll();

            //if(options.target.type == 'floor'){
              //  console.log("Sending floor to back")
                //parent.canvas.sendToBack(options.target);
                //parent.canvas.renderAll();
            //}

            console.log("Object clicked type:", options.target.type);
            const data = {
                type: options.target.type,
                label: options.target.label,
                id: options.target.id
            }
            callback(data);
        }
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
        //workspace.lockFloor(true);
        //workspace.floor.getComponent().opacity = .50;
        workspace.addSection("10","E1UX", "De la Villa");
    }, 1000);

    setTimeout(function() {
        //workspace.lockFloor(true);
        //workspace.floor.getComponent().opacity = .50;
        workspace.addStand("10","E1UX", "De la Villa");
    }, 2000);
});