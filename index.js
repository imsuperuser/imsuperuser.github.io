var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
let h = canvas.height,
  w = canvas.width;

let arr=[];
let barWidth = 8;
let size=Math.floor(w /(barWidth+1));
let state=0;

//generating random numbers
function generateArray(size) {
  let arr = new Array(size);
  let a = 10,
    b = 400;
  for (let i = 0; i < size; i++) arr[i] = Math.floor(a + (b - a) * Math.random());
  return arr;
}


// console.log("array length: ", arr.length);
console.log("canvas width : ", w);
console.log("bar width: ", barWidth);

function clearScreen() {
  console.log('clearing screen');
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
}

function drawArray(arr,indexA,indexB,color) {
  clearScreen();
  console.log("inside draw");
  let x = 0;
  for (let i = 0; i < arr.length; i++) {
    if(i!=indexA && i!=indexB)
      ctx.fillStyle =color;
    else
      ctx.fillStyle='red';
    // console.log("x: ", x);
    ctx.fillRect(x, h - arr[i], barWidth, arr[i]);
    x += barWidth+1;
  }
}

//for delaying the loop
const sleep = (millisec) => {
  return new Promise((resolve) => setTimeout(resolve, millisec));
};

function swap(arr, index_a, index_b) {
  let temp = arr[index_a];
  arr[index_a] = arr[index_b];
  arr[index_b] = temp;
}

//////////////////////////////////////////////////////
//Bubble Sort-----------------------------------------
async function bubbleSort() {
  if(state==1)
    return;
  state=1;
  console.log("inside bubble sort");
  let swapped = false;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        drawArray(arr,j,j+1,"#0066cc");
        await sleep(0);
        swap(arr, j, j + 1);
        // requestAnimationFrame(drawArray);
        swapped = true;
      }
    }
    if (!swapped) {
      drawArray(arr,-1,-1,"rgb(15, 185, 0)");
      state=0;
      break;
    }
  }
}


/////////////////////////////////////////////////////////////
//Heap Sort---------------------------------------------------
async function heap_root(i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && arr[left] > arr[max]) {
    max = left;
  }

  if (right < array_length && arr[right] > arr[max]) {
    max = right;
  }

  if (max != i) {
    drawArray(arr,i,max,"#0066cc");
    await sleep(10);
    swap(arr, i, max);
    await heap_root(max);
  }
}


async function heapSort() {
  if(state==1)
    return;
  state=1;
  array_length = arr.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    await heap_root(i);
  }

  for (i = arr.length - 1; i > 0; i--) {
    // requestAnimationFrame(drawArray);
    drawArray(arr,0,i,"#0066cc");
    await sleep(10);
    swap(arr, 0, i);
    array_length--;

    await heap_root(0);
  }
  drawArray(arr,-1,-1,"rgb(15, 185, 0)");
  state=0;
}

///////////////////////////////////////////////////////
//Quick Sort--------------------------------------------
async function partition (arr, low, high)
{
    let pivot = arr[high]; 
    let i = (low - 1); // Index of smaller element and indicates the right position of pivot found so far
 
    for (let j = low; j <= high - 1; j++)
    {
        // If current element is smaller than the pivot
        if (arr[j] < pivot)
        {
            i++; // increment index of smaller element
            drawArray(arr,i,j,"#0066cc");
            await sleep(20);
            swap(arr,i,j);
        }
    }
    drawArray(arr,i+1,high,"#0066cc");
    await sleep(20);
    swap(arr,i+1,high);
    return (i + 1);
}

async function quickSort(arr, low, high)
{
  console.log("start: ",low," end: ",high);
    if (low < high)
    {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    drawArray(arr,-1,-1,"rgb(15, 185, 0)");
}


/////////////////////////////////////////////////////////
//Insertion Sort----------------------------------------
async function insertionSort()
{
    if(state==1)
      return;
    state=1;
    let i, key, j;
    for (i = 1; i < arr.length; i++)
    {
        key = arr[i];
        j = i - 1;
 
        /* Move elements of arr[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
        while (j >= 0 && arr[j] > key)
        {
          drawArray(arr,j,j+1,"#0066cc");
          await sleep(1);
          arr[j + 1] = arr[j];
            j = j - 1;
        }
        drawArray(arr,i,j+1,"#0066cc");
        await sleep(1);
        arr[j + 1] = key;
        
    }
    drawArray(arr,-1,-1,"rgb(15, 185, 0)");
    state=0;
}
document.getElementById('newArray').addEventListener('click',function(){
  if(state==0){
    arr=generateArray(size);
    console.log('creating');
    drawArray(arr,-1,-1,"#0066cc");    
    console.log('done');
  }
})

async function quick(){
  if(state==1)
    return;
  state=1;
  console.log("inside quick()");
  quickSort(arr,0,size-1);
  state=0;
  drawArray(arr,-1,-1,"#0066cc");   
  console.log("after sorting array: ",arr);
}
