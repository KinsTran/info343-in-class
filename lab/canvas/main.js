paper.install(window);

var canvas = document.getElementById('myCanvas');
var pencil, eraser, bigEraser, circle;
window.onload = function() {


    paper.setup(canvas);

    pencil = new Tool();
    var path;

    pencil.onMouseDown = function(event) {
        path = new Path();
        path.strokeColor = "#0B3";
        path.add(event.point);
    }


    onMouseDrag = function(event) {
        path.add(event.point);
    }

    pencil.onMouseDrag = onMouseDrag;

    eraser = new Tool();

    eraser.onMouseDown = function(event) {
        path = new Path();
        path.strokeColor = "white";
        path.strokeWidth = 10;
        path.add(event.point)
    }

    eraser.onMouseDrag = onMouseDrag;

    bigEraser = new Tool();
    bigEraser.onMouseDown = function(event) {
        path = new Path();
        path.strokeColor = "white";
        path.strokeWidth = 100;
        path.add(event.point)
    }
    bigEraser.onMouseDrag = onMouseDrag;

    circle = new Tool();
    circle.onMouseDown = function(event) {
        var x = event.clientX;
        var y = event.clientY;
        path = new Path.Circle(new Point (event.downPoint, event.point), 20);
        path.style = {
            fillColor: "#0B3"
        }
    }
    circle.onMouseDrag = function(event) { // BROKEN
        path.add(event.point);
    }
}