const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;

let eraseButton = document.getElementById("erase-button");
let colorInput = document.getElementById("color");
let shapeButton = document.getElementById("rectangle");

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
shapeButton.onclick = () => {
  shape = true;
  console.log(shape);
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
    } else {
      drawRect(ctx, x, y, e.offsetX - x, e.offsetY - y, color);
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
    } else {
      drawRect(ctx, x, y, e.offsetX - x, e.offsetY - y, color);
      x = 0;
      y = 0;
      Drawing = false;
      shape = false;
    }
  }
});
