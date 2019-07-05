// Define workspace class
class Workspace {

    constructor(workspaceId, canvasId) {
        console.log("Initializing workspace class");
        this.workspaceId = workspaceId
        this.canvasId = canvasId;
        this.canvas = this._createCanvas();
        this.floor = null;
        this._init(this.worksapaceId, this.canvasId);
    }

    getWorkspace() {
        return $("#"+ this.workspaceId);
    }

    _init(workspaceId, canvasId) {
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
        }
        // Create canvas
        console.log("Creating canvas with properties " + JSON.stringify(options));
        const canvas = new fabric.Canvas(this.canvasId, options);
        console.log("Canvas created within " + this.workspaceId + " in canvas element " + this.canvasId);
        return canvas;
    }

    addFloor(options) {
        // Validate there is not a floor already.
        // If so return.
        if (this.floor) {
            console.log("There is already a floor " + this.floor.label + "not creating new");
            return;
        }

        const override = options;
        if(!options){
            override = {};
        }
        // Override options with default scaled workspace
        // dimensions
        const scaledDimensions = this._getFloorDimensions(10);
        override.width = scaledDimensions.width;
        override.height = scaledDimensions.height;
        // Override color
        override.fill = "#e9ebf0";
        this.floor = this._addFloor(override);
    }

    lockFloor(boolean) {
        if(!this.floor) {
            console.log("There is no floor to lock, please create a floor");
            return;
        }
        this.floor.lock(boolean);
    }

    _addFloor (options) {

        // Create floor
        const floor = new Floor(options);
        console.log("Creating floor " + floor.label + " with options " + JSON.stringify(options));
        // Add floor to canvas
        console.log("Adding floor to workspace");
        this.canvas.add(floor);
        // Center floor, vertical and horizontal
        this.canvas.centerObject(floor);
        return floor;
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

    _canvasObjectHandler(callback){
        return function(options) {
            // If options are null or there is no target
            if(!options || !options.target) {
                return;
            }
            console.log("Object clicked type:", options.target.type);
            const data = {
                type: options.target.type,
                label: options.target.label,
                id: options.target.id
            }
            callback(data);
        }
    }

    setCanvasOnMouseClickedHandler(callback) {
        // Create handler function
        const handler = this._canvasObjectHandler(callback);
        // Set event listeners
        this.canvas.on('mouse:down', handler);
    }
}

$('document').ready(function(){
    var workspace = new Workspace('workspaceContainer', 'workspaceCanvas');

    workspace.addFloor({
        label: 'Test Floor 123'
    });

    workspace.addFloor({
        label: 'Test Floor 123asdfasdf'
    });


    function doSomething(data) {
        console.log("Callback function");
        console.log(data);
    }

    workspace.setCanvasOnMouseClickedHandler(doSomething);

    setTimeout(function() {
        console.log("locking floor");
        workspace.lockFloor(true);
    }, 5000);
});