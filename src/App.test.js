import { render, screen } from '@testing-library/react';
import HangmanGame from './HangmanGame';

test('renders hangman title', () => {
  render(<HangmanGame />);
  const linkElement = screen.getByText(/hangman/i);
  expect(linkElement).toBeInTheDocument();
});
