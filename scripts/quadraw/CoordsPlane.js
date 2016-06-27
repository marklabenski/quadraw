"use strict";
var createCoordsPlane = function createCoordsPlane(color, quadraw) {
  /**
   * Draw the grid lines
   *
   * @private
   * @return void
   */
  var drawLines = function drawLines() {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(quadraw.sceneWidth / 2, 0);
    ctx.lineTo(quadraw.sceneWidth / 2, quadraw.sceneHeight);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(quadraw.sceneWidth, quadraw.sceneHeight / 2);
    ctx.lineTo(0, quadraw.sceneHeight / 2);
    ctx.stroke();
    ctx.closePath();
  };
  /**
   * Draw the seperator lines and numbers
   *
   * @private
   * @return void
   */
  var drawSeperators = function drawSeperators() {
    var from = -quadraw.scale / 2;
    var to = quadraw.scale / 2;
    //fill for text
    ctx.fillStyle = "rgb(100,100,100)";
    //draw all the seperators
    for (var i = from; i <= to; i++) {
      //don't draw some in the middle
      if (i === 0) continue;

      var pointY = quadraw.calcScenePoint({"x": 0, "y": i});
      var pointX = quadraw.calcScenePoint({"x": i, "y": 0});

      //draw the y axis seperators
      ctx.beginPath();
      ctx.moveTo(pointY.x - 8, pointY.y);
      ctx.lineTo(pointY.x + 8, pointY.y);
      ctx.stroke();

      ctx.fillText(i, pointY.x + 10, pointY.y + 3);

      //draw the x axis seperators
      ctx.beginPath();
      ctx.moveTo(pointX.x, pointX.y - 8);
      ctx.lineTo(pointX.x, pointX.y + 8);
      ctx.stroke();
      ctx.fillText(i, pointX.x - 3, pointX.y + 20);
    }
  };

  var coordsPlane = {
    /**
     * Initiate the drawing process
     *
     * @return void
     */
    draw: function draw() {
      ctx.font = "10px sans-serif";
      ctx.fillStyle = "rgb(43,43,43)";
      ctx.fillRect(0, 0, quadraw.sceneWidth, quadraw.sceneHeight);

      drawLines();
      drawSeperators();
    }
  };

  return (Object.create(coordsPlane));
};



