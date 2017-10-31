import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Ojej from './ojej.js';



class App extends Component {

  constructor() {
    super();
    this.state = {
      showEgg: false,
      superPrivatePass: "",
      
    }
    this.combinationListener = this.combinationListener.bind(this);
    
  }
  componentDidMount(){
    document.addEventListener("keydown", this.combinationListener, false);
  }

  combinationListener(event){
    console.log(this.state.superPrivatePass);
   
    this.setState({
      superPrivatePass: this.state.superPrivatePass + event.key
    })
    if(this.state.superPrivatePass.length >= 4 && this.state.superPrivatePass == "pass") {
      this.setState({
        showEgg: true,
      })
    }
    if( event.key == 'q'){
    this.setState({
      superPrivatePass: "",
    })
    }
  }




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="phaser"></div>
        <script src="phasTest.js"/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
        { this.state.showEgg &&
          <Ojej/>
          }
      </div>
    );
  }
}

export default App;
