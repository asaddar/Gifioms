import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
var request = require('request');
var axios = require('axios');
import logo from './logo.svg';
import './App.css';

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

  handleChange(e) {
    let typing = e.target.value;

    let place = this.state.placeholder;
    let correctAnswer = this.state.answers[place];
    
    if(typing === correctAnswer){
      this.setState({score: this.state.score + 1});
      this.setState({placeholder: this.state.placeholder + 1});

      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[this.state.placeholder] + '&api_key=dc6zaTOxFJmzC';
    axios.get(giphyRequestUrl)
        .then(function (response) {
          this.setState({currentGif: response.data.data[0].images.original.url});
          console.log(this.state.currentGif);
        })
        .catch(function (error) {
          console.log(error);
      });;
    }

  }


  render() {
    let place = this.state.placeholder;
    let idiom = this.state.idiomList[place].split("_");

    return (
      <div className="App">
        <h2>Gifiom</h2>

        <span>{idiom[0]}</span> <input onChange={this.handleChange.bind(this)} /> <span>{idiom[1]}</span>
        <img src={this.state.currentGif} alt="should've been a gif" />
        <h1> {this.state.score} </h1>

      </div>
    );
  }
}

export default App;
