import './App.css';
import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {connect} from 'react-redux';
import {combineReducers} from 'redux';

const GRID_HEIGHT = 25;
const GRID_WIDTH = 40;

const makeGrid = (height, width, makeRandom = false ) => {
      let grid = [];
      for(var i = 0; i < height;i++){
        var row = [];
        for(var j = 0; j < width; j++){
             let value;
             if(makeRandom){
               value = Math.Random() > 0.85;
              } 
              row.push({
                 status: value,
                 newBorn: value
              })

            } //j loop
            grid.push(row);
      } // i loop 
      return grid;
};


const advanceGrid = function(grid = []){
   let gridHeight = grid.length;
   let gridWidth = grid[0].length;

   let calculateNeighbours = function(x,y){
      

   }

}






class App extends Component {
  render() {
        return (<div></div>);
    
  }
}

export default App;
