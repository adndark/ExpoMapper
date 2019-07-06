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
      // Add label to options
      merged.label = this.label;
      merged.visualId = this.visualId;
      merged.parentObject = this;
      return new SectionComponent(merged);
    }

    getDefaultVisualOptions(){
      return {
        width: 200,
        height:200,
        fill: "#9abaed",
      }
    }
}

const SectionComponent = fabric.util.createClass(GenericComponent, {

    type: 'section',

    initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        this.set('visualId', options.visualId || '');
    },

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '10px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.visualId + " - " + this.label, -this.width/2, -this.height/2 + 20);
    }
});