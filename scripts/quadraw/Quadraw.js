"use strict";
var quadraw = function quadraw(_scale, context, width, height) {
  var drawables = {};
  var drawableCount = 0;
  var colors = {
    coordPlane: "rgb(140,150,140)",
    curve: "rgb(200,20,20)",
    text: "rgb(44,66,44)",
  };

  var draw = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(drawables).map(function (index) {
      drawables[index].draw();
    });
  };

  var quadraw = function () {
    //push coordinates plane at first
    drawables[drawableCount++] = createCoordsPlane(colors.coordPlane, this);

    this.scale =  _scale;
    this.sceneWidth= width;
    this.sceneHeight= height;

    this.setScale = function setScale(_scale) {
      this.scale = _scale;
      draw();
    };
    this.calcScenePoint = function (point) {
      var scenePoint = {x: 0, y: 0};
      var halfSceneWidth = (this.sceneWidth / 2);
      var halfSceneHeight = (this.sceneHeight / 2);

      var x = point.x / (this.scale / 2);
      var y = point.y / (this.scale / 2);
      scenePoint.x = (x * (halfSceneWidth)) + halfSceneWidth;
      scenePoint.y = (y * -(halfSceneHeight)) + halfSceneHeight;
      return scenePoint;
    };
    this.addCurve = function addParable(params, color) {
      //return the index of the Parable
      var index = drawableCount++;
      drawables[index] = createCurve(params, color, index, this);
      draw();
      return index;
    };
    this.getCurveList = function getCurves() {
      var curves = [];
      Object.keys(drawables).map(function (index) {
        if (index != 0) {
          curves.push(drawables[index]);
        }
      });

      return curves;
    };
    this.removeCurve = function removeCurve(curveIndex) {
      delete drawables[curveIndex];
      draw();
    };
  };

  var quadrawInstance = new quadraw();
  draw();
  return quadrawInstance;
};
