class Floor {

    constructor (id, visualOptions){
        this.id = id;
        this.label = visualOptions.label;
        this.type = "floor";
        visualOptions.parentObject = this;
        this.component = new FloorComponent(visualOptions);
        this.index = 0;
        this.canvas = null;
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    getComponent() {
        return this.component;
    }

    getIndex() {
        return this.index;
    }

    lock(boolean) {
        this.component.lock(boolean);
    }

    setLabel(label){
        this.label = label;
        this.component.label = label;
        this.component.dirty = true;
        this.canvas.renderAll();
    }
}

const FloorComponent = fabric.util.createClass(GenericObject, {

    type: 'floor',

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '15px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});