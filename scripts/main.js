"use strict";
/*
 Eingabe von a,b,c, sowie x-min und x-max einer quadratischen Funktion ax2 + bx +c
 */

const sceneWidth = 800;
const sceneHeight = 800;

const canvas = document.querySelector(".graphcanvas");
canvas.setAttribute("width", sceneWidth);
canvas.setAttribute("height", sceneHeight);

const ctx = canvas.getContext("2d");


window.q = new Quadraw(12);
q.addCurve({a: 1, b: 0, c: 0}, "rgb(200,20,20)");
q.addCurve({a: 3, b: 2, c: 5}, "rgb(20,200,20)");
q.addCurve({a: -1, b: 0, c: 0}, "rgb(20,20,200)");
q.addCurve({a: 3, b: 7, c: -5}, "rgb(250,150,190)");

