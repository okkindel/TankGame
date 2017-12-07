import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Game from './main';
import './App.css';


class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    reset: PropTypes.string,
    password: PropTypes.string,
    quitKey: PropTypes.string
  };

  static defaultProps = {
    reset: 'q',
    password: 'pass',
    quitKey: 'Escape'
  };

  constructor(props) {
    super(props);
    this.state = {
      showApp: false,
      superPrivatePass: ''
    };
    this.combinationListener = this.combinationListener.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.combinationListener, false);
  }

  combinationListener(event) {
    if (!this.state.showApp) {
      if (this.props.password.indexOf(event.key) > -1) {
        this.setState({
          superPrivatePass: this.state.superPrivatePass + event.key
        });
        if (this.state.superPrivatePass.length === this.props.password.length && this.state.superPrivatePass === this.props.password) {
          this.setState({ showApp: true });
          // this.game = new Game();
          
        }
        if (event.key === this.props.reset) {
          this.setState({ superPrivatePass: '' });
        }
      } else if (event.key === this.props.reset) {  
        this.setState({ superPrivatePass: '' });
      }
    } else if (event.key === this.props.quitKey) {
      this.setState({ showApp: false });
    }
  }

  startgame() {
    this.game = new Game();

    return null;
  }

  render() {
    return (
      <div className='App'>
        <h1 align='center'>TANKS GAME</h1>
        {this.state.showApp && <div className='container'><div id='phaser'>{this.startgame()}</div></div>}
      </div>
    );
  }
}

export default App;
