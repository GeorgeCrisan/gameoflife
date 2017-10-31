import './App.css';
import React, { Component } from 'react';
import { ButtonToolbar,MenuItem,DropdownButton } from 'react-bootstrap';
/*import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {combineReducers} from 'redux';
*/
function helperFunctionCloneArray(arr){
  return JSON.parse(JSON.stringify(arr));
} // this is a helper function which allowes me to deep clone an Array hacking with JSON.parse


class Box extends Component {
    constructor(){
      super();
      this.selectBox = this.selectBox.bind(this);
    }
    selectBox(){
      this.props.selectBox(this.props.row,this.props.col);
    }

    render(){
      return (<div className={this.props.boxClass} id={this.props.boxId} onClick={this.selectBox} ></div>);
    }

}


class Grid extends Component {
      
    
    render(){
        var width =  (this.props.cols * 16) - this.props.cols;
        console.log(width);
        var tempGrid = this.props.gridFull;
        var rowArr = [];
        var boxClass = " ";
        tempGrid.map(function(el,i){
           el.map(function(el2,j){
                let boxId = i + "_" + j;
              boxClass = tempGrid[i][j] ? "box on" : "box off";
                rowArr.push(<Box boxClass={boxClass} key={boxId} boxId={boxId} row={i} col={j} selectBox={this.props.selectBox} />);
           },this);
        },this);
     return(<div className="grid" id="grid" style={{width:width}}>
     {rowArr}
     </div>);

    }
}

class Buttons extends Component {

     constructor(){
       super();
       this.handleSelect = this.handleSelect.bind(this);
       
     }
    handleSelect(event) {
      this.props.gridSize(event);
    }

    render() {
      return (
        <div className="center">
          <ButtonToolbar>
            <button className="btn btn-success" onClick={this.props.playButton.bind(this)}>
              Play
            </button>
            <button className="btn btn-default" onClick={this.props.pauseButton.bind(this)}>
              Pause
            </button>
            <button className="btn btn-danger" onClick={this.props.clear.bind(this)}>
              Clear
            </button>
            <button className="btn btn-danger" onClick={this.props.slow.bind(this)}>
              Slow
            </button>
            <button className="btn btn-info" onClick={this.props.fast.bind(this)}>
              Fast
            </button>
            <button className="btn btn-info" onClick={this.props.seed.bind(this)}>
              Seed
            </button>
            <DropdownButton className="btn-info"
              title="Grid Size"
              id="size-menu"
              onSelect={this.handleSelect}
            >
              <MenuItem eventKey="1">50x30</MenuItem>
              <MenuItem eventKey="2">70x50</MenuItem>
              <MenuItem eventKey="3">100x70</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </div>
        )
    }
}

class App extends Component {
   constructor(props){
     super(props);
     this.speed = 100;
     this.cols = 70;
     this.rows = 50;
     this.selectBox = this.selectBox.bind(this);
     this.seed = this.seed.bind(this);
     this.play = this.play.bind(this);
     //this.fast = this.fast.bind(this);
     this.clear = this.clear.bind(this);
     this.gridSize = this.gridSize.bind(this);
     //this.slow = this.slow.bind(this);
     this.playButton = this.playButton.bind(this);
     this.pauseButton = this.pauseButton.bind(this);
     this.state = {
       gridFull: Array(this.rows).fill().map(()=>Array(this.cols).fill(false)),
       generation: 0
     }
     
   }


   clear(){
     let grid = Array(this.rows).fill().map(()=>Array(this.cols).fill(false));
     this.setState({gridFull:grid,generation:0});
     clearInterval(this.intervalId);
   }

   gridSize(size){
        switch(size){
            case "1":
              this.cols = 50;
              this.rows = 30;
              break;

            case "2":
               this.cols = 70;
               this.rows = 50;
              break;

              case "3":
              this.cols = 100;
              this.rows = 70;
              break;  

        }
        this.clear();
   }

   selectBox(row,col) {
     //console.log(1);
    let gridCopy =  helperFunctionCloneArray(this.state.gridFull);
    //console.log(gridCopy);
		gridCopy[row][col] = !gridCopy[row][col];
		this.setState({
			gridFull: gridCopy
		});
   }


   seed(){
         let gridCopy = helperFunctionCloneArray(this.state.gridFull);
         gridCopy.map(function(el,i){
               el.map(function(el2,j){
                    if(Math.floor(Math.random() * 4) === 1)
                       gridCopy[i][j] = true;

               },this);
         },this);
         this.setState({gridFull:gridCopy});
   }

   play(){
       let g = this.state.gridFull;
       let g2 = helperFunctionCloneArray(this.state.gridFull);

       g2.map(function(el,i){
          el.map(function(el2,j){
              var count = 0; 
              if (i > 0) if (g[i - 1][j]) count++;
              if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
              if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
              if (j < this.cols - 1) if (g[i][j + 1]) count++;
              if (j > 0) if (g[i][j - 1]) count++;
              if (i < this.rows - 1) if (g[i + 1][j]) count++;
              if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
              if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
              if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
              if (!g[i][j] && count === 3) g2[i][j] = true;

          },this);
       },this);

       this.setState({gridFull:g2,
        generation: this.state.generation + 1});
   }



  pauseButton(){
    clearInterval(this.intervalId);
  }

  slow(){
    console.log("slow");
         
         clearInterval(this.intervalId);
         this.speed = 500;
          this.playButton();
        }

  fast(){
        console.log("fast");
        clearInterval(this.intervalId);
        this.speed = 100;
        
        this.playButton();
  }

  playButton(){
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play,this.speed);
  }

  componentDidMount (){
       this.seed();
       this.playButton();
  }
  
  render(){
    

    return(<div>
      <h1>Game of Life</h1>
      <Grid gridFull = {this.state.gridFull} selectBox={this.selectBox} rows={this.rows} cols={this.cols}/>
      <Buttons
      playButton={this.playButton}
      pauseButton={this.pauseButton}
      slow={this.slow.bind(this)}
      fast={this.fast.bind(this)}
      clear={this.clear}
      seed={this.seed}
      gridSize={this.gridSize}
    />
      <h2>generation: {this.state.generation}</h2>
      
      
      
      
      
      </div>);
  }
}

export default App;
