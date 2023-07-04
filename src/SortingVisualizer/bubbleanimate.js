export function bubble(array){
    const animations=[];
    let indmx=0,len=array.length;
    for(let i=0;i<len;i++){
        let z=1;
        for(let j=0;j<len-i;j++){
            if(j<len-i-1) {
                animations.push([j,j+1,0]);
                if(array[j]>array[j+1]){
                    animations.push([j+1,array[j],1]);
                    animations.push([j,array[j+1],1]);
                    let temp=array[j+1];
                    array[j+1]=array[j];
                    array[j]=temp;
                    z=0;
                }
            }
        }
        if(z) break;
    }
    return animations;
}