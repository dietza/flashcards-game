const Turn = require('../src/Turn');
class Round {
  constructor(fullDeck) {
    this.deck = fullDeck,
    this.currentCard = this.deck[0],
    this.turns = 0,
    this.counter = 0,
    this.incorrectGuesses = [],
    this.percentCorrect = 0,
    this.endMsg = '',
    this.currentTurn = {}
  }

  returnCurrentCard() {
    if (this.turns !== 0) {
      this.updateCurrentCard();
    }
    return this.currentCard;
  }

  takeTurn(guess) {
    this.turns++;
    this.currentTurn = new Turn(guess, this.currentCard);
    this.currentTurn.giveFeedback();
    this.storeIncorrectGuess();
    this.returnCurrentCard();
    this.endRound();
    return this.currentTurn.feedback;
  }

  updateCurrentCard() {
    this.counter += 1;
    this.currentCard = this.deck[this.counter];
  }

  storeIncorrectGuess() {
    if (!this.currentTurn.eval) {
      this.incorrectGuesses.push(this.currentCard.id);
    }
  }

  calculatePercentCorrect() {
    let totalCardsTested = this.turns;
    let numCorrect = totalCardsTested - this.incorrectGuesses.length;
    this.percentCorrect = Math.floor((numCorrect / totalCardsTested) * 100);
  }

  endRound() {
    this.calculatePercentCorrect();
    if (this.turns === this.deck.length) {
      this.endMsg = `**Round over!** You answered ${this.percentCorrect}% of the questions correctly!`
    }
  }
}

module.exports = Round;