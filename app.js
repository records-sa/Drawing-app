const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // ctx(context)는 그림을 그릴 때 사용
// canvas의 크기
canvas.width = 800;
canvas.height = 800;

/* canvas 안에 사각형 그리는 원리
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
ctx.fill();
*/

/* 사람 그리기
ctx.fillRect(210 - 40, 200 - 40, 15, 100);
ctx.fillRect(350 - 40, 200 - 40, 15, 100);
ctx.fillRect(260 - 40, 200 - 40, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();    // 위 ctx와 경로를 분리해서 새로 시작
ctx.fillStyle = "white";
ctx.arc(270, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(230, 80, 8, Math.PI, 2 * Math.PI);
ctx.fill();
*/

/* 마우스가 움직이는 대로 선 긋기
const colors = [
  "#55efc4",
  "#81ecec",
  "#74b9ff",
  "#a29bfe",
  "#ffeaa7",
  "#fab1a0",
  "#ff7675",
  "#fd79a8"
];

function onclick(event) {
  ctx.beginPath();
  ctx.moveTo(400, 400);
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

canvas.addEventListener("mousemove", onclick);
*/

// 클릭한 후 마우스로 움직이면서 그림 그리기
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);