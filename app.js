const saveBtn = document.getElementById("save");

const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // ctx(context)는 그림을 그릴 때 사용
// canvas의 크기
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

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
ctx.lineCap = "round";    // 선의 끝 부분을 둥글게 해주기
let isPainting = false;
let isFilling = false;

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
// 선 두께 변경하기
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
// 선, 채우기 색깔 변경하기
function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}
// 다른 컬러 추가하고 컬러 변경하는 것 보여주기
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}
// 그리기, 채우기 모드 버튼 클릭으로 변경하기
function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}
// 채우기 모드일 때 배경색 채우기
function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
// 새로고침 버튼 누르면 흰색 배경으로 덮기
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
// 지우개 버튼 누르면 흰색으로 그려주기
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}
// 파일 추가하기
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function() {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  }
}
// 텍스트 추가하기
function onDoubleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save();    // 이전 상태를 저장해주는 함수
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    ctx.restore();    // save와 retore 사이에 수정 사항이 저장되지 않음
  }
}
// 그림 저장하기
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);

fileInput.addEventListener("change", onFileChange);

saveBtn.addEventListener("click", onSaveClick);