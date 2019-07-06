class Section extends GenericSpace {

    constructor (id, visualId, label, workspace, visualOptions){
        // Id for linking object to a DB instance
        if(!id || !label) {
          console.log("Id or label are empty, not creating instance");
          return null;
        }
        super(id, visualId, label, "section", null, 1, null, workspace);
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
        labelPosition: "top-center"
      }
    }
}

const SectionComponent = fabric.util.createClass(GenericComponent, {

    type: 'section',
});