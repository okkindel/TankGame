import React, { Component } from 'react';


class Ojej extends Component {

  constructor(props){
    super(props);
    console.log(props.children);
    this.state = {
      gamePath: props.children.props
    }

    console.log(this.state.gamePath);


  }

  componentWillMount(){
    const script = document.createElement("script");
    
            script.src =this.state.gamePath.src;
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
  