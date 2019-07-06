class Floor extends GenericSpace {

    constructor (id, label, workspace, visualOptions) {

        super(id, null, label, "floor", null, 0, null);
        // Create Canvas Floor component
        visualOptions.parentObject = this;
        if(!label) {
            this.label = "Main floor";
        }
        this.component = this._initComponent(visualOptions);
    }

    _initComponent(visualOptions) {
      const defaultOptions = this.getDefaultVisualOptions();
      const merged = {...defaultOptions, ...visualOptions};
      return new FloorComponent(merged);
    }

    getDefaultVisualOptions(){
      return {
        width: 80,
        height:80,
        fill: "#e9ebf0",
        label: this.label,
        parentObject: this
      }
    }
}

const FloorComponent = fabric.util.createClass(GenericComponent, {

    type: 'floor',

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '25px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});