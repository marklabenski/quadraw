"use strict";
/*
 Eingabe von a,b,c, sowie x-min und x-max einer quadratischen Funktion ax2 + bx +c
 */

var sceneWidth = window.screen.availWidth;
var sceneHeight = window.screen.availWidth;

var canvas = document.querySelector(".graphcanvas");
canvas.setAttribute("width", sceneWidth);
canvas.setAttribute("height", sceneHeight);

var ctx = canvas.getContext("2d");

window.q = quadraw(12, ctx, sceneWidth, sceneHeight);

var colors = [
  "rgb(104,250,180)",
  "rgb(255,200,100)",
  "rgb(200,120,50)",
  "rgb(170,180,200)",
  "rgb(104,150,187)"
];
var lastColor = 0;
var getNextColor = function () {
  if(lastColor + 1 >= colors.length) {
    lastColor = 0;
  }
  return colors[lastColor++];
};

var params = {};

var createCurveMarkup = function(curve) {

  var color = curve.getColor();
  var params = curve.getParamsString();
  var newLi = document.createElement("li");
  newLi.innerHTML = "<span>" + params + "</span>";
  newLi.style.backgroundColor = color;

  var removeButton = document.createElement('button');
  removeButton.classList.add('remove-curve-button');
  removeButton.innerHTML = '-';
  removeButton.addEventListener('click', function() {
    window.q.removeCurve(curve.index);
    newLi.parentNode.removeChild(newLi);
  });

  newLi.appendChild(removeButton);

  return newLi;
};

var curveInput = document.querySelector('input.curve-input');
var curveXMin = document.querySelector('.curve-x-min');
var curveXMax = document.querySelector('.curve-x-max');

var addCurve = function(params) {
  //get xMin and xMax
  if(curveXMin.value !== "")
    params['xMin'] = curveXMin.value / 1;
  if(curveXMax.value !== "")
    params['xMax'] = curveXMax.value / 1;

  q.addCurve(params, getNextColor());
  var curveMenu = document.querySelector('.menu.curves');
  curveMenu.innerHTML = "";
  q.getCurveList().map(function(curve) {
    curveMenu.appendChild(createCurveMarkup(curve));
  });
};

document.querySelector('button.scale-up').addEventListener('click', function () {
    window.q.setScale(window.q.scale - 2);
});
document.querySelector('button.scale-down').addEventListener('click', function () {
  window.q.setScale(window.q.scale + 2);
});

var toggleAddCurveModal = function() {
  var modals = document.querySelectorAll('.add-curve-form, .add-curve-background');
  Object.keys(modals).map(function(key) {
    var elem = modals[key];
    if(elem.classList.contains('hidden'))
      elem.classList.remove('hidden');
    else
      elem.classList.add('hidden');
  });

  curveXMax.value = curveXMin.value = curveInput.value = "";
};

var addCurveButton = document.querySelector('button.add-button');
addCurveButton.addEventListener('click', function() {
  addCurve(params);
  toggleAddCurveModal();
});

var addNewCurveButton = document.querySelector('button.add-curve-button');
addNewCurveButton.addEventListener('click', function() {
  toggleAddCurveModal();
  curveInput.focus();
});

var cancelButton = document.querySelector('button.cancel');
cancelButton.addEventListener('click', function() {
  toggleAddCurveModal();
});

curveInput.addEventListener('keyup', function(evt) {
  var input = this.value;

  if(input.search(/\^2/g) !== -1) {
    input = input.replace(/\^2/g, '²');
    this.value = input;
  }

  var exp = /(-?\d+)x²\s*([+-]\d+)x\s*([+-]\d+)/;
  var matches = input.match(exp);
  if(matches != undefined && matches.length >= 3) {
    params = {a: matches[1], b: matches[2], c:matches[3]};

    addCurveButton.disabled = false;
  }
});
