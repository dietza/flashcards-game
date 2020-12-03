class Turn {
  constructor(userGuess, flashcard) {
    this.guess = userGuess,
    this.card = flashcard,
    this.eval = '',
    this.feedback = ''
  }

  returnGuess() {
    return this.guess;
  }

  returnCard() {
    return this.card;
  }

  evaluateGuess() {
    this.eval = (this.guess === this.card.correctAnswer ? true : false);
  }

  giveFeedback() {
    this.evaluateGuess();
    this.feedback = (this.eval === true ? 'correct!' : 'incorrect!');
  }
}

module.exports = Turn;