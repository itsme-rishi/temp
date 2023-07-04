export function manimate(array){
    const animations=[];
    let len=array.length;
    frosta(animations,array,0,len-1);
    return animations;
}
function frosta(animations,array,l,r){
    if(l===r) return 0;
    let mid=Math.floor((l+r)/2);
    frosta(animations,array,l,mid);
    frosta(animations,array,mid+1,r);
    frostb(animations,array,l,r,mid);
}
function frostb(animations,array,l,r,mid){
    // animations.push([0,0]);
    let left_arr=[],right_arr=[];
    for(let i=l;i<=mid;i++){
        left_arr.push(array[i]);
    }
    for(let i=mid+1;i<=r;i++){
        right_arr.push(array[i]);
    }
    let i=0,j=0;
    while(i<left_arr.length&&j<right_arr.length){
        let a=l+i,b=mid+1+j;
        animations.push([a,b]);
        if(left_arr[i]<right_arr[j]) {
            array[i+j+l]=left_arr[i];
            animations.push([l+i+j,array[i+l+j]]);
            i++;
        }
        else {
            array[i+j+l]=right_arr[j];
            animations.push([l+i+j,array[i+l+j]]);
            j++;
        }
        animations.push([a,b]);
    }
    while(i<left_arr.length){
        animations.push([i+l+j,i+l+j]);
        array[i+l+j]=left_arr[i];
        animations.push([i+l+j,array[i+l+j]]);
        animations.push([i+l+j,i+l+j]);
        i++;
    }
    while(j<right_arr.length){
        animations.push([i+l+j,i+l+j]);
        array[i+l+j]=right_arr[j];
        animations.push([i+l+j,array[i+l+j]]);
        animations.push([i+l+j,i+l+j]);
        j++;
    }
}