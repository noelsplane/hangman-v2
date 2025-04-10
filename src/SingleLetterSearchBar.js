import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SingleLetterSearchbar extends Component {
  state = { 
    letter: '',
    error: null
  };

  handleChange = (event) => {
    const value = event.target.value;
    if (value.length > 1) return;
    
    if (value && !/^[a-zA-Z]$/.test(value)) {
      this.setState({ error: 'Please enter a single letter' });
    } else {
      this.setState({ 
        letter: value,
        error: null
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { letter } = this.state;
    if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
      this.props.onGuess(letter.toUpperCase());
      this.setState({ 
        letter: '',
        error: null
      });
    } else {
      this.setState({ error: 'Please enter a valid letter' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input
            type="text"
            value={this.state.letter}
            onChange={this.handleChange}
            maxLength="1"
            style={{
              padding: '10px',
              fontSize: '18px',
              width: '50px',
              textAlign: 'center',
              border: '2px solid #ccc',
              borderRadius: '4px'
            }}
            placeholder="?"
          />
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Guess
          </button>
        </div>
        {this.state.error && (
          <p style={{ color: 'red', marginTop: '5px' }}>{this.state.error}</p>
        )}
      </form>
    );
  }
}

SingleLetterSearchbar.propTypes = {
  onGuess: PropTypes.func.isRequired
};

export default SingleLetterSearchbar;
