"use strict";
var createCurve = function createCurve(params, color, index, quadraw) {
    var calcXs = function (vars) {
      var a = vars.a;
      var b = vars.b;
      var c = vars.c - quadraw.scale / 2;
      var bPow2 = Math.pow(b, 2);

      //abc formulars
      var xMinus = ((b * -1) - Math.sqrt(Math.abs(bPow2 - (4 * a * c)))) / (2 * a);
      var xPlus = ((b * -1) + Math.sqrt(Math.abs(bPow2 - (4 * a * c)))) / (2 * a);
      return {"xMinus": xMinus, "xPlus": xPlus};
    };

    var calcAngularPoint = function (vars) {
      var aP = {x: 0, y: 0};
      aP.x = (vars.b) / (2 * vars.a) * -1;
      aP.y = (vars.c) - ((Math.pow(vars.b, 2)) / (4 * vars.a));
      return aP;
    };


    var drawCurve = function drawCurve() {
      //gets only the sign of a variable -> stolen from stackoverflow
      var sign = params.a ? params.a < 0 ? -1 : 1 : 0;

      var leftTopPoint = quadraw.calcScenePoint({x: calcXs(params).xMinus, y: (quadraw.scale / 2) * sign});
      var angularY = calcAngularPoint(params).y - ((quadraw.scale / 2 - calcAngularPoint(params).y) * sign);
      var angularPoint = quadraw.calcScenePoint({x: calcAngularPoint(params).x, y: angularY});
      var rightTopPoint = quadraw.calcScenePoint({x: calcXs(params).xPlus, y: (quadraw.scale / 2) * sign});

      if (params.hasOwnProperty('xMin') || params.hasOwnProperty('xMax')) {
        // the clipping starts
        ctx.save();

        ctx.beginPath();

        var clippingLeft = {x: 0, y: 0};
        var clippingRight = {x: quadraw.sceneWidth, y: quadraw.sceneHeight};
        var xMin = -quadraw.scale / 2;

        if (params.hasOwnProperty('xMin')) {
          clippingLeft = quadraw.calcScenePoint({x: params.xMin, y: 0});
          xMin = params.xMin;
        }
        if (params.hasOwnProperty('xMax')) {
          clippingRight = quadraw.calcScenePoint(
            {x: ((params.xMax + Math.abs(xMin)) - (quadraw.scale / 2)), y: 0}
          );
        }
        ctx.rect(clippingLeft.x, 0, clippingRight.x, quadraw.sceneHeight);

        // actually clip
        ctx.clip();
      }

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;

      ctx.moveTo(leftTopPoint.x, leftTopPoint.y); // first point
      ctx.quadraticCurveTo(angularPoint.x, angularPoint.y, rightTopPoint.x, rightTopPoint.y);
      ctx.stroke();

      // restore clipping
      ctx.restore();
    };

    var curve = {
      index: index,
      draw: function draw() {
        drawCurve();
        return this;
      },
      getParamsString: function getParamsString() {
        var paramsString = "";
        if (params.a !== 0) paramsString += params.a;
        paramsString += "x²";
        if (params.b !== 0) {
          paramsString += params.b + "x";
        }
        if (params.c !== 0) paramsString += params.c;
        if (params.hasOwnProperty('xMin') || params.hasOwnProperty('xMax')) {
          paramsString += "(";
          if (params.hasOwnProperty('xMin')) {
            paramsString += "xMin: " + params.xMin;
            if (params.hasOwnProperty('xMax')) {
              paramsString += ", ";
            }
          }
          if (params.hasOwnProperty('xMax')) {
            paramsString += "xMax: " + params.xMax;
          }
          paramsString += ")";
        }

        return paramsString;
      }, getColor: function getColor() {
        return color;
      },

    };

    return Object.create(curve);
  }
  ;


