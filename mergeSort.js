import {drawArray, sleep, reset, arr} from '/index.js'


const mergeSort = async (i,j) =>{
//   if(!running)
    // return;
  if(i>=j){
    return;
  }
  let m = parseInt((i+j)/2);
  await mergeSort(i,m);
  await mergeSort(m+1,j);

  let brr = new Array(j-i+1);

  let k = 0;
  let p=i,q=m+1;
  
//   if(!running)
    // return;
  while(p<=m && q <= j){
    if(arr[p] < arr[q])
      brr[k++]=arr[p++];
    else
      brr[k++] = arr[q++];
      drawArray(p,q,"#0066cc");
      await sleep(1);
  }

  while(p <= m){
    brr[k++]=arr[p++];
    drawArray(p,p,"#0066cc");
    await sleep(1);
  }
  while (q <= j) {
    brr[k++] = arr[q++];
    drawArray(q,q,"#0066cc");
    await sleep(1);
  }

  for(k=0,p=i;p<=j;)
    arr[p++]=brr[k++];
  
  drawArray(-1, -1, "#0066cc");
  await sleep(1);
}

export const merge = async()=>{
//   if(running)
    // return;
//   running = 1;
  await mergeSort(0,arr.length);
  drawArray(-1, -1, "rgb(15, 185, 0)");
  reset();
}