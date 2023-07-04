import React from "react";
import './SortingVisualizer.css';
import { bubble } from "./bubbleanimate";
import { manimate } from "./mergeanimate";
import { insertion } from "./insertion_sort";
let speed=2;
let numofbar=100;
const allbarcolor='maroon';
const compcolor='turquoise';
export default class SortingVisualizer extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            array:[],
        };
    }
        componentDidMount(){
            this.resetarray();
        }
        resetarray(){
            const array=[];
        for(let i=0;i<numofbar;i++){
            let x=Math.floor((Math.random())*500+10);
            array.push(x);
        }
        this.setState({array});
    }
    buttonenable(){
        document.getElementById("bubble").disabled=false;
        document.getElementById("merge").disabled=false;
        document.getElementById("newarray").disabled=false;
        document.getElementById("slide").disabled=false;
        document.getElementById("insertion").disabled=false;
    }
    buttonsdis(){
        document.getElementById("bubble").disabled=true;
        document.getElementById("merge").disabled=true;
        document.getElementById("newarray").disabled=true;
        document.getElementById("slide").disabled=true;
        document.getElementById("insertion").disabled=true;
    }
    bubblesort(){
        this.buttonsdis();
        document.getElementById("bubble").disabled=true;
        let animations=bubble(this.state.array);
        let lag=0;
        let j=this.state.array.length-1;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
              const [barOneIdx, barTwoIdx,check] = animations[i];
              if(check===1){
                let ris=(lag-1)+0.5;
                    const barOnStyle=arrayBars[barOneIdx].style;
                    setTimeout(()=>{
                        barOnStyle.height=`${barTwoIdx}px`;
                    },ris*speed);
              }
              else {
                const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              setTimeout(() => {
                barOneStyle.backgroundColor = compcolor;
                barTwoStyle.backgroundColor = compcolor;
                setTimeout(() => {
                    barOneStyle.backgroundColor = allbarcolor;
                    barTwoStyle.backgroundColor = allbarcolor;
                    if(barTwoIdx===j){
                        barTwoStyle.backgroundColor = 'green';j--;
                    }
                    }, 2*speed);
              }, lag * speed);
              lag++;
            }
          }
          lag++;
          setTimeout(()=>{
            let len=this.state.array.length;
            const array_bar=document.getElementsByClassName('array-bar');
            for(let i=0;i<len;i++){
                array_bar[i].style.backgroundColor='green';
              }
              this.buttonenable();
          },(lag+10)*speed)
    }

    mergesort(){
        this.buttonsdis();
        let animations=manimate(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0;i<animations.length;i++){
            if(i%3===0||i%3===2){
                const [indx1,indx2]=animations[i];
                const barOneStyle=arrayBars[indx1].style;
                const barTwoStyle=arrayBars[indx2].style;
                let usecolor=(i%3===0)? compcolor:allbarcolor
                setTimeout(()=>{
                    barOneStyle.backgroundColor=usecolor;
                    barTwoStyle.backgroundColor=usecolor;
                },i*speed);
            }
            else{
                setTimeout(()=>{
                const [indx1,indx2]=animations[i];
                arrayBars[indx1].style.backgroundColor='yellow';
                arrayBars[indx1].style.height=`${indx2}px`;
                setTimeout(()=>{
                    arrayBars[indx1].style.backgroundColor=allbarcolor;
                },0.5*speed);
                },i*speed)
            }
        }
        let q=animations.length+1;
       setTimeout(()=>{
        let len=this.state.array.length;
        for(let j=0;j<len;j++){
            arrayBars[j].style.backgroundColor='green';
        }
        this.buttonenable();
       },q*speed);

    }
    insertionsort(){
        this.buttonsdis();
        let animations=insertion(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
        for(let i=0;i<animations.length;i++){
            const [indx1,indx2,val,check]=animations[i];
            if(check===0){
                setTimeout(()=>{
                    const barOneStyle=arrayBars[indx1].style;
                    barOneStyle.backgroundColor='yellow';
                    setTimeout(()=>{
                        if(barOneStyle.backgroundColor!='green')barOneStyle.backgroundColor='maroon';
                    },(0.5)*speed);
                },i*speed);
            }
            if(check===1){
                setTimeout(()=>{
               const barTwoStyle=arrayBars[indx2].style;
               barTwoStyle.backgroundColor='maroon';
               const barOneStyle=arrayBars[indx1].style;
               barOneStyle.backgroundColor='aqua';
            },i*speed);
            }
            if(check>=2){
                setTimeout(()=>{
                const barOneStyle=arrayBars[indx1].style;
                const barTwoStyle=arrayBars[indx2].style;
                barTwoStyle.height=`${check-2}px`;
                barTwoStyle.backgroundColor='maroon';
                barOneStyle.backgroundColor='green';
                barOneStyle.height=`${val}px`;
            },i*speed);
            }
        }
        this.buttonenable();
    }
    onChange(value){
        speed=320-value;
    }
        render(){
            const {array}=this.state;
        return(
            <div className="array-container">
            {array.map((value,idx)=>(
                <div 
                className="array-bar" 
                key={idx}
                    style={{
                        backgroundColor:allbarcolor,
                        height:`${value}px`,
                    }}>
                </div>
            ))}
            <button id="bubble" onClick={() => this.bubblesort()}>bubble Sort</button>
            <button id="merge"onClick={() => this.mergesort()}>Merge Sort</button>
            <button id="insertion" onClick={() => this.insertionsort()}>insertion Sort</button>
            <button id="newarray"onClick={() => this.resetarray()}>newarray</button>
            <input  id="slide" type="range" min="0" max="318" defaultValue="318" 
            step="1" onChange={(e)=>this.onChange(e.target.value)}
            ></input>
            </div>
        );
        }
    }
