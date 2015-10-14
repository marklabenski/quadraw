"use strict";
const CoordsPlane = function CoordPlane(color, quadraw) {
  let scale = quadraw.scale;
  const drawLines = function drawLines() {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(sceneWidth / 2, 0);
    ctx.lineTo(sceneWidth / 2, sceneHeight);
    ctx.stroke();

    ctx.moveTo(sceneWidth, sceneHeight / 2);
    ctx.lineTo(0, sceneHeight / 2);
    ctx.stroke();
  };
  const drawSeperators = function drawSeperators() {
    let from = -scale / 2;
    let to = scale / 2;
    //draw all the seperators
    for (var i = from; i <= to; i++) {
      //don't draw some in the middle
      if (i === 0) continue;

      let pointY = quadraw.calcScenePoint({"x": 0, "y": i});
      let pointX = quadraw.calcScenePoint({"x": i, "y": 0});

      //draw the y axis seperators
      ctx.beginPath();
      ctx.moveTo(pointY.x - 10, pointY.y);
      ctx.lineTo(pointY.x + 10, pointY.y);
      ctx.stroke();

      //draw the x axis seperators
      ctx.beginPath();
      ctx.moveTo(pointX.x, pointX.y - 10);
      ctx.lineTo(pointX.x, pointX.y + 10);
      ctx.stroke();
    }
  };
  this.draw = function draw() {
    drawLines();
    drawSeperators();
  };
  return this;
};
