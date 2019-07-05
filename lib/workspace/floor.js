const Floor = fabric.util.createClass(fabric.Rect, {

    type: 'floor',
    id: null,

    initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        this.set('id', options.id || '');
        this.set('label', options.label || '');
    },

    lock: function(boolean) {
        this.lockMovementX = boolean;
        this.lockMovementY =boolean;
        this.lockRotation = boolean;
        this.lockScalingFlip = boolean;
        this.lockScalingX = boolean;
        this.lockScalingY = boolean;
        this.lockSkewingX = boolean;
        this.lockSkewingY = boolean;
    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
        id: this.get('id'),
        label: this.get('label')
        });
    },

    _render: function(ctx) {
        this.callSuper('_render', ctx);

        ctx.font = '20px Helvetica';
        ctx.fillStyle = '#333';
        ctx.fillText(this.label, -this.width/2, -this.height/2 + 20);
    }
});