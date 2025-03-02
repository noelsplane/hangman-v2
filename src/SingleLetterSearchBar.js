import React, { Component } from 'react';

class SingleLetterSearchbar extends Component {
  state = { letter: '' };

  handleChange = (event) => {
    this.setState({ letter: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { letter } = this.state;
    if (letter.length === 1) {
      this.props.onGuess(letter.toUpperCase());
      this.setState({ letter: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.letter}
          onChange={this.handleChange}
          maxLength="1"
        />
        <button type="submit">Guess</button>
      </form>
    );
  }
}

export default SingleLetterSearchbar;
