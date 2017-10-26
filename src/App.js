import './App.css';
import React, { Component } from 'react';
/*import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {combineReducers} from 'redux';
*/
function helperFunctionCloneArray(arr){
  return JSON.parse(JSON.stringify(arr));
} // this is a helper function which allowes me to deep clone an Array hacking with JSON.parse


class Box extends Component {
    selectBox(){
      this.props.selectBox(this.props.row,this.props.col);
    }

    render(){
      return (<div className={this.props.boxClass} id={this.props.boxId} onClick={this.selectBox} ></div>);
    }

}
class Grid extends Component {
        constructor(props){
           super(props);
          this.width = (this.props.cols * 16) - this.props.cols;
          this.rowArr = [];
          this.boxClass = "";
          this.tempGrid = this.props.gridFull;
        }    
    
    render(){
        this.tempGrid.map(function(el,i){
           el.map(function(el2,j){
                let boxId = i + "_" + j;
                this.boxClass = this.tempGrid[i][j] ? "box on" : "box off";
                this.rowArr.push(<Box boxClass={this.boxClass} key={boxId} boxId={boxId} row={i} col={j} selectBox={this.props.selectBox} />);
           },this);
        },this);
     return(<div className="grid" id="grid" style={{width:this.width}}>
     {this.rowsArr}
     </div>);

    }
}

class App extends Component {
   constructor(props){
     super(props);
     this.speed = 100;
     this.cols = 33;
     this.rows = 16;
     this.intervalId = null;
     this.state = {
       intervalId: null,
       gridFull: Array(this.rows).fill().map(()=>Array(this.cols).fill(false)),
       generation: 0
     }
   }


  render(){
    

    return(<div>
      <h1>Game of Life</h1>
      <Grid gridFull = {this.state.gridFull} selectBox={this.selectBox} rows={this.rows} cols={this.cols}/>
      <h2>generation: {this.state.generation}</h2>
      
      
      
      
      
      </div>);
  }
}

export default App;
