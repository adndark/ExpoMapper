const GenericComponent = fabric.util.createClass(fabric.Rect, {

    type: null,
    id: null,

    initialize: function(options) {
        options || (options = { });

        this.callSuper('initialize', options);
        this.set("id", options.id || "");
        this.set("label", options.label || "");
        this.set("parentObject", options.parentObject || "")
        this.set("locked", false);
        this.set("visualId", options.visualId || "");
        this.set("labelFont", options.labelFont || "");
        this.set("labelFillStyle", options.labelFillStyle || "");
        this.set("labelPosition", options.labelPosition || "top-center");
    },

    opaque: function(){
        this.opacity = .50;
    },

    getParentObject(){
        return this.parentObject;
    },

    isLocked() {
        return this.locked;
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
        this.locked = boolean;
    },

    _renderLabel(ctx) {
        const position = this._getLabelPosition(this.labelPosition);
        ctx.font = this.labelFont;
        ctx.fillStyle = this.labelFillStyle;
        if(this.visualId && this.label) {
            ctx.fillText(this.visualId + " - " + this.label, position.x, position.y);
        } else if (this.visualId && !this.label) {
            ctx.fillText(this.visualId, position.x, position.y);
        } else if(this.label) {
            ctx.fillText(this.label, position.x, position.y);
        }
    },

    _getLabelPosition(value){
        if(value == "top-left") {
            return {
                x: -this.width / 2,
                y: -this.height / 2 + 20
            };
        }

        if(value == "top-center") {

            const labelSize = this.label.length * 20;
            return {
                x: labelSize / 2,
                y: -this.height / 2 + 20
            };
        }
    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
            spaceType: this.get("spaceType"),
            id: this.get("id"),
            label: this.get("label"),
            visualId: this.get("visualId"),
            locked: this.get("locked"),
            labelFont: this.get("labelFont"),
            labelFillStyle: this.get("labelFillStyle"),
            labelPosition: this.get("labelPosition")
        });
    },

    _render: function(ctx) {
        this.callSuper("_render", ctx);

        // Render's object label
        this._renderLabel(ctx);
    }
});