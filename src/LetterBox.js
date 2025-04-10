import React from 'react';
import PropTypes from 'prop-types';

class LetterBox extends React.Component {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    isVisible: PropTypes.bool,
    boxStyle: PropTypes.object,
    letterStyle: PropTypes.object
  };

  static defaultProps = {
    isVisible: false,
    boxStyle: {},
    letterStyle: {}
  };

  render() {
    const { letter, isVisible, boxStyle, letterStyle } = this.props;

    const defaultBoxStyle = {
      border: '1px solid black',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 5px',
      borderRadius: '4px',
      backgroundColor: '#f5f5f5'
    };

    const defaultLetterStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
      color: '#333'
    };

    const combinedBoxStyle = { ...defaultBoxStyle, ...boxStyle };
    const combinedLetterStyle = { ...defaultLetterStyle, ...letterStyle };

    return (
      <div style={combinedBoxStyle}>
        <span style={combinedLetterStyle}>{letter}</span>
      </div>
    );
  }
}

export default LetterBox;