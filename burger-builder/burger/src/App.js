import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserInput from './user-input';
import UserOutput from './user-output';
import ValidationComponent from './Section4Components/validation-component';
import CharComponent from './Section4Components/char-component';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "cindy", s4inputText: ""};
    this.s4displayTextLength = this.s4displayTextLength.bind(this);
    this.deleteChar = this.deleteChar.bind(this);
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }

  s4displayTextLength(event) {
    this.setState({
      s4inputText: event.target.value
    })
  }

  deleteChar(index) {
    const chars = this.state.s4inputText.split('');
    chars.splice(index, 1);
    this.setState({ s4inputText: chars.join('') });
  }

  render() {
    const s4Chars = this.state.s4inputText.split('').map((c, index) => {
      return <CharComponent key={index} letter={c} handleClick={() => this.deleteChar(index)}/>
    });

    return (
      <StyleRoot>
      <div className="App">
        <UserInput onChange={(e) => this.setUsername(e)} username={this.state.username} />
        <UserOutput username={this.state.username} />

        {/* Section 4 Assignment */}
        <input type="text" onChange={this.s4displayTextLength}/>
        <ValidationComponent textLength={this.state.s4inputText.length} />
        {s4Chars}
      </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
