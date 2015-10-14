"use strict";
const Curve = function Curve(params, color, quadraw) {
  const calcXs = function (vars) {
    let a = vars.a;
    let b = vars.b;
    let c = vars.c - quadraw.scale / 2;
    let bPow2 = Math.pow(b, 2);
    //abc formulars
    let xMinus = ((b * -1) - Math.sqrt(Math.abs(bPow2 - (4 * a * c)))) / (2 * a);
    let xPlus = ((b * -1) + Math.sqrt(Math.abs(bPow2 - (4 * a * c)))) / (2 * a);
    return {"xMinus": xMinus, "xPlus": xPlus};
  };

  const calcAngularPoint = function (vars) {
    let aP = {x: 0, y: 0};
    aP.x = (vars.b) / (2 * vars.a) * -1;
    aP.y = (vars.c) - ((Math.pow(vars.b, 2)) / (4 * vars.a));
    return aP;
  };


  const drawCurve = function drawCurve() {
    const sign = params.a?params.a<0?-1:1:0;

    const leftTopPoint = quadraw.calcScenePoint({x: calcXs(params).xMinus, y: (quadraw.scale / 2) * sign});
    const angularY = calcAngularPoint(params).y - ((quadraw.scale / 2-calcAngularPoint(params).y)*sign);
    const angularPoint = quadraw.calcScenePoint({x: calcAngularPoint(params).x, y: angularY});
    const rightTopPoint = quadraw.calcScenePoint({x: calcXs(params).xPlus, y: (quadraw.scale / 2) * sign});

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;

    ctx.moveTo(leftTopPoint.x, leftTopPoint.y); // first point
    ctx.quadraticCurveTo(angularPoint.x, angularPoint.y, rightTopPoint.x, rightTopPoint.y);
    ctx.stroke();
  };

  this.draw = function draw() {
    drawCurve();
    return this;
  };

  this.log = function log() {
    console.log(leftTopPoint, rightTopPoint, angularPoint);
  };

  return this;
};
