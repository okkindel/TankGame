import Game from './game/main';
import React, {Component} from 'react';


class GameWrapper extends React.Component {
    constructor(props){
      super(props);
    }

    componentDidMount() {
      this.game = new Game();
    }
  
    componentWillUnmount() {
      this.game.destroy();
    }
  
    render() {
      return (
        <div className='container'><div id='phaser'></div></div>
      );
    }
  }

  export default GameWrapper;