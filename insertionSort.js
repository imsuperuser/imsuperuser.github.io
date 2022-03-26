import {drawArray, sleep, reset, arr} from '/index.js'

export const insertionSort = async() =>{
    // if(running)
      // return;
    // running=1;
    let i, key, j;
    for (i = 1; i < arr.length; i++)
    {
        // if(!running)
          // break;
        key = arr[i];
        j = i - 1;
 
        /* Move elements of arr[0..i-1], that are
        greater than key, to one position ahead
        of their current position */
        while (j >= 0 && arr[j] > key)
        {
          // if(!running)
            // break;
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