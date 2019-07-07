class Section extends GenericSpace {

    constructor (id, visualId, label, workspace, visualOptions) {
        super(id, visualId, label, "section", null, 1, workspace);
        this.component = this._initComponent(visualOptions);
    }

    _initComponent(visualOptions){
      const defaultOptions = this.getDefaultVisualOptions();
      const merged = {...defaultOptions, ...visualOptions};
      return new SectionComponent(merged);
    }

    getDefaultVisualOptions(){
      return {
        width: 200,
        height:200,
        fill: "#9abaed",
        label: this.label,
        visualId: this.visualId,
        parentObject: this,
        labelFont: "15px Helvetica",
        labelFillStyle: "#333",
        labelPosition: "top-left"
      }
    }
}

const SectionComponent = fabric.util.createClass(GenericComponent, {

    type: 'section',
});