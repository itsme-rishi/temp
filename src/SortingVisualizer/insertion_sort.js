export function insertion(array){
    const animations=[];
    let len=array.length;
    for(let i=0;i<len;i++){
        let mn=i;
        for(let j=i;j<len;j++){
            animations.push([j,0,0,0]);
            if(array[j]<=array[mn]){
                animations.push([j,mn,0,1]);
                mn=j;
            }
        }
        animations.push([i,mn,array[mn],2+array[i]]);
        let temp=array[i];
        array[i]=array[mn];
        array[mn]=temp;
    }
    return animations;
}