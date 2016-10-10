import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  interval: undefined;

  constructor() {
    super();
    this.state = {
      idiomList: ["It's raining cats and _", "Kill two _ with one stone", "Don't count your _ before they've hatched", "A _ for your thoughts",
      "It takes two to _", "Don't put all your _ in one basket", "_ is in your court", "Can't judge a _ by its cover", "Curiosity killed the _", 
      "Once in a blue _", "Speak of the _", "Best thing since sliced _", "Taste of your own _", "Every _ has a silver lining", "Hit the _ on the head",
      "Beat around the _", "As stubborn as an _"],
      answers: ["dogs", "birds", "chickens", "penny", "tango", "eggs", "ball", "book", "cat", "moon", "devil", "bread", "medicine", "cloud",
      "nail", "bush", "ox"],
      score: 0,
      placeholder: 0,
      count: 30,
      currentGif: "",
      started: false
    };
  }

  startCountdown() {
    this.interval = setInterval(function () {
      let count = this.state.count - 1
      if (count === -1) {
        this.stopCountdown()
      } else {
        this.setState({count})
      }
    }.bind(this), 1000)
  }

  stopCountdown() {
    clearInterval(this.interval)
  }

  componentDidMount(){
      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[this.state.placeholder] + '&api_key=dc6zaTOxFJmzC';
     axios.get(giphyRequestUrl)
        .then((response) => {
          this.setState({currentGif: response.data.data[0].images.original.url});
        })
        .catch((error) => {
          console.log(error);
      });;
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleStart(e) {
    this.setState({started: true});
    this.startCountdown();
  }

  handleChange(e) {
    let typing = e.target.value;
    let place = this.state.placeholder;
    let correctAnswer = this.state.answers[place];
    
    if(typing === correctAnswer){
      this.setState({score: this.state.score + 1});
      var array = this.state.idiomList;
      var array2 = this.state.answers;
      array.splice(this.state.placeholder, 1);
      array2.splice(this.state.placeholder, 1);

      this.setState({idiomList: array });
      this.setState({answers: array2 });

      let tempPlaceholder = Math.floor(Math.random() * this.state.idiomList.length)
      this.setState({placeholder: tempPlaceholder});

      this.refs.answerBox.value = '';
      let giphyRequestUrl = 'http://api.giphy.com/v1/gifs/search?q=' + this.state.answers[tempPlaceholder] + '&api_key=dc6zaTOxFJmzC';
    axios.get(giphyRequestUrl)
        .then((response) => {
          this.setState({currentGif: response.data.data[0].images.original.url});
        })
        .catch((error) => {
          console.log(error);
      });;
    }
  }
  render() {

    var headerStyle = {
      textAlign: 'center',
      marginTop: 200
    };

    let gameOver;
    {this.state.count === 0 ? gameOver = true : gameOver = false}
      
    if (this.state.idiomList.length === 1){
      return (
        <div>
          <h1>gifioms</h1>
          <h2 style={headerStyle}>Congrats</h2>
          <h2>You got a perfect score!</h2>
        </div>
      );
    }else if(!gameOver){
      let place = this.state.placeholder;
      let idiom = this.state.idiomList[place].split("_");
      return (
        <div>
          <h1>gifioms</h1>

          {this.state.started == false ? <h2 onClick={this.handleStart.bind(this)}>Click here to start the timer</h2> : <h2>{this.state.count}</h2>}
          <p>{idiom[0]} <input ref='answerBox' onChange={this.handleChange.bind(this)} /> {idiom[1]}</p>
          <img src={this.state.currentGif} alt="should've been a gif" />
          <h2> Score: {this.state.score} </h2>
        </div>
      );
    }else {
      return (
        <div>
          <h1>gifioms</h1>
          <h2 style={headerStyle}>Time's up!</h2>
          <h2>You scored {this.state.score} points!</h2>
        </div>
      );
    }
  }
}
export default App;
