// Define workspace class
class Workspace {

    constructor(workspaceId, canvasId) {
        console.log("Initializing workspace class");
        this.workspaceId = workspaceId
        this.canvasId = canvasId;
        this.canvas = this.init(this.worksapaceId, this.canvasId);
        this.floor = null;
    }

    getWorkspace() {
        return $("#"+ this.workspaceId);
    }

    init(workspaceId, canvasId) {
        // Get the canvas from the DOM
        var $workspace = this.getWorkspace();
        // Create canvas element and append it into the workspace
        $workspace.append("<canvas id=" + canvasId + "></canvas>");
        // Set the canvas dimentions based on parent container
        var dimensions = {
            "width": $workspace.width(),
            "height": $workspace.height()
        }
        // create canvas
        console.log("Creating canvas with properties " + JSON.stringify(dimensions));
        const canvas = new fabric.Canvas(canvasId);
        canvas.setDimensions(dimensions);
        console.log("Canvas created within " + this.workspaceId + " in canvas element " + this.canvasId);
        return canvas;
    }

    addFloor (options){
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
        // Make it not selectable
        override.selectable = false;
        this.floor = this._addFloor(override);
    }

    _addFloor (options){

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

    _getFloorDimensions(scaledByPercentage){
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

}

$('document').ready(function(){
    var workspace = new Workspace('workspaceContainer', 'workspaceCanvas');
    workspace.addFloor({
        label: 'Test Floor 123'
    });
    workspace.addFloor({
        label: 'Test Floor 123asdfasdf'
    });
});