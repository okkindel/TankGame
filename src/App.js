import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameWrapper from './GameWrapper';
import './App.css';

class App extends Component {
  static propTypes = {
    password: PropTypes.string,
    quitKey: PropTypes.string
  };

  static defaultProps = {
    password: 'pass',
    quitKey: 'Escape'
  };

  constructor(props) {
    super(props);
    this.state = {
      showApp: false,
      superPrivatePass: ''
    };
    this.combinationListener = this
      .combinationListener
      .bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.combinationListener, false);
  }

  resetPasswordState() {
    this.passIndex = 0;
    this.state.superPrivatePass = '';
  }


  combinationListener(event) {
    // Check if App hidden
    if (!this.state.showApp) {
      if (event.key === this.props.password.charAt(this.passIndex)) {
        // if password char matches, inrement iterator and add that char
        this.passIndex += 1;
        this.state.superPrivatePass += event.key;

        if (this.props.password === this.state.superPrivatePass) {
          // Password matches, show App and reset password state
          this.setState({ showApp: true });
        }
      } else {
        // Reset password iterator on bad input
        this.resetPasswordState();
      }
    } else if (event.key === this.props.quitKey) {
      this.setState({ showApp: false });
      this.resetPasswordState();
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
      {this.state.showApp && <GameWrapper/>}
    </div>
  );
}
}

export default App;
