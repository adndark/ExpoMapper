class Floor extends GenericSpace {

    constructor (id, label, workspace, visualOptions) {

        super(id, null, label, "floor", null, 0, null);
        // Set default label if not provided
        if(!label) {
            this.label = "Main floor";
        }
        // Create floor component
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
        parentObject: this,
        labelFont: "25px Helvetica",
        labelFillStyle: "#333",
        labelPosition: "top-left"
      }
    }
}

const FloorComponent = fabric.util.createClass(GenericComponent, {

    type: 'floor',

});