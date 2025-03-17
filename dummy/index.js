const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(200, 200);
const ctx = canvas.getContext("2d");
const fs = require("fs");

// Write "Awesome!"
ctx.font = "30px Impact";
// ctx.rotate(0.1);
ctx.fillText("Awesome!", 50, 100);

// Draw line under text
const lineWidth = 5;
var text = ctx.measureText("Awesome");
ctx.strokeStyle = "white";
ctx.beginPath();
ctx.lineWidth = lineWidth;
ctx.lineCap = "round";
ctx.moveTo(50, 102);
ctx.lineTo(50, 102);
// ctx.lineTo(50 + text.width, 102);
ctx.stroke();
// ctx.clearRect(50, 102, 1, 1);
// ctx.clearRect(49, 102, 1, 1);
// ctx.clearRect(49, 101, 1, 1);
// ctx.clearRect(50, 101, 1, 1);
// ctx.clearRect(50 - lineWidth, 102 - lineWidth, lineWidth * 2, lineWidth * 2);

// Draw cat with lime helmet
loadImage("./image/cat-image.jpeg").then((image) => {
  ctx.drawImage(image, 50, 0, 70, 70);

  //   console.log('<img src="' + canvas.toDataURL() + '" />');

  fs.writeFileSync("image.png", canvas.toBuffer());
  console.log("Image created");
});
