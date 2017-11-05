import React, {Component} from 'react';
import Egg from './egg.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEgg: false,
      superPrivatePass: ""
    }
    this.combinationListener = this.combinationListener.bind(this);

  }

  componentDidMount() {
    document.addEventListener("keydown", this.combinationListener, false);
  }


  combinationListener(event) {

    if(!this.state.showEgg){
      if (this.props.password.indexOf(event.key) > -1 ){
          this.setState({
            superPrivatePass: this.state.superPrivatePass + event.key
          })
          if (this.state.superPrivatePass.length >= 4 && this.state.superPrivatePass === "pass") {
            this.setState({showEgg: true})
          }
          if (event.key === 'q') {
            this.setState({superPrivatePass: ""})
          
          }
      } else if(event.key === this.props.reset){
          this.setState({superPrivatePass: ""})
      }
    } else if(event.key === this.props.quitKey){
        this.setState({showEgg: false})
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.showEgg && <Egg>{this.props.children}</Egg>}
      </div>
    );
  }
}

export default App;
