import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      idiomList: ["Don't put all your _ in one basket", "It's raining cats and _", "Kill two _ with one stone", "A _ for your thoughts",
      "It takes two to _", "_ is in your court", "Can't judge a _ by its cover", "Curiosity killed the _", "Once in a blue _", "Speak of the _",
      "Best thing since sliced _", "Don't count your _ before they've hatched", "Taste of your own _", "Every _ has a silver lining",
      "Hit the _ on the head"],
      answers: ["eggs", "dogs", "birds", "penny", "tango", "ball", "book", "cat", "moon", "devil", "bread", "chickens", "medicine", "cloud",
      "nail"],
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
          console.log(this.state.currentGif);
        })
        .catch((error) => {
          console.log(error);
      });;
  }

  handleChange(e) {
    let typing = e.target.value;
    let place = this.state.placeholder;
    let correctAnswer = this.state.answers[place];
    
    if(typing === correctAnswer){
      this.setState({score: this.state.score + 1});
      let tempPlaceholder = this.state.placeholder + 1;
      this.setState({placeholder: this.state.placeholder + 1});
      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[tempPlaceholder] + '&api_key=dc6zaTOxFJmzC';
    axios.get(giphyRequestUrl)
        .then((response) => {
          this.setState({currentGif: response.data.data[0].images.original.url});
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
