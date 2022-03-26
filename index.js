import { shellSort } from "/shellShort.js";
import { merge } from "/mergeSort.js";
import { bubbleSort } from "./bubbleSort.js";
import { heapSort } from "./heapSort.js";
import { quick } from "./quickSort.js";
import { insertionSort } from "./insertionSort.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let canvasHeight = canvas.height,
  canvasWidth = canvas.width;

export let arr = [];
let size = 50;
let barWidth = Math.ceil(canvasWidth / size);

console.log("size: ", size, " width: ", barWidth);

let slider = document.getElementById("myRange");
let count = document.getElementById("time");
count.innerText = 0;
let time = -1;
let algorithm = "Heap";
let timer;

let running = 0;

/////Timer function
const showTimer = () => {
  time++;
  count.innerText = time;
  console.log("inside setInterval");
};

//generating random numbers
function generateArray() {
  arr = new Array(size);
  let a = 10,
    b = 400;
  for (let i = 0; i < size; i++)
    arr[i] = Math.floor(a + (b - a) * Math.random());
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

export function drawArray(indexA, indexB, color) {
  clearScreen();
  let x = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i != indexA && i != indexB) ctx.fillStyle = color;
    else ctx.fillStyle = "red";
    // console.log("x: ", x);
    ctx.fillRect(x, canvasHeight - arr[i], barWidth, arr[i]);
    x += barWidth + 1;
  }
}

//for delaying the loop
export const sleep = (millisec) => {
  return new Promise((resolve) => setTimeout(resolve, millisec));
};

/////reset everything
export const reset = () => {
  console.log("reset");
  running = 0;
  time = 0;
  clearInterval(timer);
};

export function swap(arr, index_a, index_b) {
  let temp = arr[index_a];
  arr[index_a] = arr[index_b];
  arr[index_b] = temp;
}

/////////////////////////////////////////////////////////////////////////
////////////----------Event listeners----------------------------------

/// Slider
slider.oninput = function () {
  if (!running) {
    size = this.value;
    // barWidth = Math.ceil(canvasWidth / size) - 1;
    barWidth = Math.floor((canvasWidth - size + 1) / size);

    generateArray();
    drawArray(-1, -1, "#0066cc");
  }
};

document.getElementById("newArray").addEventListener("click", function () {
  if (!running) {
    console.log("not running and generating new array: ");
    generateArray();
    drawArray(-1, -1, "#0066cc");
  }
});

document.getElementById("algo").addEventListener("click", () => {
  algorithm = algo.value;
});

document.getElementById("sort").addEventListener("click", async () => {
  if (!running) {
    running = 1;
    console.log("clicked and algo: ", algorithm);
    time = 0;
    count.innerText = time;
    timer = setInterval(showTimer, 1000);
    switch (algorithm) {
      case "Insertion":
        await insertionSort();
        break;
      case "Bubble":
        await bubbleSort();
        break;
      case "Heap":
        await heapSort();
        break;
      case "Quick":
        await quick();
        break;
      case "Merge":
        await merge();
        break;
      case "Shell":
        await shellSort();
        break;
    }
  }
});
