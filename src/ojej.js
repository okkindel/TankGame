import React, { Component } from 'react';


class Ojej extends Component {

  constructor(props){
    super(props);

    this.state = {
      gamePath: props.children
    }


  }

  componentWillMount(){
    const script = document.createElement("script");
    
            script.src = this.state.gamePath.src;
            script.async = true;
            document.body.appendChild(script);

  }
    render() {
      return (
        <div className="phaser">
          
        </div>
      );
    }
  }
  
  export default Ojej;
  