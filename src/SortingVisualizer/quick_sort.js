export function quick(array){
    let animations=[];
    quicksort(animations,array,l,r);
    return animations;
}
function quicksort(animations,array,l,r){
    if(l>=r) return 0;
   let pivot_loc=partition(array,l,r);
   quicksort(animations,array,l,pivot_loc-1);
   quicksort(animations,array,pivot_loc+1,r);
   return 0;
}
function partition(animations,array,l,r){
    pivot=array[r];
    let pivot_wall=l;
    animations.push([r,0,3]);
    for(let i=l+1;i<=r;i++){
        animations.push([i,0,0]);
        if(array[i]<pivot){
            let temp=array[i];
            array[i]=array[pivot_wall];
            array[pivot_wall]=temp;pivot_wall++;
        }
    }
    let temp=array[pivot_wall];
    array[pivot_wall]=pivot;
    array[l]=temp;
    return pivot_wall;
}