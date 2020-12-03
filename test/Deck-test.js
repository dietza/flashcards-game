const chai = require('chai');
const expect = chai.expect;

const Card = require('../src/Card');
const Deck = require('../src/Deck');

describe('Deck', () => {

  let card1;
  let card2;
  let card3;
  let deck;

  beforeEach(() => {

    card1 = new Card(1, 'How does JS combine different datatypes?', ['it never does', 'magic', 'type coercion'], 'type coercion');

    card2 = new Card(2, 'When does hoisting occur?', ['in the execution phase', 'in the creation phase', 'when sails need raising'], 'in the creation phase');

    card3 = new Card(3, 'When should we use dot notation?', ['when we know the exact, unchanging key name', 'never', 'always'], 'When we know the exact, unchanging key name');

    deck = new Deck([card1, card2, card3]);

  });

  it('should be a function', () => {
    expect(Deck).to.be.a('function');
  });

  it('should be an instance of Deck', () => {
    expect(deck).to.be.an.instanceOf(Deck);
  });

  it('should hold cards', () => {
    expect(deck.cards).to.deep.equal([card1, card2, card3]);
  });

  it('should hold instantiated cards', () => {
    expect(deck.cards[0].correctAnswer).to.equal('type coercion');
  });

  it('should be able to count cards in the deck', () => {
    let numCards = deck.countCards();
    expect(numCards).to.equal(3);
  });
});