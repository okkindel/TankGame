import React, { Component } from 'react';
import './styles.css';
import Game from './TanksGame.js';


class Styles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamePath: props.children.props
    };
  }

  // componentDidMount(){
  //   const script = document.createElement("script");
  //   script.src =this.state.gamePath.src;
  //   script.async = true;
  //   document.head.appendChild(script);
  // }
  render() {
    return (
      <div className='container'>
        <div id='phaser' />
        {Game()}
      </div>
    );
  }
}

export default Styles;
