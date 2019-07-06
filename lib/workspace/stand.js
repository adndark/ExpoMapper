class Stand extends GenericSpace {

    constructor (id, visualId, label){
        // Id for linking object to a DB instance
        if(!id || !label) {
          console.log("Id or label are empty, not creating instance");
          return null;
        }
        super(id, visualId, label, "stand", null, 2, null);
        this.component = this._initComponent();
    }

    _initComponent(){
      const options = this.getDefaultVisualOptions();
      // Add label to options
      options.label = this.label;
      options.visualId = this.visualId;
      options.parentObject = this;
      return new StandComponent(options);
    }

    getDefaultVisualOptions(){
      return {
        width: 80,
        height:80,
        fill: "#5882c4",
      }
    }
}

const StandComponent = fabric.util.createClass(GenericObject, {

    type: 'stand',

    initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        this.set('visualId', options.visualId || '');
    },

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '8px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.visualId + " - " + this.label, -this.width/2, -this.height/2 + 20);
    }
});