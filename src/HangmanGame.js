import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = ['noose.png', 'upperbody.png', 'upperandlowerbody.png', '1arm.png', 'botharms.png', '1leg.png', 'Dead.png'];

const words = ["Morehouse", "Spelman", "Basketball", "Table", "Museum", "Excellent", "Fun", "React"];


const updateStats = async (name, won) => {
  try {
    const response = await fetch('http://localhost:4000/api/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, won }),
    });
    if (!response.ok) {
      throw new Error('Failed to update stats');
    }
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

const getWinRate = async (name) => {
  try {
    const res = await fetch(`http://localhost:4000/api/winrate/${name}`);
    if (!res.ok) {
      throw new Error('Failed to fetch win rate');
    }
    const data = await res.json();
    return data.winRate;
  } catch (error) {
    console.error('Error fetching win rate:', error);
    return null;
  }
};

const getLeaderboard = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/leaderboard`);
    if (!res.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
};

class HangmanGame extends React.Component {
  state = {
    playerName: '',
    nameSubmitted: false,
    curWord: '',
    lifeLeft: 6,
    usedLetters: [],
    revealedWord: [],
    gameOver: false,
    gameWon: false,
    winRate: null,
    leaderboard: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    this.prepareNewWord();
  }

  prepareNewWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    this.setState({
      curWord: newWord.toUpperCase(),
      lifeLeft: 6,
      usedLetters: [],
      revealedWord: Array(newWord.length).fill('_'),
      gameOver: false,
      gameWon: false,
    });
  };

  handleLetterGuess = (letter) => {
    const { curWord, usedLetters, lifeLeft, revealedWord, gameOver } = this.state;
    if (gameOver || usedLetters.includes(letter)) return;

    let updatedRevealedWord = [...revealedWord];
    let found = false;

    curWord.split('').forEach((char, index) => {
      if (char === letter) {
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
      isLoading: true
    }, async () => {
      if (isGameOver) {
        const { playerName } = this.state;
        try {
          await updateStats(playerName, gameWon);
          const rate = await getWinRate(playerName);
          const board = await getLeaderboard();
          this.setState({ 
            winRate: rate,
            leaderboard: board,
            isLoading: false
          });
        } catch (error) {
          this.setState({ 
            error: 'Failed to update game stats',
            isLoading: false
          });
        }
      }
    });
  };

  handleNameSubmit = (e) => {
    e.preventDefault();
    const { playerName } = this.state;
    if (playerName.trim()) {
      this.setState({ nameSubmitted: true });
      getLeaderboard().then((board) => {
        this.setState({ leaderboard: board });
      });
    }
  };

  render() {
    const {
      playerName, nameSubmitted, revealedWord, usedLetters,
      gameOver, gameWon, lifeLeft, winRate, leaderboard,
      isLoading, error
    } = this.state;

    if (!nameSubmitted) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '40px' }}>
          <h2>Enter Your Name to Start</h2>
          <form onSubmit={this.handleNameSubmit}>
            <input
              type="text"
              value={playerName}
              onChange={(e) => this.setState({ playerName: e.target.value })}
              placeholder="Your name"
              style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>
              Start Game
            </button>
          </form>
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>Hangman Game</h1>
        <img 
          src={pics[6 - lifeLeft]} 
          alt={`Hangman state ${6 - lifeLeft}`} 
          style={{ maxWidth: '200px', display: 'block', margin: '0 auto' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          {revealedWord.map((letter, index) => (
            <LetterBox
              key={index}
              letter={letter}
              isVisible={letter !== '_'}
            />
          ))}
        </div>
        <p style={{ fontSize: '18px', color: '#555' }}>Used Letters: {usedLetters.join(', ')}</p>

        {error && (
          <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>
        )}

        {!gameOver ? (
          <SingleLetterSearchbar onGuess={this.handleLetterGuess} />
        ) : (
          <>
            <p style={{ fontSize: '20px', fontWeight: 'bold', color: gameWon ? 'green' : 'red' }}>
              {gameWon ? "🎉 Congratulations! You won!" : `💀 Game Over! The word was ${this.state.curWord}`}
            </p>
            {isLoading ? (
              <p>Loading stats...</p>
            ) : winRate !== null && (
              <p style={{ fontSize: '18px' }}>
                {playerName}'s Win Rate: <strong>{winRate}%</strong>
              </p>
            )}
          </>
        )}

        <button 
          onClick={this.prepareNewWord} 
          style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
          disabled={isLoading}
        >
          {gameOver ? "Play Again" : "New Game"}
        </button>

        {leaderboard.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3>🏆 Leaderboard</h3>
            <table style={{ margin: '0 auto', fontSize: '16px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ padding: '5px 15px' }}>Name</th>
                  <th style={{ padding: '5px 15px' }}>Win Rate (%)</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((p, i) => (
                  <tr key={i}>
                    <td style={{ padding: '5px 15px' }}>{p.name}</td>
                    <td style={{ padding: '5px 15px' }}>{p.winRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default HangmanGame;
