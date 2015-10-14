"use strict";
const Quadraw = function Quadraw(_scale) {
  let drawables = {};
  let drawableCount = 0;
  const colors = {
    coordPlane: "rgb(200,200,200)",
    curve: "rgb(200,20,20)",
    text: "rgb(44,66,44)",
  };
  this.scale = _scale;

  //push coordinates plane at first
  drawables[drawableCount++] = new CoordsPlane(colors.coordPlane, this);

  const draw = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Object.keys(drawables).map(function(index) {
      drawables[index].draw();
    });
  };

  this.calcScenePoint = function (point) {
    let scenePoint = {x: 0, y: 0};
    let halfSceneWidth = (sceneWidth / 2);
    let halfSceneHeight = (sceneHeight / 2);

    let x = point.x / (this.scale / 2);
    let y = point.y / (this.scale / 2);
    scenePoint.x = (x * (halfSceneWidth)) + halfSceneWidth;
    scenePoint.y = (y * -(halfSceneHeight)) + halfSceneHeight;
    return scenePoint;
  };
  this.addCurve = function addParable(params, color) {
    //return the index of the Parable
    let index = drawableCount++;
    drawables[index] = new Curve(params, color, this);
    draw();
    return index;
  };
  this.removeCurve = function removeParable(index) {
    drawables[index] = null;
    draw();
  };

  return this;
};
