class GenericSpace {

    constructor (id, visualId, label, type, component, index, canvas){
        this.id = id;
        this.visualId = visualId;
        this.label = label;
        this.type = type;
        this.component = component;
        this.index = index;
        this.canvas = canvas;
    }

    setLabel(label){
        this.label = label;
        this.component.label = label;
        this.component.dirty = true;
        this.canvas.renderAll();
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    getComponent() {
        return this.component;
    }

    getIndex() {
        return this.index;
    }

    lock(boolean) {
        this.component.lock(boolean);
    }

    isLocked(){
        return this.component.isLocked();
    }
}