import {drawArray, sleep, reset, arr, swap} from '/index.js'


async function partition (low, high)
{
  // if(!running)
    // return;
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

async function quickSort(low, high)
{
    // if(!running)
      // return;
    console.log(low," ",high)
    if (low < high)
    {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
    
  }
  
  export async function quick(){
    // if(running)
    // return;
    // running=1;
    console.log("inside quick()");
    await quickSort(0,arr.length-1);
    drawArray(-1,-1,"rgb(15, 185, 0)");
    reset();
}
