import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      idiomList: ["Don't put all your _ in one basket", "It's raining cats and _", "Kill two _ with one stone"],
      answers: ["eggs", "dogs", "birds"],
      score: 0,
      placeholder: 0,
      currentGif: ""
    };
  }
  componentDidMount(){
      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[this.state.placeholder] + '&api_key=dc6zaTOxFJmzC';
     axios.get(giphyRequestUrl)
        .then((response) => {
          this.setState({currentGif: response.data.data[0].images.original.url});
          debugger;
          console.log(this.state.currentGif);
        })
        .catch((error) => {
          console.log(error);
      });;
        debugger;
  }
  componentWillMount(){
    debugger;
  }
  handleChange(e) {
    let typing = e.target.value;
    debugger;
    let place = this.state.placeholder;
    let correctAnswer = this.state.answers[place];
    
    if(typing === correctAnswer){
      this.setState({score: this.state.score + 1});
      let tempPlaceholder = this.state.placeholder + 1;
      this.setState({placeholder: this.state.placeholder + 1});
      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[tempPlaceholder] + '&api_key=dc6zaTOxFJmzC';
      debugger;
    axios.get(giphyRequestUrl)
        .then((response) => {
          this.setState({currentGif: response.data.data[0].images.original.url});
          debugger;
          console.log(this.state.currentGif);
        })
        .catch((error) => {
          console.log(error);
      });;
    }
  }
  render() {
    let place = this.state.placeholder;
    let idiom = this.state.idiomList[place].split("_");
    debugger;
    return (
      <div className="App">
        <h2>Gifioms</h2>
        <span>{idiom[0]}</span> <input onChange={this.handleChange.bind(this)} /> <span>{idiom[1]}</span>
        <img src={this.state.currentGif} alt="should've been a gif" />
        <h1> {this.state.score} </h1>
      </div>
    );
  }
}
export default App;
