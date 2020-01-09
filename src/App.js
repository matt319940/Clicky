import React, { Component } from 'react';
import GridMDC from "./components/GridMDC";
import CharCard from "./components/CharCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import characters from "./characters.json";

class App extends Component {

  state = {
    characters: characters,
    selectedCharacters: [],
    topScore: 0,
    alert: ""
  }

  handlePicked = event => {

    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters()
    this.checkGuess(name, this.updateTopScore)
  }

  shuffleCharacters = () => {
    this.setState(this.state.characters = this.shuffleArray(this.state.characters))
  }

  shuffleArray = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.selectedCharacters.includes(name)) {
      newState.alert = `YOU ALREADY PICKED "${name.toUpperCase()}"!`
      newState.selectedCharacters = []
      this.setState(this.state = newState)
    } else {
      newState.selectedCharacters.push(name)
      newState.alert = `GOOD CHOICE!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.selectedCharacters.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.selectedCharacters.length === 12) {
      newState.alert = "CHAMPION!";
      newState.selectedCharacters = [];
      this.setState(this.state = newState)
    }
  }

  render() {
    return (
      <div>
        <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

        <GridMDC container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <GridMDC item lg={12}>
              {this.state.alert === "GOOD CHOICE!" ? (
                <Alert message={this.state.alert} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alert} style={{ color: "red" }} />
                )}
          </GridMDC>

          <GridMDC container justify="space-between">

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
                <Score type="Score" score={this.state.selectedCharacters.length} />
            </GridMDC>

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
                <Score type="Top Score" score={this.state.topScore} />
            </GridMDC>

          </GridMDC>

        </GridMDC>

        <GridMDC container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
          {this.state.characters.map(char => (
            <GridMDC item lg={3} md={3} sm={4} xs={6}>
            <CharCard
              id={char.id}
              name={char.name}
              image={char.image}
              key={char.id}
              handlePicked={this.handlePicked}
            />
            </GridMDC>
          ))}
        </GridMDC>
      </div>
    )
  }
}

export default App;
