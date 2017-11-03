import React, { Component } from 'react';
import './egg.css';


class Egg extends Component {

  constructor(props){
    super(props);
    console.log(props.children);
    this.state = {
      gamePath: props.children.props
    }

    console.log(this.state.gamePath);


  }

  componentDidMount(){
    const script = document.createElement("script");
    
            script.src =this.state.gamePath.src;
            script.async = true;
            document.head.appendChild(script);

  }
    render() {
      return (
        <div className="container">
        <div id="phaser"></div>
          

        </div>
      );
    }
  }
  
  export default Egg;
  