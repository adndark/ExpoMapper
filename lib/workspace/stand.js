class Stand extends GenericSpace {

    constructor(id, visualId, label, workspace, visualOptions) {
        super(id, visualId, label, "stand", null, 1000, workspace);
        this.component = this._initComponent(visualOptions);
    }

    _initComponent(visualOptions) {
        const defaultOptions = this.getDefaultVisualOptions();
        const merged = { ...defaultOptions, ...visualOptions };
        return new StandComponent(merged);
    }

    getDefaultVisualOptions() {
        return {
            width: 80,
            height: 80,
            fill: "#5882c4",
            label: this.label,
            visualId: this.visualId,
            parentObject: this,
            labelFont: "10px Helvetica",
            labelFillStyle: "#333",
            labelPosition: "top-left"
        }
    }
}

const StandComponent = fabric.util.createClass(GenericComponent, {

    type: 'stand',
});