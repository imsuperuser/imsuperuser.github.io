import {drawArray, sleep, reset, arr, swap} from '/index.js'

export async function bubbleSort() {
    // if(running==1)
      // return;
    // running=1;
    console.log("inside bubble sort");
    let swapped = false;
    let n = arr.length;
    for (let i = 0; i < n; i++) {
      swapped = false;
      for (let j = 0; j < n - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          drawArray(j,j+1,"#0066cc");
          await sleep(1);
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
  