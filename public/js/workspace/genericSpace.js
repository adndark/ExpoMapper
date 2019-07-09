class GenericSpace {

    constructor(id, visualId, label, type, component, index, workspace) {
        this.id = id;
        this.visualId = visualId;
        this.label = label;
        this.type = type;
        this.component = component;
        this.index = index;
        this.canvas = workspace.canvas;
        this.workspace = workspace;
    }

    setLabel(label) {
        this.label = label;
        this.component.label = label;
        this.component.dirty = true;
        this.canvas.renderAll();
    }

    setVisualId(visualId) {
        this.visualId = visualId;
        this.component.visualId = visualId;
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

    moveToIndex() {
        this.component.moveTo(this.index);
    }

    bringToFront() {
        this.component.bringToFront();
    }

    getWorkspace() {
        return this.workspace;
    }

    lock(boolean) {
        this.component.lock(boolean);
    }

    isLocked() {
        return this.component.isLocked();
    }
}