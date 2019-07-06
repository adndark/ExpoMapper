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

    toObject: function() {
        return fabric.util.object.extend(this.callSuper('toObject'), {
        id: this.get('id'),
        label: this.get('label')
        });
    },
});