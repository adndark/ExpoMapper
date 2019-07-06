class Floor {

    constructor (id, visualOptions){
        this.id = id;
        this.label = visualOptions.label;
        visualOptions.parentObject = this;
        this.component = new FloorComponent(visualOptions);
        this.index = 0;
    }

    getComponent() {
        return this.component;
    }

    getIndex() {
        return this.index;
    }
}

const FloorComponent = fabric.util.createClass(GenericObject, {

    type: 'floor',

    // Set index to zero as floor must be
    // always at the bottom of the stack
    index: 0,

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '15px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});