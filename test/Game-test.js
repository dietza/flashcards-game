const chai = require('chai');
const expect = chai.expect;

const Round = require('../src/Round');
const Game = require('../src/Game');

describe('Game', () => {

  let game;

  beforeEach(() => {
    game = new Game();
    game.start();
  });

  it('should be a function', () => {
    expect(Game).to.be.a('function');
  });

  it('should be an instance of Game', () => {
    expect(game).to.be.an.instanceOf(Game);
  });

  it('should create cards', () => {
    expect(game.cards.length).to.equal(30);
  });

  it('should create a deck which contains those cards', () => {
    let numCards = game.deck.countCards();
    expect(numCards).to.equal(30);
  });

  it('should begin a new round with the full deck of cards', () => {
    expect(game.currentRound.deck[29]).to.deep.equal({
      id: 30,
      question: 'What type of methods are functions that allow you to manipulate the value of a particular data type or class?',
      answers: [ 'prototype method', 'object', 'callback function' ],
      correctAnswer: 'prototype method'
    });
  });

  it('should keep track of the current round', () => {
    expect(game.currentRound.turns).to.equal(0);
    game.currentRound.takeTurn();
    game.currentRound.takeTurn();
    expect(game.currentRound.turns).to.equal(2);
    expect(game.currentRound).to.be.an.instanceOf(Round);
  });
});