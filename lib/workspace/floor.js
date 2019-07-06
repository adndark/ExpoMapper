class Floor extends GenericSpace {

    constructor (id, visualOptions){

        super(id, null, visualOptions.label, "floor", null, 0, null);
        // Create Canvas Floor component
        visualOptions.parentObject = this;
        this.component = new FloorComponent(visualOptions);
    }
}

const FloorComponent = fabric.util.createClass(GenericComponent, {

    type: 'floor',

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '15px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});