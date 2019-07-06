class Section extends GenericSpace {

    constructor (id, visualId, label){
        // Id for linking object to a DB instance
        if(!id || !label) {
          console.log("Id or label are empty, not creating instance");
          return null;
        }
        super(id, visualId, label, "section", null, 1, null);
        this.component = this._initComponent();
    }

    _initComponent(){
      const options = this.getDefaultVisualOptions();
      // Add label to options
      options.label = this.label;
      options.visualId = this.visualId;
      options.parentObject = this;
      return new SectionComponent(options);
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