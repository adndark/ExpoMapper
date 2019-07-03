$('document').ready(function(){

// Create a canvas object, use 'canvas' object
var canvas = new fabric.Canvas('workspaceCanvas');

var rect = new fabric.Rect({
    top : 100,
    left : 100,
    width : 60,
    height : 70,
    fill : 'gray'
});

console.log("Adding canvas");

canvas.add(rect);

console.log(rect);


});

