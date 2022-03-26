import {drawArray, sleep, reset, arr, swap} from '/index.js'

async function heap_root(i,n) {
    // if(!running)
      // return;
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
  
    if (left < n && arr[left] > arr[max]) {
      max = left;
    }
  
    if (right < n && arr[right] > arr[max]) {
      max = right;
    }
  
    if (max != i) {
      drawArray(i,max,"#0066cc");
      await sleep(10);
      swap(arr, i, max);
      await heap_root(max,n);
    }
  }
  
  
  export async function heapSort() {
    // if(running==1)
      // return;
    // running=1;
  
    let n = arr.length;
  
    for (var i = Math.floor(n / 2); i >= 0; i -= 1) {
      await heap_root(i,n);
    }
  
    for (i = n - 1; i > 0; i--) {
      // if(!running)
        // break;
      drawArray(0,i,"#0066cc");
      await sleep(10);
      swap(arr, 0, i);
      n--;
  
      await heap_root(0,n);
    }
    console.log("heapsort finished");
    drawArray(-1,-1,"rgb(15, 185, 0)");
    reset();
  }