import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './styles';


class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    reset: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    quitKey: PropTypes.string.isRequired
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
        if (this.state.superPrivatePass.length >= 4 && this.state.superPrivatePass === 'pass') {
          this.setState({ showApp: true });
        }
        if (event.key === 'q') {
          this.setState({ superPrivatePass: '' });
        }
      } else if (event.key === this.props.reset) {
        this.setState({ superPrivatePass: '' });
      }
    } else if (event.key === this.props.quitKey) {
      this.setState({ showApp: false });
    }
  }

  render() {
    return (
      <div className='App'>
        <h1 align='center'>TANKS GAME</h1>
        {this.state.showApp && <Styles>{this.props.children}</Styles>}
      </div>
    );
  }
}

export default App;
