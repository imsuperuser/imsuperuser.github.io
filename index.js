var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let h = canvas.height,
  w = canvas.width;

let arr=[];
let size=50;
let barWidth=Math.floor(w/size)-1;

console.log("size: ",size," width: ",barWidth);

let slider = document.getElementById('myRange');
let count = document.getElementById("time");
count.innerText = 0;
let time = -1; 
let running=0;
let algorithm="Heap";
let timer;


/////Timer function
const showTimer= () =>{
  time++;
  count.innerText = time;
  console.log("inside setInterval");
}



slider.oninput =function(){
  if(!running){
    size = this.value;
    barWidth=Math.ceil(w/size)-1;
    console.log("size: ",size," width: ",barWidth);
    generateArray();
    drawArray(-1,-1,"#0066cc");    
  }
}




//generating random numbers
function generateArray() {
  if(running){
    reset();
    drawArray();
  }
  else{
    arr = new Array(size);
    let a = 10,
      b = 400;
    for (let i = 0; i < size; i++) arr[i] = Math.floor(a + (b - a) * Math.random());
  }
}


function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
}

function drawArray(indexA,indexB,color) {
    clearScreen();
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



/////reset everything
const reset=()=>{
  console.log("reset");
  running=0;
  time=0;
  clearInterval(timer);
}

function swap(arr, index_a, index_b) {
  let temp = arr[index_a];
  arr[index_a] = arr[index_b];
  arr[index_b] = temp;
}

//////////////////////////////////////////////////////
//Bubble Sort-----------------------------------------
async function bubbleSort() {
  if(running==1)
    return;
  running=1;
  console.log("inside bubble sort");
  let swapped = false;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        drawArray(j,j+1,"#0066cc");
        await sleep(0);
        swap(arr, j, j + 1);
        swapped = true;
      }
    }
    if (!swapped) {
      drawArray(-1,-1,"rgb(15, 185, 0)");
      reset();
      break;
    }
  }
}


/////////////////////////////////////////////////////////////
//Heap Sort---------------------------------------------------
async function heap_root(i) {
  if(!running)
    return;
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && arr[left] > arr[max]) {
    max = left;
  }

  if (right < array_length && arr[right] > arr[max]) {
    max = right;
  }

  if (max != i && running) {
    drawArray(i,max,"#0066cc");
    await sleep(10);
    swap(arr, i, max);
    await heap_root(max);
  }
}


async function heapSort() {
  if(running==1)
    return;
  running=1;
  array_length = arr.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    await heap_root(i);
  }

  for (i = arr.length - 1; i > 0; i--) {
    if(!running)
      break;
    drawArray(0,i,"#0066cc");
    await sleep(10);
    swap(arr, 0, i);
    array_length--;

    await heap_root(0);
  }
  console.log("heapsort finished");
  drawArray(-1,-1,"rgb(15, 185, 0)");
  reset();
}

///////////////////////////////////////////////////////
//Quick Sort--------------------------------------------
async function partition (arr, low, high)
{
  if(!running)
    return;
    let pivot = arr[high]; 
    let i = (low - 1); // Index of smaller element and indicates the right position of pivot found so far
 
    for (let j = low; j <= high - 1; j++)
    {
        // If current element is smaller than the pivot
        if (arr[j] < pivot)
        {
            i++; // increment index of smaller element
            drawArray(i,j,"#0066cc");
            await sleep(20);
            swap(arr,i,j);
        }
    }
    drawArray(i+1,high,"#0066cc");
    await sleep(20);
    swap(arr,i+1,high);
    return (i + 1);
}

async function quickSort(arr, low, high)
{
    if(!running)
      return;
    if (low < high)
    {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    drawArray(-1,-1,"rgb(15, 185, 0)");
    reset();

}

async function quick(){
  if(running)
    return;
  running=1;
  console.log("inside quick()");
  quickSort(arr,0,size-1);
}

/////////////////////////////////////////////////////////
//Insertion Sort----------------------------------------
async function insertionSort()
{
    if(running)
      return;
    running=1;
    let i, key, j;
    for (i = 1; i < arr.length; i++)
    {
        if(!running)
          break;
        key = arr[i];
        j = i - 1;
 
        /* Move elements of arr[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
        while (j >= 0 && arr[j] > key)
        {
          if(!running)
            break;
          drawArray(j,j+1,"#0066cc");
          await sleep(1);
          arr[j + 1] = arr[j];
            j = j - 1;
        }
        drawArray(i,j+1,"#0066cc");
        await sleep(1);
        arr[j + 1] = key;
        
    }
    drawArray(-1,-1,"rgb(15, 185, 0)");
    reset();
}
document.getElementById('newArray').addEventListener('click',function(){
  if(running==0){
    generateArray();
    // console.log("returned from function and arr: ",arr);
    drawArray(-1,-1,"#0066cc");    
  }
  else{
    clearScreen();
    arr=[];
    running=0;
    clearInterval(timer);
  }
})

document.getElementById('algo').addEventListener('click',()=>{
  algorithm = algo.value;
});

document.getElementById('sort').addEventListener('click',()=>{
  if(!running){
    console.log("clicked and algo: ",algorithm)
    time=0;
    timer=setInterval(showTimer,1000);
    switch(algorithm){
      case "Insertion": insertionSort();
                        break;
      case "Bubble":    bubbleSort(); 
                        break;
      case "Heap":      heapSort();
                        break;
      case "Quick":     quick();
                        break;
    }    
  }
})





