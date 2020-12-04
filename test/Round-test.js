const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');

describe('Round', () => {

  let card1;
  let card2;
  let card3;
  let deck;
  let round;

  beforeEach(() => {

    card1 = new Card(1, 'How does JS combine different datatypes?', ['it never does', 'magic', 'type coercion'], 'type coercion');

    card2 = new Card(2, 'When does hoisting occur?', ['in the execution phase', 'in the creation phase', 'when sails need raising'], 'in the creation phase');

    card3 = new Card(3, 'When should we use dot notation?', ['when we know the exact, unchanging key name', 'never', 'always'], 'When we know the exact, unchanging key name');

    deck = new Deck([card1, card2, card3]);

    round = new Round(deck.cards);

  });

  it('should be a function', () => {
    expect(Round).to.be.a('function');
  });

  it('should be an instance of Round', () => {
    expect(round).to.be.an.instanceOf(Round);
  });

  it('should have a deck of cards', () => {
    expect(round.deck).to.deep.equal([card1, card2, card3]);
  });

  it('should have a current card, which is the first in the deck', () => {
    expect(round.currentCard).to.equal(card1);
  });

  it('should return the current card', () => {
    let flashcard = round.returnCurrentCard();
    expect(flashcard).to.equal(card1);
  });

  it('should start with no turns taken', () => {
    expect(round.turns).to.equal(0);
  });

  it('should update the turns count for that round', () => {
    expect(round.turns).to.equal(0);
    round.takeTurn();
    expect(round.turns).to.equal(1);
  });

  it('should count multiple turns taken in that round', () => {
    round.takeTurn();
    round.takeTurn();
    round.takeTurn();
    expect(round.turns).to.equal(3);
  });

  it('should create a new turn when a guess is made', () => {
    round.takeTurn('when we know the exact, unchanging key name');
    expect(round.currentTurn.guess).to.deep.equal('when we know the exact, unchanging key name');
    expect(round.turns).to.equal(1);
  });

  it('should evaluate whether a guess is correct', () => {
    round.takeTurn('type coercion');
    expect(round.currentTurn.feedback).to.equal('correct!');
  });

  it('should evaluate whether a guess is incorrect', () => {
    round.takeTurn('always');
    expect(round.currentTurn.feedback).to.equal('incorrect!');
  });

  it('should update the count of turns taken whether a guess is correct or not', () => {
    round.takeTurn('when we know the exact, unchanging key name');
    round.takeTurn('always');
    round.takeTurn('when sails need raising');
    expect(round.turns).to.equal(3);
  });

  it('should update the current card with each new turn', () => {
    round.takeTurn('when we know the exact, unchanging key name');
    round.takeTurn('in the creation phase');
    expect(round.currentTurn.feedback).to.equal('correct!');
    expect(round.currentCard).to.equal(card3);
  });

  it('should store incorrect guesses by the card id', () => {
    round.takeTurn('type coercion');
    round.takeTurn('when sails need raising');
    expect(round.currentTurn.feedback).to.equal('incorrect!');
    expect(round.incorrectGuesses).to.deep.equal([2]);
  });

  it('should not store correct guesses with incorrect ones', () => {
    round.takeTurn('type coercion');
    round.takeTurn('when sails need raising');
    expect(round.incorrectGuesses).to.deep.equal([2]);
  });

  it('should calculate the percentage of correct guesses', () => {
    round.takeTurn('type coercion');
    round.takeTurn('in the creation phase');
    round.takeTurn('never');
    round.calculatePercentCorrect();
    expect(round.percentCorrect).to.equal(66);
  });

  it('should log a message at the end of the round', () => {
    round.takeTurn('type coercion');
    round.takeTurn('in the creation phase');
    round.takeTurn('never');
    round.endRound();
    expect(round.endMsg).to.equal(`**Round over!** You answered ${round.percentCorrect}% of the questions correctly!`);
  });

  it('should end the round when all cards have been tested', () => {
    round.takeTurn('when we know the exact, unchanging key name');
    round.takeTurn('type coercion');
    expect(round.endMsg).to.equal('');
    round.takeTurn('when sails need raising');
    expect(round.endMsg).to.equal(`**Round over!** You answered ${round.percentCorrect}% of the questions correctly!`);
  });
});
