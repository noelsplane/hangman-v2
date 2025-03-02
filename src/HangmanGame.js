import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperbody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png'];
const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];

class HangmanGame extends React.Component {
  state = {
    curWord: words[Math.floor(Math.random() * words.length)].toUpperCase(), // Store actual word
    lifeLeft: 6,
    usedLetters: [],
    revealedWord: [],
    gameOver: false,
    gameWon: false
  };

  startNewGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    console.log("New Word Selected:", newWord, "Type:", typeof newWord); // Debugging Line
    this.setState({
      curWord: newWord.toUpperCase(),  // Ensure it's a string
      lifeLeft: 6,
      usedLetters: [],
      revealedWord: Array(newWord.length).fill('_'),
      gameOver: false,
      gameWon: false
    });
  };

  handleLetterGuess = (letter) => {
    const { curWord, usedLetters, lifeLeft, revealedWord, gameOver } = this.state;
    if (gameOver || usedLetters.includes(letter)) return;
    
    let updatedRevealedWord = [...revealedWord];
    let found = false;

    curWord.split('').forEach((char, index) => {
      if (char.toUpperCase() === letter.toUpperCase()) {
        updatedRevealedWord[index] = char;
        found = true;
      }
    });

    const newLifeLeft = found ? lifeLeft : lifeLeft - 1;
    const gameWon = updatedRevealedWord.join('') === curWord;
    const isGameOver = newLifeLeft === 0 || gameWon;

    this.setState({
      usedLetters: [...usedLetters, letter],
      revealedWord: updatedRevealedWord,
      gameWon,
      gameOver: isGameOver,
      lifeLeft: newLifeLeft,
    });
    
  };

  render() {
    return (
      <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1 style={{ color: '#333' }}>Hangman Game</h1>
        <img src={pics[6 - this.state.lifeLeft]} alt="Hangman" style={{ maxWidth: '200px', display: 'block', margin: '0 auto' }} />
        <p style={{ fontSize: '24px', margin: '20px 0' }}>Word: {this.state.revealedWord.join(' ')}</p>
        <p style={{ fontSize: '18px', color: '#555' }}>Used Letters: {this.state.usedLetters.join(', ')}</p>
        {!this.state.gameOver ? (
          <SingleLetterSearchbar onGuess={this.handleLetterGuess} />
        ) : (
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: this.state.gameWon ? 'green' : 'red' }}>
            {this.state.gameWon ? "Congratulations! You won!" : "Game Over! The word was " + this.state.curWord}
          </p>
        )}
        <button onClick={this.startNewGame} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          {this.state.gameOver ? "Play Again" : "New Game"}
        </button>
      </div>
    );
  }
}

export default HangmanGame;