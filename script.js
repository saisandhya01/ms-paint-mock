const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;

let eraseButton = document.getElementById("erase-button");
let colorInput = document.getElementById("color");
let shapeButtonRectangle = document.getElementById("rectangle");
let shapeButtonEllipse = document.getElementById("ellipse");

let shape = false;
let Drawing = false;
let x = 0;
let y = 0;
let color = "black";

eraseButton.onclick = () => {
  color = "white";
};
colorInput.onchange = () => {
  color = colorInput.value;
};
shapeButtonRectangle.onclick = () => {
  shape = "rectangle";
  console.log(shape);
};
shapeButtonEllipse.onclick = () => {
  shape = "ellipse";
};
function draw(context, x1, y1, x2, y2, color) {
  context.beginPath();
  context.strokeStyle = color;
  if (color === "white") {
    context.lineWidth = 20;
  } else {
    context.lineWidth = 1;
  }
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
function drawRect(context, x, y, w, h, color) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.lineWidth = 10;
  context.strokeStyle = color;
  context.strokeRect(x, y, w, h);
  context.closePath();
}
function drawEllipse(context, x1, y1, x2, y2, color) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  let radiusX = (x2 - x1) / 2;
  let radiusY = (y2 - y1) / 2;
  let centerX = x1 + radiusX;
  let centerY = y1 + radiusY;
  let step = 0.01;
  let totalAngle = Math.PI * 2 - step;
  context.beginPath();
  context.lineWidth = 3;
  context.moveTo(
    centerX + radiusX * Math.cos(0),
    centerY + radiusY * Math.sin(0)
  );
  for (let i = step; i < totalAngle; i += step) {
    context.lineTo(
      centerX + radiusX * Math.cos(i),
      centerY + radiusY * Math.sin(i)
    );
  }
  context.closePath();
  context.strokeStyle = color;
  context.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  Drawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (Drawing === true) {
    if (!shape) {
      draw(ctx, x, y, e.offsetX, e.offsetY, color);
      x = e.offsetX;
      y = e.offsetY;
    } else if (shape === "rectangle") {
      drawRect(ctx, x, y, e.offsetX - x, e.offsetY - y, color);
    } else {
      drawEllipse(ctx, x, y, e.offsetX, e.offsetY, color);
    }
  }
});

window.addEventListener("mouseup", (e) => {
  if (Drawing === true) {
    if (!shape) {
      draw(ctx, x, y, e.offsetX, e.offsetY, color);
      x = 0;
      y = 0;
      Drawing = false;
    } else if (shape === "rectangle") {
      drawRect(ctx, x, y, e.offsetX - x, e.offsetY - y, color);
      x = 0;
      y = 0;
      Drawing = false;
      shape = false;
    } else {
      drawEllipse(ctx, x, y, e.offsetX, e.offsetY, color);
      x = 0;
      y = 0;
      Drawing = false;
      shape = false;
    }
  }
});
